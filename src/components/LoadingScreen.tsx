"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Check if session has already seen the loader
    const hasLoaded = sessionStorage.getItem("jkail_loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    const timer1 = setTimeout(() => {
      setFadingOut(true);
    }, 450);

    const timer2 = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("jkail_loaded", "true");
    }, 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950 transition-opacity duration-200 ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Official Chrome Logo */}
        <div className="relative w-64 h-24 mb-6">
          <Image
            src="/images/jkail-production-logo.png"
            alt="J.Kail Production"
            fill
            priority
            className="object-contain drop-shadow-[0_0_20px_rgba(201,162,75,0.3)]"
          />
        </div>

        {/* Thin Gold Progress Line that fills */}
        <div className="w-48 h-[2px] bg-navy-800 rounded-full overflow-hidden relative">
          <div className="h-full bg-gold-gradient animate-[shimmer_1.2s_ease-in-out_infinite] w-full origin-left transition-transform duration-1000 scale-x-100" />
        </div>

        <p className="mt-3 text-xs tracking-[0.3em] uppercase text-gold-400/80 font-sans">
          Ludhiana • Punjab
        </p>
      </div>
    </div>
  );
}
