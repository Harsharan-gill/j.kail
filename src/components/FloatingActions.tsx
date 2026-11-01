"use client";

import Link from "next/link";
import { MessageCircle, Calendar } from "lucide-react";

export default function FloatingActions() {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-20 right-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919915639404?text=Hello%20J.Kail%20Production,%20I%20am%20interested%20in%20booking%20or%20music%20production."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp +91 99156 39404"
        className="group flex items-center gap-2 rounded-full bg-emerald-600 px-3.5 py-2.5 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 hover:bg-emerald-500"
      >
        <span className="hidden sm:inline text-xs font-semibold tracking-wide">
          WhatsApp
        </span>
        <MessageCircle className="w-4 h-4 fill-current" />
      </a>

      {/* Floating Book Now Button */}
      <Link
        href="/booking"
        aria-label="Book Now"
        className="group flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2.5 text-navy-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm transition-transform hover:scale-105 active:scale-95"
      >
        <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Book Now</span>
      </Link>
    </aside>
  );
}
