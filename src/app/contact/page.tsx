import Link from "next/link";
import Image from "next/image";
import {
  Phone, MessageCircle, Instagram, Youtube, Music2,
  MapPin, Mail, ExternalLink, Disc3, Clock
} from "lucide-react";

export default function ContactPage() {
  const contacts = [
    {
      icon: Phone, label: "Phone / Call", value: "+91 99156 39404",
      href: "tel:+919915639404", color: "text-gold-400", bg: "bg-gold-950/50 border-gold-500/30"
    },
    {
      icon: MessageCircle, label: "WhatsApp Production", value: "+91 99156 39404",
      href: "https://wa.me/919915639404", color: "text-emerald-400", bg: "bg-emerald-950/50 border-emerald-500/30"
    },
    {
      icon: Instagram, label: "Instagram @j.kail_production", value: "Bookings, Production & Mixing Enquiries",
      href: "https://www.instagram.com/j.kail_production?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw==", color: "text-pink-400", bg: "bg-pink-950/40 border-pink-500/30"
    },
    {
      icon: Youtube, label: "YouTube @itsjkail", value: "Music Videos & Official Content",
      href: "https://youtube.com/@itsjkail?si=vJDzW3uN8eapMQ5-", color: "text-red-400", bg: "bg-red-950/40 border-red-500/30"
    },
    {
      icon: Music2, label: "Spotify Playlist", value: "Stream all official releases",
      href: "https://open.spotify.com/playlist/37i9dQZF1DZ06evO2PsTBw", color: "text-emerald-300", bg: "bg-emerald-950/30 border-emerald-600/30"
    },
    {
      icon: Disc3, label: "Apple Music", value: "Stream on Apple Music",
      href: "https://music.apple.com/in/artist/j-kail/1786293959", color: "text-rose-300", bg: "bg-rose-950/30 border-rose-500/30"
    },
    {
      icon: Music2, label: "JioSaavn", value: "Stream on JioSaavn",
      href: "https://www.jiosaavn.com/artist/j.kail-songs/LYa6bwEoc7M_", color: "text-cyan-300", bg: "bg-cyan-950/30 border-cyan-500/30"
    },
    {
      icon: Music2, label: "Gaana", value: "Stream on Gaana",
      href: "https://gaana.com/artist/j-kail", color: "text-red-300", bg: "bg-red-950/30 border-red-500/30"
    }
  ];

  return (
    <div className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">

      <div className="absolute top-20 left-1/3 w-80 h-80 bg-[radial-gradient(circle,_rgba(201,162,75,0.05)_0%,_transparent_70%)] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase mb-4">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-wide mb-4">
          Contact <span className="text-gold-gradient">J.Kail Production</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Reach out for live show bookings, music production, mixing & mastering, custom songs, or any collaboration enquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Left: Contact Cards Grid */}
        <div className="lg:col-span-6">
          <h2 className="font-serif text-2xl font-bold text-white mb-6">
            Find J.Kail Online
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c, idx) => {
              const Icon = c.icon;
              return (
                <a
                  key={idx}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group flex items-start gap-3 ${c.bg}`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-navy-950/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${c.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${c.color}`}>
                      {c.label}
                    </p>
                    <p className="text-sm text-white font-medium truncate">
                      {c.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Facebook (placeholder) */}
          <div className="mt-4 p-5 rounded-2xl glass-panel border border-blue-500/20 bg-blue-950/20">
            <p className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-1">Facebook</p>
            <p className="text-white text-sm font-medium">J Kail Official</p>
            <p className="text-xs text-gray-500 mt-1 italic">
              {/* PLACEHOLDER_FACEBOOK_URL: Replace with official Facebook page URL when ready */}
              Facebook link — <span className="text-yellow-400">add your Facebook URL in data/site-config.json</span>
            </p>
          </div>

          {/* Location & Hours */}
          <div className="mt-6 p-6 rounded-2xl glass-panel border border-navy-750">
            <h3 className="font-serif text-lg font-bold text-white mb-4">Studio Location</h3>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>J.Kail Production, Ludhiana, Punjab 141001, India</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Studio sessions by appointment. WhatsApp to schedule.</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919915639404" className="text-white hover:text-gold-400 transition-colors">
                    +91 99156 39404
                  </a>
                  <span className="text-gray-500 ml-2 text-xs">Production & Bookings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Map Embed + Artist Photo */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Artist Photo */}
          <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl">
            <Image
              src="/images/jkail-hero.jpg"
              alt="J.Kail – Contact J.Kail Production"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-panel border border-gold-500/40 rounded-xl p-4 bg-navy-950/90">
                <p className="text-gold-400 text-xs uppercase tracking-widest font-bold mb-1">
                  J.Kail Production
                </p>
                <p className="text-white text-sm font-medium">
                  Ludhiana, Punjab, India
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <a
                    href="https://wa.me/919915639404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Now
                  </a>
                  <Link
                    href="/booking"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold-gradient text-navy-950 text-xs font-black uppercase tracking-wider hover:scale-105 transition-transform"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="rounded-2xl overflow-hidden border border-navy-750 shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109552.1965819777!2d75.787269!3d30.900965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a7d%3A0x681102348ec60610!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="280"
              loading="lazy"
              title="J.Kail Production Location - Ludhiana, Punjab"
              className="w-full"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
            />
          </div>

          {/* Streaming Platforms Quick Row */}
          <div className="p-5 rounded-2xl glass-panel border border-navy-750">
            <p className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-3">
              Stream J.Kail Music
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Spotify", href: "https://open.spotify.com/playlist/37i9dQZF1DZ06evO2PsTBw", color: "text-emerald-400" },
                { name: "Apple Music", href: "https://music.apple.com/in/artist/j-kail/1786293959", color: "text-rose-400" },
                { name: "JioSaavn", href: "https://www.jiosaavn.com/artist/j.kail-songs/LYa6bwEoc7M_", color: "text-cyan-400" },
                { name: "Gaana", href: "https://gaana.com/artist/j-kail", color: "text-red-400" },
                { name: "YouTube", href: "https://youtube.com/@itsjkail?si=vJDzW3uN8eapMQ5-", color: "text-red-500" }
              ].map(p => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full bg-navy-900 border border-navy-800 text-xs font-semibold hover:scale-105 transition-transform ${p.color}`}
                >
                  {p.name}
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
