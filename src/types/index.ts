export type ReleaseType = "single" | "ep" | "album";

export interface Song {
  id: string;
  title: string;
  releaseType: ReleaseType;
  parentRelease?: string | null;
  year: number;
  releaseDate?: string | null;
  collaborators: string[];
  featured?: boolean;
  duration?: string;
  coverImage: string;
  audioPreview?: string;
  links: {
    spotify?: string;
    appleMusic?: string;
    jioSaavn?: string;
    gaana?: string;
    youtube?: string;
    amazonMusic?: string;
  };
}

export interface Show {
  id: string;
  title: string;
  type: "Wedding" | "Club/Night Show" | "College Fest" | "Private Party" | "Corporate" | "Other";
  date: string;
  city: string;
  venue: string;
  time?: string;
  status: "Upcoming" | "Past" | "Sold Out";
  ticketLink?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Live Shows" | "Studio" | "Branding" | "Shoots" | "Backstage";
  image: string;
  description: string;
}

export type BookingStatus = "New" | "Contacted" | "Confirmed" | "Rejected";

export interface LiveShowBooking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  cityVenue: string;
  audienceSize: string;
  budgetRange: string;
  duration: string;
  message?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface ProductionBooking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  serviceNeeded: string;
  genre: string;
  purpose: string;
  referenceLink?: string;
  deadline?: string;
  budgetRange: string;
  description: string;
  status: BookingStatus;
  createdAt: string;
}

export interface SiteConfig {
  artist: {
    name: string;
    realName: string;
    productionHouse: string;
    owner: string;
    location: string;
    city: string;
    state: string;
    country: string;
    roles: string[];
    tagline: string;
    bio: string;
    services: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    collaborators: string[];
  };
  contact: {
    phone: string;
    telLink: string;
    whatsappNumber: string;
    whatsappLink: string;
    email: string;
    address: string;
    mapEmbed: string;
  };
  socials: {
    instagram: { name: string; handle: string; url: string; description: string };
    facebook: { name: string; label: string; url: string; note: string };
    youtube: { name: string; handle: string; url: string; embedUrl: string };
    spotify: { name: string; url: string; embedUrl: string };
    appleMusic: { name: string; url: string; healerEpUrl: string };
    jioSaavn: { name: string; url: string };
    gaana: { name: string; url: string };
    amazonMusic: { name: string; url: string };
  };
  branding: {
    logoImage: string;
    heroImage: string;
    aboutImage: string;
    studioImage: string;
    theme: {
      primary: string;
      goldLight: string;
      goldDark: string;
      navyDark: string;
      navyLight: string;
    };
  };
}
