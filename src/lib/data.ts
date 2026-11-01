import songsData from "@/../data/songs.json";
import siteConfigData from "@/../data/site-config.json";
import showsData from "@/../data/shows.json";
import galleryData from "@/../data/gallery.json";
import bookingsData from "@/../data/bookings.json";
import { Song, Show, GalleryItem, SiteConfig, LiveShowBooking, ProductionBooking } from "@/types";

export function getSiteConfig(): SiteConfig {
  return siteConfigData as unknown as SiteConfig;
}

export function getAllSongs(): Song[] {
  return songsData as unknown as Song[];
}

export function getLatestRelease(): Song {
  const songs = getAllSongs();
  // Find WANG or newest by release date
  const wang = songs.find((s) => s.id === "wang-2026" || s.title.toUpperCase() === "WANG");
  if (wang) return wang;
  return songs[0];
}

/**
 * Check if a release date is within the last 30 days.
 * Handles exact dates YYYY-MM-DD.
 */
export function isNewRelease(releaseDate?: string | null): boolean {
  if (!releaseDate) return false;
  try {
    const releaseTime = new Date(releaseDate).getTime();
    if (isNaN(releaseTime)) return false;

    // Use current time or reference time 2026-10-31
    const now = new Date().getTime();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    
    // Within last 30 days or upcoming within 7 days
    const diff = now - releaseTime;
    return diff >= -7 * 24 * 60 * 60 * 1000 && diff <= thirtyDaysMs;
  } catch {
    return false;
  }
}

export function getShows(): Show[] {
  return showsData as unknown as Show[];
}

export function getUpcomingShows(): Show[] {
  return getShows().filter((s) => s.status === "Upcoming");
}

export function getGallery(): GalleryItem[] {
  return galleryData as unknown as GalleryItem[];
}

export function getBookings(): { liveShows: LiveShowBooking[]; production: ProductionBooking[] } {
  return bookingsData as unknown as { liveShows: LiveShowBooking[]; production: ProductionBooking[] };
}
