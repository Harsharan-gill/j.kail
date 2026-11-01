"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Sparkles,
  Calendar,
  Sliders,
  Mic2,
  Headphones,
  ArrowRight,
  Disc3,
  ExternalLink,
  ChevronRight,
  Music2,
  CheckCircle2,
  Volume2,
  PenTool,
  CheckCircle,
  MapPin,
  Users
} from "lucide-react";
import { useAudio } from "@/components/AudioPlayerContext";
import { getAllSongs, getLatestRelease, isNewRelease, getSiteConfig } from "@/lib/data";
import { Song } from "@/types";

export default function HomePage() {
  const { currentSong, isPlaying, playSong, togglePlay } = useAudio();
  const [songs, setSongs] = useState<Song[]>([]);
  const [latestTrack, setLatestTrack] = useState<Song | null>(null);
  const siteConfig = getSiteConfig();

  useEffect(() => {
    const all = getAllSongs();
    setSongs(all);
    setLatestTrack(getLatestRelease());
  }, []);

  const isLatestPlaying = currentSong?.id === latestTrack?.id && isPlaying;
  const isWangNew = latestTrack ? isNewRelease(latestTrack.releaseDate) : true;

  return (
    <div className="relative overflow-hidden">
      
      {/* =========================================================================
          HERO SECTION: Full-screen, Moody Ken Burns zoom, Gold dust, Letter fade
          ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-8">
        
        {/* Background Image - Clean & Crisp */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <div className="relative w-full h-full scale-100">
            <Image
              src="/images/jkail-hero.jpg"
              alt="J.Kail Punjabi Artist"
              fill
              priority
              className="object-cover object-center opacity-70"
            />
          </div>
        </div>

        {/* Cinematic dark gradients & radial gold accents */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/85" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center pt-8 pb-16">
          
          {/* Subtle Location & Brand Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-300 text-xs tracking-[0.25em] uppercase mb-6 shadow-gold-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
            <span>J.Kail Production • Ludhiana, Punjab</span>
          </div>

          {/* Big Heading "J.KAIL" with gold-silver gradient */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white mb-4 drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]">
            <span className="text-gold-gradient inline-block hover:scale-[1.02] transition-transform duration-300">
              J.KAIL
            </span>
          </h1>

          {/* Tagline: Singer • Lyricist • Composer • Producer */}
          <p className="text-base sm:text-xl md:text-2xl font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gray-200 max-w-3xl mb-8">
            Singer <span className="text-gold-400 mx-1.5">•</span> Lyricist <span className="text-gold-400 mx-1.5">•</span> Composer <span className="text-gold-400 mx-1.5">•</span> Producer
          </p>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl font-sans font-normal leading-relaxed mb-10 text-balance">
            Real Punjabi raw emotion meets modern urban Desi & hip-hop beats. Crafting chart-topping singles and high-energy live show experiences across India and worldwide.
          </p>

          {/* Two Gold Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/booking?type=live-show"
              className="shimmer-button w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-navy-950 font-bold text-xs sm:text-sm tracking-widest uppercase shadow-gold-md hover:shadow-gold-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 stroke-[2.5]" />
              <span>Book a Live Show</span>
            </Link>

            <Link
              href="/booking?type=production"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-gold-500/50 text-gold-300 hover:text-white hover:border-gold-400 font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gold-500/10"
            >
              <Sliders className="w-4 h-4" />
              <span>Create Your Music</span>
            </Link>
          </div>

          {/* Scroll Down Hint */}
          <div className="mt-16 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
            <span>Explore Latest Music</span>
            <div className="w-5 h-9 rounded-full border-2 border-gold-500/40 flex items-start justify-center p-1">
              <span className="w-1 h-2 rounded-full bg-gold-400 animate-bounce" />
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          FEATURED LATEST RELEASE: "WANG" (Released October 27, 2026)
          ========================================================================= */}
      {latestTrack && (
        <section className="relative py-12 px-4 sm:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden glass-panel border border-gold-500/30 p-6 sm:p-10 lg:p-12 shadow-xl bg-navy-900/90">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Artwork / Play Preview Card */}
              <div className="lg:col-span-5 relative group">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold-500/40 shadow-xl bg-navy-950">
                  <Image
                    src={latestTrack.coverImage || "/images/tracks/odhe-bare.jpg"}
                    alt={latestTrack.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Subtle dark gradient on artwork */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => playSong(latestTrack)}
                      aria-label={isLatestPlaying ? "Pause WANG" : "Play WANG preview"}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold-gradient flex items-center justify-center text-navy-950 shadow-gold-md hover:scale-105 active:scale-95 transition-transform"
                    >
                      {isLatestPlaying ? (
                        <Pause className="w-8 h-8 fill-current" />
                      ) : (
                        <Play className="w-8 h-8 fill-current translate-x-0.5" />
                      )}
                    </button>
                  </div>

                  {/* NEW Badge on artwork */}
                  {isWangNew && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold-gradient text-navy-950 font-black text-xs uppercase tracking-widest shadow-gold-sm">
                      NEW RELEASE
                    </div>
                  )}

                  {/* Track Duration Tag */}
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-xs text-gray-300 font-mono">
                    {latestTrack.duration || "3:04"}
                  </div>
                </div>
              </div>

              {/* Release Metadata & Streaming Links */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                
                {/* Status Bar with Animated Equalizer Bars */}
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-navy-800 border border-gold-500/40 text-gold-400 text-xs font-semibold uppercase tracking-wider">
                    Latest Official Release
                  </span>

                  {/* Equalizer next to Now Streaming */}
                  <div className="flex items-center gap-2 text-xs text-gray-300 bg-navy-800/60 px-3 py-1 rounded-full border border-navy-700">
                    <span className="text-gray-400">Now Streaming</span>
                    <div className="flex items-end gap-1 h-3.5">
                      <span className={`w-1 bg-gold-400 rounded-full transition-all ${isLatestPlaying ? "h-3.5 animate-pulse" : "h-1"}`} />
                      <span className={`w-1 bg-gold-400 rounded-full transition-all ${isLatestPlaying ? "h-2.5 animate-[pulse_0.7s_infinite]" : "h-2"}`} />
                      <span className={`w-1 bg-gold-400 rounded-full transition-all ${isLatestPlaying ? "h-3.5 animate-[pulse_0.5s_infinite_0.2s]" : "h-1.5"}`} />
                      <span className={`w-1 bg-gold-400 rounded-full transition-all ${isLatestPlaying ? "h-2 animate-[pulse_0.9s_infinite_0.4s]" : "h-1"}`} />
                    </div>
                  </div>
                </div>

                {/* Title & Release Date */}
                <div>
                  <h2 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-wide mb-1">
                    {latestTrack.title}
                  </h2>
                  <p className="text-gold-400 text-sm sm:text-base font-medium">
                    Released October 27, 2026 • J.Kail Production
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  The brand new Punjabi banger by <strong className="text-white">J.Kail</strong>. Featuring heavy 808s, punchy Desi rhythms, and powerful vocals written, composed and produced in Ludhiana.
                </p>

                {/* Streaming Platform CTA Chips */}
                <div className="pt-2">
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-semibold">
                    Listen on your favorite platform:
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {latestTrack.links.spotify && (
                      <a
                        href={latestTrack.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-emerald-950/70 border border-emerald-500/50 hover:bg-emerald-900/80 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Music2 className="w-3.5 h-3.5" />
                        <span>Spotify</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}
                    {latestTrack.links.appleMusic && (
                      <a
                        href={latestTrack.links.appleMusic}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-rose-950/70 border border-rose-500/50 hover:bg-rose-900/80 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Music2 className="w-3.5 h-3.5" />
                        <span>Apple Music</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}
                    {latestTrack.links.jioSaavn && (
                      <a
                        href={latestTrack.links.jioSaavn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-cyan-950/70 border border-cyan-500/50 hover:bg-cyan-900/80 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Music2 className="w-3.5 h-3.5" />
                        <span>JioSaavn</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}
                    {latestTrack.links.gaana && (
                      <a
                        href={latestTrack.links.gaana}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-red-950/70 border border-red-500/50 hover:bg-red-900/80 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Music2 className="w-3.5 h-3.5" />
                        <span>Gaana</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}
                    {latestTrack.links.youtube && (
                      <a
                        href={latestTrack.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-rose-900/60 border border-red-600/50 hover:bg-red-900/80 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>YouTube Music</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Listen Now Action */}
                <div className="pt-3 flex items-center gap-4">
                  <button
                    onClick={() => playSong(latestTrack)}
                    className="px-6 py-2.5 rounded-full bg-gold-gradient text-navy-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    {isLatestPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isLatestPlaying ? "Pause Preview" : "Play Preview Track"}</span>
                  </button>

                  <Link
                    href="/music"
                    className="text-xs uppercase tracking-wider font-semibold text-gray-300 hover:text-gold-400 flex items-center gap-1 transition-colors"
                  >
                    <span>View Full Discography</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SECTION TAB PILLS: Quick Jump Shortcuts
          ========================================================================= */}
      <nav aria-label="Section shortcuts" className="py-6 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-gold-500/40 text-gold-300 hover:text-navy-950 hover:bg-gold-gradient text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Journey (About)</span>
          </a>

          <Link
            href="/music"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-navy-700 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105"
          >
            <Music2 className="w-3.5 h-3.5 text-gold-400" />
            <span>Music Discography</span>
          </Link>

          <Link
            href="/live-shows"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-navy-700 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105"
          >
            <Calendar className="w-3.5 h-3.5 text-gold-400" />
            <span>Live Shows</span>
          </Link>

          <Link
            href="/production"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-navy-700 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105"
          >
            <Sliders className="w-3.5 h-3.5 text-gold-400" />
            <span>Production Studio</span>
          </Link>

          <Link
            href="/gallery"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-navy-700 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105"
          >
            <Disc3 className="w-3.5 h-3.5 text-gold-400" />
            <span>Gallery</span>
          </Link>

          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-navy-700 hover:border-gold-500/40 text-gray-300 hover:text-gold-300 text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-105"
          >
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span>Contact</span>
          </Link>
        </div>
      </nav>

      {/* =========================================================================
          FEATURED TRACKS GRID / SLIDER
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending & Fan Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
              Featured Punjabi Tracks
            </h2>
          </div>
          <Link
            href="/music"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>Explore All {songs.length} Tracks</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {songs.filter((s) => s.featured || s.id === "odhe-bare-2026").slice(0, 4).map((song) => {
            const isSongNew = isNewRelease(song.releaseDate);
            const spotifyUrl = song.links.spotify || "https://open.spotify.com/playlist/37i9dQZF1DZ06evO2PsTBw";

            return (
              <a
                key={song.id}
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden glass-panel border border-navy-750 hover:border-emerald-500/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg flex flex-col cursor-pointer"
              >
                {/* Artwork */}
                <div className="relative aspect-square w-full overflow-hidden bg-navy-900">
                  <Image
                    src={song.coverImage || "/images/tracks/odhe-bare.jpg"}
                    alt={song.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg">
                      <Music2 className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider bg-black/60 px-3 py-1 rounded-full">
                      Play on Spotify
                    </span>
                  </div>

                  {isSongNew && (
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-gold-gradient text-navy-950 text-[10px] font-black uppercase tracking-wider shadow">
                      NEW
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/85 text-[11px] text-gray-300">
                    {song.year}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-white truncate group-hover:text-emerald-400 transition-colors">
                      {song.title}
                    </h3>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {song.collaborators.length > 0 ? `feat. ${song.collaborators.join(", ")}` : "J.Kail Solo"}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-navy-800 flex items-center justify-between text-xs">
                    <span className="uppercase text-[10px] text-gold-400 font-semibold tracking-wider">
                      {song.parentRelease ? `${song.parentRelease} (${song.releaseType.toUpperCase()})` : song.releaseType.toUpperCase()}
                    </span>

                    <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold">
                      <span>Spotify</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>


      {/* =========================================================================
          ABOUT SECTION: The Journey of J.Kail (ID: about, full two-image, 4 pillars, stats)
          ========================================================================= */}
      <section id="about" className="scroll-mt-28 py-20 px-4 sm:px-8 max-w-7xl mx-auto relative overflow-hidden">
        
        {/* BIG VERTICAL OUTLINED TEXT (Desktop Side Watermark) */}
        <aside
          aria-hidden="true"
          className="hidden 2xl:block absolute -left-12 top-1/3 pointer-events-none select-none z-0 transform -rotate-90 origin-top-left"
        >
          <span
            className="text-7xl font-black font-serif tracking-[0.3em] uppercase opacity-15 text-transparent"
            style={{
              WebkitTextStroke: "1.5px #C9A24B",
            }}
          >
            J.KAIL – MUSICIAN
          </span>
        </aside>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase mb-4 shadow-gold-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Journey of J.Kail</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-wide mb-4">
            From Ludhiana to the <br />
            <span className="text-gold-gradient">World’s Headphones</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Discover the artistry, production discipline, and independent spirit behind one of Punjab’s most prolific new-age creators.
          </p>
        </div>

        {/* Main 2-Column: Two-Image Layout + Exact Artist Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Two-Image Layout */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl group">
              <Image
                src="/images/jkail-about-portrait.jpg"
                alt="Jatin Verma (J.Kail)"
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-gold-300 font-serif font-bold flex items-center justify-between">
                <span>Jatin Verma</span>
                <span className="text-[10px] text-gray-400 font-sans font-normal uppercase">Artist</span>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl mt-8 group">
              <Image
                src="/images/jkail-studio.jpg"
                alt="J.Kail in Production Studio"
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-gold-300 font-serif font-bold flex items-center justify-between">
                <span>J.Kail Studio</span>
                <span className="text-[10px] text-gray-400 font-sans font-normal uppercase">Ludhiana</span>
              </div>
            </div>
          </div>

          {/* Exact Artist Bio Text & Meta Badges */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Singer • Lyricist • Composer • Producer</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Jatin Verma <span className="text-gold-400 font-normal">p.k.a</span> J.Kail
            </h3>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light">
              <strong className="text-gold-300 font-semibold">J.Kail (Jatin Verma)</strong> is a rising Punjabi singer, lyricist, composer and music producer based in <strong className="text-white">Ludhiana, Punjab</strong>. Running his own independent setup, <strong className="text-white">J.Kail Production</strong>, he releases a steady stream of urban Desi, hip-hop and emotive Punjabi tracks.
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              He has gained traction through collaborative EPs, albums and singles with indie artists like <strong className="text-gold-400">Emo Devil, Gagan Bhatoye, Yoddha, Zehn, Flameboy and Muzikidd</strong>. Whether behind the microphone laying down raw melodic vocals or behind the DAW crafting punching basslines and cinematic arrangements, J.Kail represents the independent Punjabi movement at its finest.
            </p>

            {/* Location & Status Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-gray-300">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-750">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                <span>Ludhiana, Punjab, India</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-750">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>Active 2025 – Present</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-750">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Independent Setup (J.Kail Production)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/booking?type=live-show"
                className="px-6 py-3 rounded-full bg-gold-gradient text-navy-950 font-bold text-xs uppercase tracking-widest shadow-gold-sm hover:scale-105 transition-transform"
              >
                Book Live Show
              </Link>
              <Link
                href="/booking?type=production"
                className="px-6 py-3 rounded-full glass-panel border border-gold-500/40 text-gold-300 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Create Music With Us
              </Link>
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1DZ06evO2PsTBw"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Music2 className="w-3.5 h-3.5" />
                <span>Spotify Playlist</span>
              </a>
            </div>

          </div>

        </div>

        {/* Dynamic Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-gold-500/30 text-center relative overflow-hidden group hover:border-gold-400 transition-colors">
            <span className="font-serif text-3xl sm:text-5xl font-black text-gold-gradient block">
              {songs.length || 26}+
            </span>
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-wider text-white mt-2 font-bold">
              Total Songs Released
            </h4>
            <p className="text-[11px] text-gray-400 mt-1">Across Singles, EPs & Albums</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-gold-500/30 text-center relative overflow-hidden group hover:border-gold-400 transition-colors">
            <span className="font-serif text-3xl sm:text-5xl font-black text-gold-gradient block">
              4-in-1
            </span>
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-wider text-white mt-2 font-bold">
              Complete Musician
            </h4>
            <p className="text-[11px] text-gray-400 mt-1">Singer, Lyricist, Composer, Producer</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-gold-500/30 text-center relative overflow-hidden group hover:border-gold-400 transition-colors">
            <span className="font-serif text-3xl sm:text-5xl font-black text-gold-gradient block">
              2 EPs & 1 Album
            </span>
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-wider text-white mt-2 font-bold">
              Major Projects
            </h4>
            <p className="text-[11px] text-gray-400 mt-1">Healer, 96 Hour's & Missed Call</p>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl glass-panel border border-gold-500/30 text-center relative overflow-hidden group hover:border-gold-400 transition-colors">
            <span className="font-serif text-3xl sm:text-5xl font-black text-gold-gradient block">
              6+
            </span>
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-wider text-white mt-2 font-bold">
              Indie Collaborations
            </h4>
            <p className="text-[11px] text-gray-400 mt-1">Emo Devil, Flameboy, Yoddha & more</p>
          </div>
        </div>

        {/* The Four Pillars of J.Kail */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              The Four Pillars of <span className="text-gold-gradient">J.Kail</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              A self-contained musical powerhouse with full creative control over writing, composition, performance, and audio engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl glass-panel border border-navy-750 hover:border-gold-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-gold-gradient text-navy-950 flex items-center justify-center mb-4">
                  <Mic2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1.5">Singer</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Raw, heartfelt, and dynamic vocal delivery crossing from energetic Bhangra hooks to moody urban Desi and emotional heartbreak melodies.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-navy-750 hover:border-gold-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-gold-gradient text-navy-950 flex items-center justify-center mb-4">
                  <PenTool className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1.5">Lyricist</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Penning authentic, poetry-steeped Punjabi lyrics reflecting true street stories, modern urban Desi lifestyle, and heartfelt love.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-navy-750 hover:border-gold-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-gold-gradient text-navy-950 flex items-center justify-center mb-4">
                  <Music2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1.5">Composer</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Crafting memorable melodies and hooklines that connect instantly with listeners across Punjab and global diaspora audiences.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-navy-750 hover:border-gold-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-gold-gradient text-navy-950 flex items-center justify-center mb-4">
                  <Sliders className="w-5 h-5 stroke-[2.2]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-white mb-1.5">Music Producer</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Operating J.Kail Production to sculpt heavy 808s, punchy drum kits, acoustic instruments, and polished studio sound.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Collaborators Spotlight */}
        <div className="rounded-3xl glass-panel border border-navy-750 p-6 sm:p-10 text-center">
          <div className="inline-flex items-center gap-1.5 text-gold-400 text-xs font-semibold tracking-wider uppercase mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Underground & Indie Community</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
            Collaborative Spirit
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto mb-6">
            J.Kail believes in pushing the envelope through collective creative chemistry. Featuring acclaimed indie artists:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {["Emo Devil", "Gagan Bhatoye", "Yoddha", "Zehn", "Flameboy", "Muzikidd"].map((artist, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-navy-900 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider hover:bg-gold-500/10 transition-colors"
              >
                {artist}
              </span>
            ))}
          </div>
        </div>

      </section>


      {/* =========================================================================
          SERVICES CARDS: Live shows, music production, mixing & mastering, custom songs
          ========================================================================= */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-navy-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>J.Kail Production Offerings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide mb-4">
            Services & Collaborations
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            From explosive live stadium performances to bespoke recording and world-class mixing and mastering in Ludhiana, Punjab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.artist.services.map((srv, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl glass-panel border border-navy-750 hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-gold-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gold-gradient text-navy-950 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {idx === 0 && <Mic2 className="w-6 h-6 stroke-[2.2]" />}
                  {idx === 1 && <Sliders className="w-6 h-6 stroke-[2.2]" />}
                  {idx === 2 && <Headphones className="w-6 h-6 stroke-[2.2]" />}
                  {idx === 3 && <Sparkles className="w-6 h-6 stroke-[2.2]" />}
                </div>

                <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-navy-800">
                <Link
                  href={idx === 0 ? "/booking?type=live-show" : "/booking?type=production"}
                  className="text-xs font-semibold text-gold-400 hover:text-gold-300 flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Book Service</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================================
          CTA BANNER: Book Live Show or Create Music
          ========================================================================= */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto mb-16">
        <div className="relative rounded-3xl overflow-hidden border border-gold-500/40 p-8 sm:p-14 text-center bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 shadow-2xl">
          <div className="absolute inset-0 bg-gold-500/5 pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
            <span className="px-4 py-1 rounded-full bg-gold-gradient text-navy-950 text-xs font-black uppercase tracking-widest">
              Available For 2026-2027 Bookings
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white">
              Ready to Bring <span className="text-gold-gradient">J.Kail Live</span> to Your Event?
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
              Weddings, club nights, college festivals, and private VIP events. Reserve your dates directly with J.Kail Production or reach out on WhatsApp for quick inquiries.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                href="/booking"
                className="shimmer-button px-8 py-3.5 rounded-full bg-gold-gradient text-navy-950 font-bold text-xs uppercase tracking-widest shadow-gold-sm hover:scale-105 transition-transform"
              >
                Open Booking Portal
              </Link>
              <a
                href="https://wa.me/919915639404"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-emerald-500/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 font-bold text-xs uppercase tracking-widest transition-colors"
              >
                WhatsApp +91 99156 39404
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
