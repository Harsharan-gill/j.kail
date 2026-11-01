"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  Instagram,
  Youtube,
  Music,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast = window.scrollY > 20;
          setScrolled((prev) => (prev !== isPast ? isPast : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Music", href: "/music" },
    { name: "Live Shows", href: "/live-shows" },
    { name: "Production Studio", href: "/production" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* 1. Slim Top Bar with Phone & Social Icons */}
      <div className="bg-navy-950/95 border-b border-navy-800/80 text-xs text-gray-300 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Contact Numbers */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href="tel:+919915639404"
              className="flex items-center gap-1.5 text-gray-300 hover:text-gold-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>+91 99156 39404</span>
            </a>
            <span className="text-navy-700">|</span>
            <a
              href="https://wa.me/919915639404"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Production</span>
            </a>
            <span className="hidden md:inline text-navy-700">|</span>
            <span className="hidden md:inline text-gray-400">
              Ludhiana, Punjab
            </span>
          </div>

          {/* Top Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://open.spotify.com/playlist/37i9dQZF1DZ06evO2PsTBw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <Music className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com/@itsjkail?si=vJDzW3uN8eapMQ5-"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gray-400 hover:text-rose-500 transition-colors"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/j.kail_production?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-pink-400 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/admin"
              className="ml-2 text-[10px] text-gray-500 hover:text-gold-400 border border-navy-700 hover:border-gold-500/50 rounded px-1.5 py-0.5 transition-colors"
              title="Admin Portal"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navbar */}
      <nav
        className={`px-4 sm:px-8 py-3 transition-colors duration-150 ${
          scrolled
            ? "bg-[#07090E]/95 border-b border-gold-500/20 shadow-lg shadow-black/40"
            : "bg-gradient-to-b from-navy-950/80 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative flex items-center gap-3 group">
            <div className="relative w-36 h-10 sm:w-44 sm:h-11">
              <Image
                src="/images/jkail-production-logo.png"
                alt="J.Kail Production"
                fill
                priority
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/#about" && (pathname === "/" || pathname === "/about"));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold transition-colors duration-200 ${
                    isActive ? "text-gold-400" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gold-gradient rounded-full shadow-gold-sm transition-all" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Booking CTA Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/booking"
              className="relative group overflow-hidden rounded-full bg-gold-gradient px-5 py-2 text-xs font-bold uppercase tracking-widest text-navy-950 shadow-gold-sm transition-all duration-300 hover:shadow-gold-md hover:scale-105 active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Booking
                <ChevronRight className="w-3.5 h-3.5 stroke-[3] transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
              <span className="absolute inset-0 bg-gold-gradient-hover opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-gold-400 hover:bg-navy-800/60 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950 border-b border-gold-500/20 px-6 py-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/#about" && (pathname === "/" || pathname === "/about"));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between py-2 text-sm uppercase tracking-wider font-medium border-b border-navy-850 ${
                    isActive ? "text-gold-400 font-bold" : "text-gray-300"
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? "text-gold-400" : "text-navy-600"}`} />
                </Link>
              );
            })}

            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full bg-gold-gradient font-bold uppercase tracking-widest text-navy-950 text-xs shadow-gold-sm"
              >
                Book a Live Show / Studio
              </Link>

              <div className="flex justify-around pt-3 border-t border-navy-800 text-xs text-gray-400">
                <a href="tel:+919915639404" className="flex items-center gap-1.5 hover:text-gold-400">
                  <Phone className="w-3.5 h-3.5 text-gold-500" />
                  Call
                </a>
                <a
                  href="https://wa.me/919915639404"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-400">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
