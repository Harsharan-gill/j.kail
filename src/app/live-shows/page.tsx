"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Calendar, Users, Mic2, Star,
  Music2, ChevronRight, ArrowRight, Clock,
  CheckCircle, Sparkles, MessageCircle
} from "lucide-react";

const showTypes = [
  { icon: "💍", title: "Weddings", desc: "Sangeet nights, reception parties, and full mehendi performances. High-energy Punjabi folk meets modern Urban Desi." },
  { icon: "🎧", title: "Club Nights", desc: "Late-night DJ + live vocal sets. Urban Desi & Punjabi hip-hop that moves the crowd until sunrise." },
  { icon: "🎓", title: "College Fests", desc: "Electric annual fest performances with crowd interaction, exclusive drops, and non-stop energy." },
  { icon: "🥂", title: "Private Parties", desc: "Exclusive VIP events with bespoke setlists and personalized performance experiences." },
  { icon: "🏢", title: "Corporate Events", desc: "Professional live entertainment for gala dinners, product launches, and company celebrations." },
  { icon: "🌟", title: "Award Nights", desc: "Prestige entertainment for cultural evenings, award galas, and entertainment-focused corporate events." }
];

const galleryShows = [
  { src: "/images/jkail-hero.jpg", alt: "J.Kail Live Stage Performance – Red Arena Lights" },
  { src: "/images/jkail-studio.jpg", alt: "J.Kail Pre-Show Setup in Studio" },
  { src: "/images/jkail-about-portrait.jpg", alt: "J.Kail Artistic Portrait" },
  { src: "/images/tracks/odhe-bare.jpg", alt: "Odhe Bare Music Video Visual" }
];

export default function LiveShowsPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  const whatsappShowBookingUrl = "https://wa.me/919915639404?text=Hello%20J.Kail%20Production,%20I%20am%20interested%20in%20booking%20J.Kail%20for%20a%20Live%20Show%20performance.";

  return (
    <div className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">

      {/* Background accent */}
      <div className="absolute top-32 right-10 w-80 h-80 bg-[radial-gradient(circle,_rgba(201,162,75,0.05)_0%,_transparent_70%)] pointer-events-none -z-10" />

      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase mb-4">
          <Mic2 className="w-3.5 h-3.5" />
          <span>Live Performance Bookings</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-wide mb-4">
          Experience <span className="text-gold-gradient">J.Kail</span> Live
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
          Raw energy, powerful Punjabi vocals, and a stage presence that commands the room. Book J.Kail for your event directly via WhatsApp with J.Kail Production.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={whatsappShowBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shimmer-button px-8 py-4 rounded-full bg-gold-gradient text-navy-950 font-bold text-xs uppercase tracking-widest shadow-gold-sm hover:scale-105 transition-transform flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            Book a Live Show on WhatsApp
          </a>
          <a
            href="tel:+919915639404"
            className="px-6 py-4 rounded-full glass-panel border border-gold-500/40 text-gold-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
          >
            Call: +91 99156 39404
          </a>
        </div>
      </div>

      {/* Show Types Grid */}
      <div className="mb-20">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
          Event Types We Perform At
        </h2>
        <p className="text-center text-gray-400 text-sm mb-10">
          From intimate VIP soirées to massive 5000-seat festival arenas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {showTypes.map((type, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={`p-6 rounded-2xl glass-panel border transition-all duration-300 flex flex-col justify-between ${
                hovered === idx
                  ? "border-gold-500/60 -translate-y-1 shadow-gold-sm"
                  : "border-navy-750"
              }`}
            >
              <div>
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold-300">
                  {type.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">{type.desc}</p>
              </div>

              <a
                href={`https://wa.me/919915639404?text=Hi%20J.Kail%20Production,%20I%20want%20to%20book%20a%20live%20performance%20for%20a%20${encodeURIComponent(type.title)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
              >
                <span>Book for {type.title} on WhatsApp</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Strip */}
      <div className="mb-20">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
          Live Show Gallery
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryShows.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-2xl overflow-hidden border border-navy-750 hover:border-gold-500/50 transition-all group shadow-lg"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-xs font-medium line-clamp-2">{item.alt}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* CTA Section - Direct WhatsApp Booking */}
      <div className="relative rounded-3xl overflow-hidden border border-gold-500/40 p-8 sm:p-14 text-center bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950">
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <MessageCircle className="w-8 h-8 fill-current" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-white">
            Book J.Kail for Your <span className="text-gold-gradient">Event Today</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Directly connect with J.Kail Production via WhatsApp to check dates, rider requirements, and live pricing for weddings, clubs, festivals, and VIP private events.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={whatsappShowBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-button px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              Chat & Book on WhatsApp
            </a>
            <a
              href="tel:+919915639404"
              className="px-6 py-3.5 rounded-full border border-gold-500/50 bg-navy-900/60 text-gold-300 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
            >
              Call +91 99156 39404
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
