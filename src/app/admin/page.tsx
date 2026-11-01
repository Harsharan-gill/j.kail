"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Lock, LogOut, Download, Search, RefreshCw,
  CheckCircle, XCircle, Phone, Mail, Calendar,
  Music2, Disc3, Trash2, Edit3, Plus, Eye,
  ChevronDown, AlertCircle, Loader2, Shield
} from "lucide-react";

const ADMIN_PASSWORD = "jkail2026";

type Tab = "live-shows" | "production" | "songs" | "shows";
type BookingStatus = "New" | "Contacted" | "Confirmed" | "Rejected";

const statusColors: Record<BookingStatus, string> = {
  New: "bg-blue-950/60 border-blue-500/50 text-blue-300",
  Contacted: "bg-yellow-950/60 border-yellow-500/50 text-yellow-300",
  Confirmed: "bg-emerald-950/60 border-emerald-500/50 text-emerald-300",
  Rejected: "bg-red-950/60 border-red-500/50 text-red-300"
};

function exportCSV(data: any[], filename: string) {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const csv = [keys.join(","), ...data.map(row => keys.map(k => `"${String(row[k] || "").replace(/"/g, '""')}"`).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("live-shows");
  const [liveBookings, setLiveBookings] = useState<any[]>([]);
  const [prodBookings, setProdBookings] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);
  const [shows, setShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/bookings?password=${ADMIN_PASSWORD}`);
      const data = await res.json();
      setLiveBookings(data.liveShows || []);
      setProdBookings(data.production || []);
    } catch { }
    setLoading(false);
  }, []);

  const fetchSongs = useCallback(async () => {
    const res = await fetch("/api/admin/songs");
    const data = await res.json();
    setSongs(Array.isArray(data) ? data : []);
  }, []);

  const fetchShows = useCallback(async () => {
    const res = await fetch("/api/admin/shows");
    const data = await res.json();
    setShows(Array.isArray(data) ? data : []);
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetchBookings();
    fetchSongs();
    fetchShows();
  }, [authenticated, fetchBookings, fetchSongs, fetchShows]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
  };

  const updateStatus = async (id: string, type: string, status: BookingStatus) => {
    await fetch(`/api/admin/bookings?password=${ADMIN_PASSWORD}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type, status })
    });
    fetchBookings();
  };

  const deleteBooking = async (id: string, type: string) => {
    if (!confirm(`Delete booking ${id}? This action cannot be undone.`)) return;
    await fetch(`/api/admin/bookings?password=${ADMIN_PASSWORD}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type })
    });
    fetchBookings();
  };

  const deleteSong = async (id: string) => {
    if (!confirm(`Delete song "${id}"?`)) return;
    await fetch(`/api/admin/songs?password=${ADMIN_PASSWORD}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchSongs();
  };

  // Filter helper
  const filterItems = (items: any[]) => {
    return items.filter(item => {
      const matchSearch = JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      return matchSearch && matchStatus;
    });
  };

  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gold-gradient text-navy-950 flex items-center justify-center mx-auto mb-4 shadow-gold-md">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white mb-1">Admin Portal</h1>
            <p className="text-xs text-gray-400">J.Kail Production • Secured Access</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 glass-panel border border-navy-750 rounded-3xl p-8">
            <div>
              <label className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-navy-900 border border-navy-750 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none"
                autoFocus
              />
            </div>
            {loginError && (
              <div className="flex items-center gap-2 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4" />
                {loginError}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gold-gradient text-navy-950 font-black uppercase tracking-widest text-sm hover:scale-[1.01] transition-transform"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-4">
            Default password: <code className="text-gold-400">jkail2026</code> — Change via ADMIN_PASSWORD env var
          </p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: "live-shows", label: "Live Show Bookings", icon: Calendar, count: liveBookings.length },
    { id: "production", label: "Music Production", icon: Music2, count: prodBookings.length },
    { id: "songs", label: "Songs / Discography", icon: Disc3, count: songs.length },
    { id: "shows", label: "Upcoming Shows", icon: Calendar, count: shows.length }
  ];

  return (
    <div className="min-h-screen bg-navy-950 pt-4 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 border-b border-navy-800 mb-8">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              J.Kail Production <span className="text-gold-gradient">Admin</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">Manage bookings, songs, shows, and gallery</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { fetchBookings(); fetchSongs(); fetchShows(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-900 border border-navy-750 text-gray-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
            <button
              onClick={() => setAuthenticated(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 hover:text-white text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Live Bookings", value: liveBookings.length, color: "text-gold-400" },
            { label: "New Enquiries", value: [...liveBookings, ...prodBookings].filter(b => b.status === "New").length, color: "text-blue-400" },
            { label: "Confirmed Shows", value: [...liveBookings, ...prodBookings].filter(b => b.status === "Confirmed").length, color: "text-emerald-400" },
            { label: "Catalog Tracks", value: songs.length, color: "text-pink-400" }
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl glass-panel border border-navy-750 text-center">
              <span className={`font-serif text-3xl font-black ${s.color}`}>{s.value}</span>
              <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-navy-800 pb-4">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === tab.id
                    ? "bg-gold-gradient text-navy-950 shadow-gold-sm"
                    : "glass-panel border border-navy-750 text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${activeTab === tab.id ? "bg-navy-950/30" : "bg-navy-800 text-gray-300"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search & Filter Row */}
        {(activeTab === "live-shows" || activeTab === "production") && (
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, ID..."
                className="w-full bg-navy-900 border border-navy-750 focus:border-gold-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="appearance-none bg-navy-900 border border-navy-750 focus:border-gold-500 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none pr-8"
              >
                <option value="all">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Rejected">Rejected</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              onClick={() => exportCSV(
                activeTab === "live-shows" ? liveBookings : prodBookings,
                `jkail-${activeTab}-bookings.csv`
              )}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-800 border border-navy-700 text-gray-300 hover:text-gold-400 text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
          </div>
        )}

        {/* Live Show Bookings Tab */}
        {!loading && activeTab === "live-shows" && (
          <div className="flex flex-col gap-4">
            {filterItems(liveBookings).length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>No live show bookings found.</p>
              </div>
            ) : filterItems(liveBookings).map((b: any) => (
              <div key={b.id} className="p-5 sm:p-6 rounded-2xl glass-panel border border-navy-750 hover:border-gold-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-gold-400 font-bold">{b.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${statusColors[b.status as BookingStatus] || statusColors.New}`}>
                        {b.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">{b.fullName}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{b.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{b.email}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.eventDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={b.status}
                      onChange={e => updateStatus(b.id, "liveShows", e.target.value as BookingStatus)}
                      className="appearance-none bg-navy-900 border border-navy-750 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Confirmed</option>
                      <option>Rejected</option>
                    </select>
                    <a
                      href={`https://wa.me/91${b.phone.replace(/\D/g, "").slice(-10)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:text-white transition-colors"
                      title="WhatsApp"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => deleteBooking(b.id, "liveShows")}
                      className="p-2 rounded-lg bg-red-950/60 border border-red-500/40 text-red-400 hover:text-white transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-navy-800 pt-4">
                  <div><span className="text-gray-500 block">Event Type</span><span className="text-white font-medium">{b.eventType}</span></div>
                  <div><span className="text-gray-500 block">Venue & City</span><span className="text-white font-medium">{b.cityVenue}</span></div>
                  <div><span className="text-gray-500 block">Audience</span><span className="text-white font-medium">{b.audienceSize}</span></div>
                  <div><span className="text-gray-500 block">Budget</span><span className="text-white font-medium">{b.budgetRange}</span></div>
                </div>

                {b.message && (
                  <div className="mt-3 px-4 py-3 rounded-lg bg-navy-900/60 border border-navy-800">
                    <p className="text-xs text-gray-400">{b.message}</p>
                  </div>
                )}
                <p className="text-right text-[10px] text-gray-600 mt-2">
                  Submitted: {new Date(b.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Production Bookings Tab */}
        {!loading && activeTab === "production" && (
          <div className="flex flex-col gap-4">
            {filterItems(prodBookings).length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <Music2 className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p>No production bookings found.</p>
              </div>
            ) : filterItems(prodBookings).map((b: any) => (
              <div key={b.id} className="p-5 sm:p-6 rounded-2xl glass-panel border border-navy-750 hover:border-gold-500/30 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-gold-400 font-bold">{b.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold ${statusColors[b.status as BookingStatus] || statusColors.New}`}>
                        {b.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">{b.fullName}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{b.phone}</span>
                      <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{b.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={b.status}
                      onChange={e => updateStatus(b.id, "production", e.target.value as BookingStatus)}
                      className="appearance-none bg-navy-900 border border-navy-750 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-gold-500"
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Confirmed</option>
                      <option>Rejected</option>
                    </select>
                    <button
                      onClick={() => deleteBooking(b.id, "production")}
                      className="p-2 rounded-lg bg-red-950/60 border border-red-500/40 text-red-400 hover:text-white transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-t border-navy-800 pt-4">
                  <div><span className="text-gray-500 block">Service</span><span className="text-white font-medium">{b.serviceNeeded}</span></div>
                  <div><span className="text-gray-500 block">Genre</span><span className="text-white font-medium">{b.genre}</span></div>
                  <div><span className="text-gray-500 block">Purpose</span><span className="text-white font-medium">{b.purpose}</span></div>
                  <div><span className="text-gray-500 block">Budget</span><span className="text-white font-medium">{b.budgetRange}</span></div>
                </div>

                <div className="mt-3 px-4 py-3 rounded-lg bg-navy-900/60 border border-navy-800">
                  <p className="text-xs text-gray-300">{b.description}</p>
                </div>

                <p className="text-right text-[10px] text-gray-600 mt-2">
                  Submitted: {new Date(b.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Songs Tab */}
        {!loading && activeTab === "songs" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-400">
                {songs.length} tracks in catalog. Edit <code className="text-gold-400">data/songs.json</code> to add or modify songs, then restart the server.
              </p>
              <button
                onClick={() => exportCSV(songs, "jkail-discography.csv")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-800 border border-navy-700 text-gray-300 hover:text-gold-400 text-xs font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-navy-750">
              <table className="w-full text-xs text-left">
                <thead className="bg-navy-900 border-b border-navy-750">
                  <tr>
                    {["Title", "Type", "Parent Release", "Year", "Release Date", "Collaborators", "Featured"].map(h => (
                      <th key={h} className="px-4 py-3 text-gray-400 uppercase tracking-wider font-semibold whitespace-nowrap">{h}</th>
                    ))}
                    <th className="px-4 py-3 text-gray-400 uppercase tracking-wider font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-800">
                  {songs.map((song: any) => (
                    <tr key={song.id} className="hover:bg-navy-900/40 transition-colors">
                      <td className="px-4 py-3 text-white font-medium font-serif">{song.title}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          song.releaseType === "single" ? "bg-navy-800 text-gray-300" :
                          song.releaseType === "ep" ? "bg-purple-950/60 border border-purple-500/40 text-purple-300" :
                          "bg-gold-950/60 border border-gold-500/40 text-gold-300"
                        }`}>
                          {song.releaseType}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{song.parentRelease || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{song.year}</td>
                      <td className="px-4 py-3 text-gold-400 font-mono">{song.releaseDate || "—"}</td>
                      <td className="px-4 py-3 text-gray-400">{song.collaborators?.join(", ") || "Solo"}</td>
                      <td className="px-4 py-3">
                        {song.featured ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <span className="text-gray-600">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => deleteSong(song.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40 transition-colors"
                          title="Delete song"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Shows Tab */}
        {!loading && activeTab === "shows" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-400">
                Edit <code className="text-gold-400">data/shows.json</code> to manage upcoming show listings.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {shows.map((show: any) => (
                <div key={show.id} className="p-5 rounded-2xl glass-panel border border-navy-750 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-base font-bold text-white mb-1">{show.title}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      <span>{show.date}</span>
                      <span>{show.venue}, {show.city}</span>
                      <span className={`px-2 py-0.5 rounded-full font-bold ${
                        show.status === "Upcoming" ? "bg-emerald-950 text-emerald-300" : "bg-navy-800 text-gray-400"
                      }`}>
                        {show.status}
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-navy-900 border border-navy-750 text-xs text-gray-300">
                    {show.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
