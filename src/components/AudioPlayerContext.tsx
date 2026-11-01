"use client";

import React, { createContext, useContext, useState, useRef, useEffect, useMemo } from "react";
import { Song } from "@/types";
import Image from "next/image";
import { Play, Pause, X, Volume2, VolumeX, Disc3, ExternalLink } from "lucide-react";

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  togglePlay: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSong = (song: Song) => {
    if (currentSong?.id === song.id && isPlaying) {
      pauseSong();
      return;
    }
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!currentSong) return;
    setIsPlaying((prev) => !prev);
  };

  const contextValue = useMemo(
    () => ({ currentSong, isPlaying, playSong, pauseSong, togglePlay }),
    [currentSong, isPlaying]
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
      <FloatingPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onClose={() => {
          setIsPlaying(false);
          setCurrentSong(null);
        }}
      />
    </AudioContext.Provider>
  );
}

function FloatingPlayer({
  currentSong,
  isPlaying,
  onTogglePlay,
  onClose,
}: {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!currentSong) return;
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.src = currentSong.audioPreview || "";
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSong, isPlaying]);

  if (!currentSong) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={() => onTogglePlay()}
        onTimeUpdate={() => {
          if (audioRef.current && audioRef.current.duration) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
          }
        }}
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#07090E]/98 border-t border-gold-500/30 px-4 py-3 shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Track Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gold-500/40 flex-shrink-0 bg-navy-900">
              <Image
                src={currentSong.coverImage || "/images/tracks/odhe-bare.jpg"}
                alt={currentSong.title}
                fill
                className="object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Disc3 className="w-5 h-5 text-gold-400 animate-spin" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-white font-medium text-sm truncate font-serif">{currentSong.title}</h4>
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-gold-400 rounded-full animate-pulse h-3" />
                    <span className="w-0.5 bg-gold-400 rounded-full animate-pulse h-2" />
                    <span className="w-0.5 bg-gold-400 rounded-full animate-pulse h-3" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 truncate">
                J.Kail {currentSong.collaborators.length > 0 ? `feat. ${currentSong.collaborators.join(", ")}` : ""}
              </p>
            </div>
          </div>

          {/* Controls & Progress */}
          <div className="flex flex-col items-center gap-1.5 flex-1 max-w-md">
            <button
              onClick={onTogglePlay}
              aria-label={isPlaying ? "Pause track" : "Play track"}
              className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-navy-950 shadow-gold-sm hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
            </button>
            <div className="w-full bg-navy-800 rounded-full h-1 overflow-hidden relative">
              <div className="h-full bg-gold-gradient transition-all duration-150" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Links & Close */}
          <div className="flex items-center gap-3">
            {currentSong.links.spotify && (
              <a
                href={currentSong.links.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
              >
                <span>Spotify</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (audioRef.current) audioRef.current.muted = !isMuted;
              }}
              aria-label="Toggle mute"
              className="text-gray-400 hover:text-gold-400 transition-colors p-1"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              aria-label="Close player"
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
