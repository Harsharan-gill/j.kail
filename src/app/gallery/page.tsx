"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, Filter } from "lucide-react";
import { getGallery } from "@/lib/data";

const categories = ["All", "Live Shows", "Studio", "Branding", "Shoots"];

export default function GalleryPage() {
  const galleryItems = getGallery();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase mb-4">
          <ZoomIn className="w-3.5 h-3.5" />
          <span>Visual Gallery</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-wide mb-4">
          The World of <span className="text-gold-gradient">J.Kail</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Behind the scenes, live on stage, in the studio, and on set. Visual stories from J.Kail Production.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? "bg-gold-gradient text-navy-950 shadow-gold-sm"
                : "glass-panel border border-navy-750 text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="group relative rounded-2xl overflow-hidden border border-navy-750 hover:border-gold-500/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-gold-sm hover:-translate-y-1 bg-navy-900"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
              <ZoomIn className="w-8 h-8 text-gold-400 mb-3" />
              <h3 className="font-serif text-lg font-bold text-white mb-1">{item.title}</h3>
              <p className="text-xs text-gray-300 line-clamp-2">{item.description}</p>
              <span className="mt-3 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/50 text-gold-300 text-[10px] uppercase tracking-wider font-bold">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Filter className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>No items in this category yet.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden glass-panel border border-gold-500/40 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-navy-950/90 border border-gold-500/40 flex items-center justify-center text-gray-300 hover:text-white hover:border-gold-400 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full max-h-[70vh] aspect-video">
              <Image
                src={lightboxItem.image}
                alt={lightboxItem.title}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-2xl font-bold text-white">{lightboxItem.title}</h3>
                <span className="px-3 py-1 rounded-full bg-gold-gradient text-navy-950 text-xs font-black uppercase">
                  {lightboxItem.category}
                </span>
              </div>
              <p className="text-gray-300 text-sm">{lightboxItem.description}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
