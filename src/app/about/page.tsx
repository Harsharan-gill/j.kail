"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mic2,
  PenTool,
  Music2,
  Sliders,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle,
  ArrowRight,
  Disc3
} from "lucide-react";
import { getAllSongs, getSiteConfig } from "@/lib/data";

export default function AboutPage() {
  const [songCount, setSongCount] = useState(26);

  useEffect(() => {
    const songs = getAllSongs();
    setSongCount(songs.length);
  }, []);

  const roles = [
    {
      title: "Singer",
      desc: "Raw, heartfelt, and dynamic vocal delivery crossing from energetic Bhangra hooks to moody urban Desi and emotional heartbreak melodies.",
      icon: Mic2
    },
    {
      title: "Lyricist",
      desc: "Penning authentic, poetry-steeped Punjabi lyrics reflecting true street stories, modern urban Desi lifestyle, and heartfelt love.",
      icon: PenTool
    },
    {
      title: "Composer",
      desc: "Crafting memorable melodies and hooklines that connect instantly with listeners across Punjab and global diaspora audiences.",
      icon: Music2
    },
    {
      title: "Music Producer",
      desc: "Operating J.Kail Production to sculpt heavy 808s, punchy drum kits, acoustic instruments, and polished studio sound.",
      icon: Sliders
    }
  ];

  const collaborators = [
    "Emo Devil",
    "Gagan Bhatoye",
    "Yoddha",
    "Zehn",
    "Flameboy",
    "Muzikidd"
  ];

  return (
    <div id="about" className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 scroll-mt-28">
      
      {/* Subtle Background Lighting without heavy GPU blurs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[radial-gradient(circle,_rgba(201,162,75,0.06)_0%,_transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[radial-gradient(circle,_rgba(31,43,72,0.15)_0%,_transparent_70%)] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative">
        
        {/* BIG VERTICAL OUTLINED TEXT (Desktop) */}
        <aside
          aria-hidden="true"
          className="hidden xl:block absolute -left-16 top-1/4 pointer-events-none select-none z-0 transform -rotate-90 origin-top-left"
        >
          <span
            className="text-7xl font-black font-serif tracking-[0.3em] uppercase opacity-20 text-transparent"
            style={{
              WebkitTextStroke: "1.5px #C9A24B",
            }}
          >
            J.KAIL – MUSICIAN
          </span>
        </aside>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Journey of J.Kail</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-wide mb-4">
            From Ludhiana to the <br />
            <span className="text-gold-gradient">World’s Headphones</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Discover the artistry, production discipline, and independent spirit behind one of Punjab’s most prolific new-age creators.
          </p>
        </div>

        {/* Two-Image & Bio Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Two-Image Layout */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl">
              <Image
                src="/images/jkail-about-portrait.jpg"
                alt="Jatin Verma (J.Kail)"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs text-gold-300 font-serif font-bold">
                Jatin Verma
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold-500/40 shadow-2xl mt-8">
              <Image
                src="/images/jkail-studio.jpg"
                alt="J.Kail in Production Studio"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs text-gold-300 font-serif font-bold">
                J.Kail Production Studio
              </div>
            </div>
          </div>

          {/* Exact Artist Bio Text */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Jatin Verma <span className="text-gold-400 font-normal">p.k.a</span> J.Kail
            </h2>

            <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light">
              <strong className="text-gold-300 font-semibold">J.Kail (Jatin Verma)</strong> is a rising Punjabi singer, lyricist, composer and music producer based in <strong className="text-white">Ludhiana, Punjab</strong>. Running his own independent setup, <strong className="text-white">J.Kail Production</strong>, he releases a steady stream of urban Desi, hip-hop and emotive Punjabi tracks.
            </p>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              He has gained traction through collaborative EPs, albums and singles with indie artists like <strong className="text-gold-400">Emo Devil, Gagan Bhatoye, Yoddha, Zehn, Flameboy and Muzikidd</strong>. Whether behind the microphone laying down raw melodic vocals or behind the DAW crafting punching basslines and cinematic arrangements, J.Kail represents the independent Punjabi movement at its finest.
            </p>

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
                <span>Independent Setup</span>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/booking"
                className="px-6 py-3 rounded-full bg-gold-gradient text-navy-950 font-bold text-xs uppercase tracking-widest shadow-gold-sm hover:scale-105 transition-transform"
              >
                Book Live Performance
              </Link>
              <Link
                href="/music"
                className="px-6 py-3 rounded-full glass-panel border border-gold-500/40 text-gold-300 hover:text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              >
                Listen to Discography
              </Link>
            </div>

          </div>

        </div>

        {/* Dynamic Count-Up & Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="p-6 rounded-2xl glass-panel border border-gold-500/30 text-center relative overflow-hidden group hover:border-gold-400 transition-colors">
            <span className="font-serif text-4xl sm:text-5xl font-black text-gold-gradient block">
              {songCount}+
            </span>
            <h3 className="font-serif text-sm uppercase tracking-wider text-white mt-2 font-bold">
              Total Songs Released
            </h3>
            <p className="text-xs text-gray-400 mt-1">Across Singles, EPs & Albums</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gold-500/30 text-center relative overflow-hidden group hover:border-gold-400 transition-colors">
            <span className="font-serif text-4xl sm:text-5xl font-black text-gold-gradient block">
              4-in-1
            </span>
            <h3 className="font-serif text-sm uppercase tracking-wider text-white mt-2 font-bold">
              Complete Musician
            </h3>
            <p className="text-xs text-gray-400 mt-1">Singer, Lyricist, Composer, Producer</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gold-500/30 text-center relative overflow-hidden group hover:border-gold-400 transition-colors">
            <span className="font-serif text-4xl sm:text-5xl font-black text-gold-gradient block">
              2 EPs & 1 Album
            </span>
            <h3 className="font-serif text-sm uppercase tracking-wider text-white mt-2 font-bold">
              Major Projects
            </h3>
            <p className="text-xs text-gray-400 mt-1">Healer, 96 Hour's & Missed Call</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-gold-500/30 text-center relative overflow-hidden group hover:border-gold-400 transition-colors">
            <span className="font-serif text-4xl sm:text-5xl font-black text-gold-gradient block">
              6+
            </span>
            <h3 className="font-serif text-sm uppercase tracking-wider text-white mt-2 font-bold">
              Indie Collaborations
            </h3>
            <p className="text-xs text-gray-400 mt-1">Flameboy, Emo Devil & more</p>
          </div>
        </div>

        {/* Roles Breakdown */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-bold text-white mb-3">
              The Four Pillars of <span className="text-gold-gradient">J.Kail</span>
            </h2>
            <p className="text-sm text-gray-300">
              A self-contained musical powerhouse with full creative control over writing, composition, performance, and audio engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-panel border border-navy-750 hover:border-gold-500/50 transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-gradient text-navy-950 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white mb-2">
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collaborators Spotlight */}
        <div className="rounded-3xl glass-panel border border-navy-750 p-8 sm:p-12 text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
            Collaborative Spirit
          </h2>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto mb-8">
            J.Kail believes in pushing the envelope through collective creative chemistry. Featuring acclaimed underground and indie talent:
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {collaborators.map((artist, idx) => (
              <span
                key={idx}
                className="px-5 py-2.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-semibold tracking-wider hover:bg-gold-500/10 transition-colors"
              >
                {artist}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
