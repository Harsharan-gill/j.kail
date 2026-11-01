import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MessageCircle,
  Instagram,
  Youtube,
  Music,
  MapPin,
  ExternalLink,
  Mail,
  Disc3,
  Heart
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 border-t border-navy-800/80 pt-16 pb-24 sm:pb-12 text-gray-400 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Artist Bio & Production House */}
          <div className="flex flex-col gap-4">
            <div className="relative w-48 h-12">
              <Image
                src="/images/jkail-production-logo.png"
                alt="J.Kail Production"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              J.Kail (Jatin Verma) is a rising Punjabi singer, lyricist, composer and music producer based in Ludhiana, Punjab. Operating independent setup J.Kail Production with urban Desi, hip-hop and emotive tracks.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-400 font-semibold tracking-wider uppercase">
              <MapPin className="w-3.5 h-3.5" />
              <span>Ludhiana, Punjab, India</span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-white font-serif tracking-wider uppercase text-sm mb-4 border-b border-navy-800 pb-2">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-400 transition-colors">
                  The Journey of J.Kail
                </Link>
              </li>
              <li>
                <Link href="/music" className="hover:text-gold-400 transition-colors">
                  Discography & Streaming
                </Link>
              </li>
              <li>
                <Link href="/live-shows" className="hover:text-gold-400 transition-colors">
                  Live Shows & Tours
                </Link>
              </li>
              <li>
                <Link href="/production" className="hover:text-gold-400 transition-colors">
                  J.Kail Production Studio
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-400 transition-colors">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-gold-400 transition-colors">
                  Live & Studio Booking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Streaming Platforms */}
          <div>
            <h3 className="text-white font-serif tracking-wider uppercase text-sm mb-4 border-b border-navy-800 pb-2">
              Streaming Platforms
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href="https://open.spotify.com/playlist/37i9dQZF1DZ06evO2PsTBw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-emerald-400 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-emerald-400" />
                    Spotify Playlist
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://music.apple.com/in/artist/j-kail/1786293959"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-rose-400 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-rose-400" />
                    Apple Music
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://music.apple.com/us/album/healer-ep/1813392962"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-gold-400 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Disc3 className="w-4 h-4 text-gold-400" />
                    Healer EP (Apple Music)
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.jiosaavn.com/artist/j.kail-songs/LYa6bwEoc7M_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-cyan-400 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-cyan-400" />
                    JioSaavn
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://gaana.com/artist/j-kail"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-red-400 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-red-400" />
                    Gaana
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@itsjkail?si=vJDzW3uN8eapMQ5-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between hover:text-red-500 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-500" />
                    YouTube (@itsjkail)
                  </span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Studio Enquiries */}
          <div>
            <h3 className="text-white font-serif tracking-wider uppercase text-sm mb-4 border-b border-navy-800 pb-2">
              Bookings & Enquiries
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              For live shows, music production, mixing, mastering & vocal bookings:
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="tel:+919915639404"
                className="flex items-center gap-2 text-gray-200 hover:text-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-500" />
                <span>+91 99156 39404</span>
              </a>
              <a
                href="https://wa.me/919915639404"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +91 99156 39404</span>
              </a>
              <a
                href="https://www.instagram.com/j.kail_production?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram: @j.kail_production</span>
              </a>
              <div className="text-xs text-gray-400">
                Facebook: <span className="text-gray-300">J Kail Official</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyrights */}
        <div className="border-t border-navy-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} J.Kail Production. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-gold-400 transition-colors">
              Admin Portal
            </Link>
            <span>•</span>
            <span className="text-gold-400/90 font-medium">Designed for J.Kail Production</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
