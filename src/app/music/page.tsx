"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Play,
  Pause,
  Filter,
  ExternalLink,
  Music2,
  Disc3,
  Calendar,
  Sparkles,
  Volume2
} from "lucide-react";
import { getAllSongs, isNewRelease, getSiteConfig } from "@/lib/data";
import { useAudio } from "@/components/AudioPlayerContext";
import { Song } from "@/types";

type FilterCategory = "all" | "2026" | "2025" | "eps" | "albums" | "collabs";

export default function MusicPage() {
  const songs = getAllSongs();
  const siteConfig = getSiteConfig();
  const { currentSong, isPlaying, playSong } = useAudio();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");

  // Filtering & search logic
  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      // 1. Text Search query
      const matchesSearch =
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.collaborators.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (song.parentRelease && song.parentRelease.toLowerCase().includes(searchQuery.toLowerCase())) ||
        song.year.toString().includes(searchQuery);

      if (!matchesSearch) return false;

      // 2. Filter Category Chips
      if (activeFilter === "2026") return song.year === 2026;
      if (activeFilter === "2025") return song.year === 2025;
      if (activeFilter === "eps") return song.releaseType === "ep";
      if (activeFilter === "albums") return song.releaseType === "album";
      if (activeFilter === "collabs") return song.collaborators && song.collaborators.length > 0;

      return true;
    });
  }, [songs, searchQuery, activeFilter]);

  // Grouped by Release Type (Newest first)
  const singles2026 = filteredSongs.filter((s) => s.year === 2026 && s.releaseType === "single");
  const projects2025 = filteredSongs.filter(
    (s) => s.year === 2025 && (s.releaseType === "ep" || s.releaseType === "album")
  );
  const singles2025 = filteredSongs.filter((s) => s.year === 2025 && s.releaseType === "single");

  // Group 2025 projects by parent name
  const healerTracks = filteredSongs.filter((s) => s.parentRelease === "Healer");
  const ninetySixHoursTracks = filteredSongs.filter((s) => s.parentRelease === "96 Hour's");
  const missedCallTracks = filteredSongs.filter((s) => s.parentRelease === "Missed Call");

  // Helper for displaying release date: only show exact date where given, else year only
  const formatReleaseDate = (song: Song) => {
    if (song.releaseDate) {
      try {
        const d = new Date(song.releaseDate);
        return d.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      } catch {
        return song.releaseDate;
      }
    }
    return `${song.year}`;
  };

  return (
    <div className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      
      {/* Page Title & Intro */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase mb-4">
          <Disc3 className="w-3.5 h-3.5" />
          <span>Complete Discography</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-wide mb-4">
          Sounds of <span className="text-gold-gradient">J.Kail</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Explore every single, collaborative EP, and studio album released by J.Kail & J.Kail Production. Stream directly or open on your preferred streaming platform.
        </p>
      </div>

      {/* Available On Logo Row */}
      <div className="rounded-2xl glass-panel border border-navy-750 p-6 mb-12">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold mb-4">
          Official Streaming Platforms
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          <a
            href={siteConfig.socials.spotify.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900/80 border border-emerald-500/30 text-emerald-300 hover:scale-105 hover:bg-emerald-950/60 transition-all text-xs font-semibold"
          >
            <Music2 className="w-4 h-4 text-emerald-400" />
            <span>Spotify</span>
          </a>

          <a
            href={siteConfig.socials.appleMusic.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900/80 border border-rose-500/30 text-rose-300 hover:scale-105 hover:bg-rose-950/60 transition-all text-xs font-semibold"
          >
            <Music2 className="w-4 h-4 text-rose-400" />
            <span>Apple Music</span>
          </a>

          <a
            href={siteConfig.socials.jioSaavn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900/80 border border-cyan-500/30 text-cyan-300 hover:scale-105 hover:bg-cyan-950/60 transition-all text-xs font-semibold"
          >
            <Music2 className="w-4 h-4 text-cyan-400" />
            <span>JioSaavn</span>
          </a>

          <a
            href={siteConfig.socials.gaana.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900/80 border border-red-500/30 text-red-300 hover:scale-105 hover:bg-red-950/60 transition-all text-xs font-semibold"
          >
            <Music2 className="w-4 h-4 text-red-400" />
            <span>Gaana</span>
          </a>

          <a
            href={siteConfig.socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900/80 border border-red-600/30 text-white hover:scale-105 hover:bg-red-950/60 transition-all text-xs font-semibold"
          >
            <ExternalLink className="w-4 h-4 text-red-500" />
            <span>YouTube Music</span>
          </a>
        </div>
      </div>

      {/* Search Bar & Filter Chips & View Mode Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-navy-800">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search song, collaborator, EP..."
            className="w-full bg-navy-900/90 border border-navy-750 focus:border-gold-500 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {(
            [
              { id: "all", label: "All Releases" },
              { id: "2026", label: "2026 Singles" },
              { id: "2025", label: "2025 Singles" },
              { id: "eps", label: "EPs" },
              { id: "albums", label: "Albums" },
              { id: "collabs", label: "Collabs" },
            ] as const
          ).map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveFilter(chip.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                activeFilter === chip.id
                  ? "bg-gold-gradient text-navy-950 font-bold shadow-gold-sm"
                  : "bg-navy-900 text-gray-400 hover:text-white border border-navy-800"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* View Mode Switcher (Grid vs Timeline) */}
        <div className="flex items-center gap-1 bg-navy-900 p-1 rounded-full border border-navy-800">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              viewMode === "grid" ? "bg-gold-500 text-navy-950 font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              viewMode === "timeline" ? "bg-gold-500 text-navy-950 font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            Timeline (2025-2026)
          </button>
        </div>

      </div>

      {/* =========================================================================
          VIEW MODE 1: GROUPED DISCOGRAPHY GRID (Newest First)
          ========================================================================= */}
      {viewMode === "grid" && (
        <div className="flex flex-col gap-16">
          
          {/* GROUP 1: 2026 Singles */}
          {singles2026.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                  2026 Singles
                </h2>
                <span className="text-xs text-gray-400 font-mono">({singles2026.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {singles2026.map((song) => renderSongCard(song))}
              </div>
            </div>
          )}

          {/* GROUP 2: 2025 EPs & Albums */}
          {projects2025.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                  2025 EPs & Albums
                </h2>
                <span className="text-xs text-gray-400 font-mono">({projects2025.length} tracks across 3 projects)</span>
              </div>

              {/* Healer EP Spotlight */}
              {healerTracks.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl glass-panel border border-gold-500/20 bg-navy-900/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
                        EP • Released January 1, 2025
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        Healer (EP)
                      </h3>
                      <p className="text-xs text-gray-400">
                        with Emo Devil and Gagan Bhatoye
                      </p>
                    </div>
                    <a
                      href="https://music.apple.com/us/album/healer-ep/1813392962"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-950 border border-rose-500/50 text-rose-300 text-xs font-semibold hover:bg-rose-900 transition-colors w-fit"
                    >
                      <span>Stream on Apple Music</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {healerTracks.map((song) => renderSongCard(song))}
                  </div>
                </div>
              )}

              {/* 96 Hour's EP */}
              {ninetySixHoursTracks.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl glass-panel border border-navy-750 bg-navy-900/40">
                  <div className="mb-4">
                    <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
                      EP • 2025
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      96 Hour's (EP)
                    </h3>
                    <p className="text-xs text-gray-400">All tracks with Yoddha</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {ninetySixHoursTracks.map((song) => renderSongCard(song))}
                  </div>
                </div>
              )}

              {/* Missed Call Album */}
              {missedCallTracks.length > 0 && (
                <div className="p-6 rounded-2xl glass-panel border border-navy-750 bg-navy-900/40">
                  <div className="mb-4">
                    <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
                      Album • 2025
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Missed Call (Album)
                    </h3>
                    <p className="text-xs text-gray-400">Official Debut Studio Album</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {missedCallTracks.map((song) => renderSongCard(song))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GROUP 3: 2025 Singles */}
          {singles2025.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                  2025 Singles
                </h2>
                <span className="text-xs text-gray-400 font-mono">({singles2025.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {singles2025.map((song) => renderSongCard(song))}
              </div>
            </div>
          )}

        </div>
      )}


      {/* =========================================================================
          VIEW MODE 2: RELEASE TIMELINE (2025 to 2026)
          ========================================================================= */}
      {viewMode === "timeline" && (
        <div className="relative border-l border-gold-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {filteredSongs.map((song, idx) => {
            const isPlayingThis = currentSong?.id === song.id && isPlaying;
            const isNew = isNewRelease(song.releaseDate);

            return (
              <div key={song.id} className="relative group">
                {/* Timeline node marker */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 ${
                    isNew
                      ? "bg-gold-400 border-white shadow-[0_0_10px_rgba(201,162,75,0.8)]"
                      : "bg-navy-950 border-gold-500"
                  }`}
                />

                <a
                  href={song.links.spotify || "https://open.spotify.com/playlist/37i9dQZF1DZ06evO2PsTBw"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl glass-panel border border-navy-750 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group/item cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-navy-900 border border-gold-500/30 flex-shrink-0">
                      <Image
                        src={song.coverImage || "/images/tracks/odhe-bare.jpg"}
                        alt={song.title}
                        fill
                        sizes="56px"
                        className="object-cover group-hover/item:scale-105 transition-transform"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-lg font-bold text-white group-hover/item:text-emerald-400 transition-colors">
                          {song.title}
                        </h3>
                        {isNew && (
                          <span className="px-2 py-0.5 rounded-full bg-gold-gradient text-navy-950 text-[10px] font-black uppercase">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {song.parentRelease ? `${song.parentRelease} • ` : ""}
                        {song.collaborators.length > 0 ? `with ${song.collaborators.join(", ")}` : "Solo"}
                      </p>
                      <p className="text-[11px] text-gold-400 font-mono mt-0.5">
                        {formatReleaseDate(song)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center gap-1.5 transition-colors shadow-sm">
                      <Music2 className="w-3.5 h-3.5" />
                      <span>Listen on Spotify</span>
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      )}


      {/* =========================================================================
          SPOTIFY & YOUTUBE EMBEDS
          ========================================================================= */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Spotify Playlist Embed */}
        <div className="lg:col-span-6 rounded-2xl glass-panel border border-emerald-500/30 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-wider font-bold mb-3">
              <Music2 className="w-4 h-4" />
              <span>Official Spotify Playlist</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              Stream on Spotify
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Listen to J.Kail’s full playlist featuring the newest 2026 drops and greatest indie hits directly on Spotify.
            </p>
          </div>

          <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-black min-h-[352px]">
            <iframe
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DZ06evO2PsTBw?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify J.Kail Playlist"
            />
          </div>
        </div>

        {/* YouTube Channel / Video Embed */}
        <div className="lg:col-span-6 rounded-2xl glass-panel border border-red-500/30 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-red-400 text-xs uppercase tracking-wider font-bold mb-3">
              <ExternalLink className="w-4 h-4" />
              <span>YouTube Channel (@itsjkail)</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              Official Music Videos & Shorts
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Watch cinematic Punjabi music visuals, studio recording reels, and teaser clips on J.Kail’s official YouTube channel.
            </p>
          </div>

          <div className="w-full rounded-xl overflow-hidden shadow-2xl aspect-video bg-navy-950 flex flex-col items-center justify-center border border-navy-750 p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500 flex items-center justify-center text-red-500 mb-4 animate-pulse">
              <Play className="w-8 h-8 fill-current translate-x-0.5" />
            </div>
            <h4 className="font-serif font-bold text-white text-lg mb-2">
              J.Kail Official Channel
            </h4>
            <p className="text-xs text-gray-400 max-w-sm mb-6">
              Subscribe to @itsjkail for high-definition Punjabi music videos, studio sessions, and exclusive announcements.
            </p>
            <a
              href="https://youtube.com/@itsjkail?si=vJDzW3uN8eapMQ5-"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              Watch on YouTube
            </a>
          </div>
        </div>

      </div>

    </div>
  );

  // Helper render function for song card - connects directly to Spotify on click
  function renderSongCard(song: Song) {
    const isNew = isNewRelease(song.releaseDate);
    const spotifyUrl = song.links.spotify || "https://open.spotify.com/playlist/37i9dQZF1DZ06evO2PsTBw";

    return (
      <a
        key={song.id}
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Listen to ${song.title} on Spotify`}
        className="group relative rounded-2xl overflow-hidden glass-panel border border-navy-750 hover:border-emerald-500/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col cursor-pointer"
      >
        {/* Cover Art */}
        <div className="relative aspect-square w-full bg-navy-900 overflow-hidden">
          <Image
            src={song.coverImage || "/images/tracks/odhe-bare.jpg"}
            alt={song.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Hover overlay that shows Listen on Spotify */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
              <Music2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full">
              Play on Spotify
            </span>
          </div>

          {/* Automatic NEW Badge based on 30-day window */}
          {isNew && (
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-gold-gradient text-navy-950 text-[10px] font-black uppercase tracking-wider shadow">
              NEW
            </div>
          )}

          {/* Date Tag: exact date if present, else year */}
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/85 text-[11px] text-gray-300 font-mono">
            {formatReleaseDate(song)}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-white truncate group-hover:text-emerald-400 transition-colors">
              {song.title}
            </h3>
            <p className="text-xs text-gray-400 truncate mt-0.5">
              {song.collaborators.length > 0 ? `feat. ${song.collaborators.join(", ")}` : "Solo Release"}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-xs">
            <span className="uppercase text-[10px] text-gold-400 font-semibold tracking-wider">
              {song.parentRelease || song.releaseType.toUpperCase()}
            </span>

            <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold group-hover:underline">
              <span>Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </a>
    );
  }
}
