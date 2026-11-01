import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { AudioProvider } from "@/components/AudioPlayerContext";
import songsData from "@/../data/songs.json";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "J.Kail (Jatin Verma) | Official Punjabi Singer, Producer & J.Kail Production",
  description:
    "Official website of J.Kail (Jatin Verma) – Rising Punjabi singer, lyricist, composer & music producer from Ludhiana, Punjab. Owner of J.Kail Production. Stream 'WANG', 'Kaisi Sazaayi', 'Healer EP' and book live shows & studio services.",
  keywords: [
    "J.Kail",
    "Jatin Verma",
    "Punjabi singer",
    "Ludhiana",
    "J.Kail Production",
    "music producer Punjab",
    "live show booking",
    "mixing and mastering",
    "Emo Devil",
    "Gagan Bhatoye",
    "Yoddha",
    "WANG",
    "Kaisi Sazaayi",
    "Odhe Bare",
    "Flameboy",
    "Healer EP",
    "Urban Desi",
    "Punjabi hip hop"
  ],
  authors: [{ name: "J.Kail (Jatin Verma)" }],
  creator: "J.Kail Production",
  publisher: "J.Kail Production",
  metadataBase: new URL("https://jkailmusic.com"),
  openGraph: {
    title: "J.Kail | Official Music Artist & J.Kail Production",
    description:
      "Urban Desi & Punjabi Music powerhouse based in Ludhiana, Punjab. Latest release 'WANG'. Book live shows, studio production, and custom songs.",
    url: "https://jkailmusic.com",
    siteName: "J.Kail Production",
    images: [
      {
        url: "/images/jkail-hero.jpg",
        width: 1200,
        height: 630,
        alt: "J.Kail Official Artist Photo",
      },
    ],
    locale: "en_IN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "J.Kail (Jatin Verma) - Punjabi Singer & Producer",
    description: "Stream 'WANG', 'Kaisi Sazaayi' and book live shows with J.Kail Production.",
    images: ["/images/jkail-hero.jpg"],
  },
  icons: {
    icon: "/images/jkail-production-logo.png",
    shortcut: "/images/jkail-production-logo.png",
    apple: "/images/jkail-production-logo.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Construct MusicGroup JSON-LD Schema
  const musicGroupSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "J.Kail",
    "alternateName": "Jatin Verma",
    "description": "Rising Punjabi singer, lyricist, composer and music producer based in Ludhiana, Punjab. Running his own independent setup, J.Kail Production.",
    "genre": ["Punjabi Music", "Urban Desi", "Punjabi Hip-Hop", "Desi Hip-Hop"],
    "homeLocation": {
      "@type": "City",
      "name": "Ludhiana",
      "addressRegion": "Punjab",
      "addressCountry": "India"
    },
    "founder": {
      "@type": "Person",
      "name": "Jatin Verma",
      "jobTitle": "Singer, Lyricist, Composer, Music Producer"
    },
    "sameAs": [
      "https://open.spotify.com/playlist/37i9dQZF1DZ06evO2PsTBw",
      "https://music.apple.com/in/artist/j-kail/1786293959",
      "https://youtube.com/@itsjkail?si=vJDzW3uN8eapMQ5-",
      "https://www.instagram.com/j.kail_production?utm_source=ig_web_button_share_sheet&srtk=ZDNlZDc0MzIxNw==",
      "https://www.jiosaavn.com/artist/j.kail-songs/LYa6bwEoc7M_",
      "https://gaana.com/artist/j-kail"
    ],
    "album": [
      {
        "@type": "MusicAlbum",
        "name": "Healer (EP)",
        "datePublished": "2025-01-01",
        "byArtist": "J.Kail, Emo Devil, Gagan Bhatoye"
      },
      {
        "@type": "MusicAlbum",
        "name": "96 Hour's (EP)",
        "datePublished": "2025",
        "byArtist": "J.Kail, Yoddha"
      },
      {
        "@type": "MusicAlbum",
        "name": "Missed Call",
        "datePublished": "2025",
        "byArtist": "J.Kail"
      }
    ],
    "track": songsData.map((song) => ({
      "@type": "MusicRecording",
      "name": song.title,
      "datePublished": song.releaseDate || `${song.year}`,
      "byArtist": {
        "@type": "MusicGroup",
        "name": "J.Kail"
      }
    }))
  };

  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable} dark scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(musicGroupSchema) }}
        />
      </head>
      <body className="bg-navy-950 text-foreground selection:bg-gold-500 selection:text-navy-950 min-h-screen flex flex-col antialiased">
        <AudioProvider>
          <LoadingScreen />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 pt-[88px] sm:pt-[94px]">{children}</main>
          <Footer />
          <FloatingActions />
        </AudioProvider>
      </body>
    </html>
  );
}
