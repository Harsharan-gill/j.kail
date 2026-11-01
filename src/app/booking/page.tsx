"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, Sliders, CheckCircle, MessageCircle, AlertCircle, Loader2, ChevronDown } from "lucide-react";

// --- Booking Form Components ---

function LiveShowForm() {
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    eventType: "", eventDate: "", cityVenue: "",
    audienceSize: "", budgetRange: "", duration: "",
    message: "", honeypot: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ booking: any; whatsappUrl: string } | null>(null);
  const [serverError, setServerError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Valid phone number required (10+ digits)";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email address required";
    if (!form.eventType) e.eventType = "Please select an event type";
    if (!form.eventDate) e.eventDate = "Event date is required";
    else if (form.eventDate < today) e.eventDate = "Event date cannot be in the past";
    if (!form.cityVenue.trim()) e.cityVenue = "City & venue are required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings/live-show", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data);
      } else {
        setServerError(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-emerald-500/40 text-center flex flex-col items-center gap-6 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            Booking Request Received!
          </h3>
          <p className="text-gray-300 text-sm mb-1">
            ID: <span className="text-gold-400 font-mono font-bold">{success.booking.id}</span>
          </p>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Thank you, <strong className="text-white">{success.booking.fullName}</strong>! Your live show enquiry has been submitted. J.Kail Production will review and confirm within 24-48 hours.
          </p>
        </div>
        <a
          href={success.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          Confirm on WhatsApp
        </a>
        <button
          onClick={() => setSuccess(null)}
          className="text-xs text-gray-400 hover:text-gold-400 transition-colors underline underline-offset-2"
        >
          Submit another booking
        </button>
      </div>
    );
  }

  const field = (id: string, label: string, type = "text", required = true, placeholder = "") => (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        min={type === "date" ? today : undefined}
        value={(form as any)[id]}
        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full bg-navy-900/80 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
          errors[id] ? "border-red-500 focus:border-red-400" : "border-navy-750 focus:border-gold-500"
        }`}
      />
      {errors[id] && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot */}
      <input type="text" name="honeypot" value={form.honeypot} onChange={e => setForm(f => ({ ...f, honeypot: e.target.value }))} className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {field("fullName", "Full Name", "text", true, "Your full name")}
        {field("phone", "Phone Number", "tel", true, "+91 98765 XXXXX")}
      </div>
      {field("email", "Email Address", "email", true, "your@email.com")}

      <div>
        <label htmlFor="eventType" className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">
          Event Type <span className="text-gold-400">*</span>
        </label>
        <div className="relative">
          <select
            id="eventType"
            value={form.eventType}
            onChange={e => setForm(f => ({ ...f, eventType: e.target.value }))}
            className={`w-full appearance-none bg-navy-900/80 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors pr-10 ${
              errors.eventType ? "border-red-500" : "border-navy-750 focus:border-gold-500"
            }`}
          >
            <option value="">Select event type...</option>
            {["Wedding", "Club/Night Show", "College Fest", "Private Party", "Corporate", "Award Night", "Other"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        {errors.eventType && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.eventType}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {field("eventDate", "Event Date", "date", true)}
        {field("cityVenue", "City & Venue", "text", true, "e.g. Grand Palace, Chandigarh")}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="audienceSize" className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">Expected Audience</label>
          <select id="audienceSize" value={form.audienceSize} onChange={e => setForm(f => ({ ...f, audienceSize: e.target.value }))} className="w-full appearance-none bg-navy-900/80 border border-navy-750 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors">
            <option value="">Select...</option>
            {["Under 100", "100-300", "300-500", "500-1000", "1000-3000", "3000+"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="budgetRange" className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">Budget Range</label>
          <select id="budgetRange" value={form.budgetRange} onChange={e => setForm(f => ({ ...f, budgetRange: e.target.value }))} className="w-full appearance-none bg-navy-900/80 border border-navy-750 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors">
            <option value="">Select...</option>
            {["Below ₹1L", "₹1L-₹2.5L", "₹2.5L-₹5L", "₹5L-₹10L", "₹10L+", "Negotiate"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="duration" className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">Performance Duration</label>
          <select id="duration" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="w-full appearance-none bg-navy-900/80 border border-navy-750 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors">
            <option value="">Select...</option>
            {["30 mins", "45 mins", "60 mins", "90 mins", "2 hours", "Custom"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">Additional Details / Special Requests</label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Any specific songs, stage requirements, sound setup details..."
          className="w-full bg-navy-900/80 border border-navy-750 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors resize-none"
        />
      </div>

      {serverError && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-full bg-gold-gradient text-navy-950 font-black text-sm uppercase tracking-widest shadow-gold-sm hover:shadow-gold-md hover:scale-[1.01] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {submitting ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : <>Submit Live Show Booking<Calendar className="w-4 h-4" /></>}
      </button>
    </form>
  );
}

function ProductionForm() {
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    serviceNeeded: "", genre: "", purpose: "",
    referenceLink: "", deadline: "", budgetRange: "",
    description: "", honeypot: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ booking: any; whatsappUrl: string } | null>(null);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Valid phone number required (10+ digits)";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email address required";
    if (!form.serviceNeeded) e.serviceNeeded = "Please select a service";
    if (!form.description.trim() || form.description.trim().length < 20)
      e.description = "Please describe your project in at least 20 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings/production", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data);
      } else {
        setServerError(data.error || "Failed to submit. Please try again.");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-emerald-500/40 text-center flex flex-col items-center gap-6 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            Production Request Received!
          </h3>
          <p className="text-gray-300 text-sm mb-1">
            Project ID: <span className="text-gold-400 font-mono font-bold">{success.booking.id}</span>
          </p>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Your music production enquiry has been submitted. J.Kail will personally review your brief and respond within 24 hours via WhatsApp or Email.
          </p>
        </div>
        <a
          href={success.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest transition-colors shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          Confirm on WhatsApp
        </a>
        <button
          onClick={() => setSuccess(null)}
          className="text-xs text-gray-400 hover:text-gold-400 transition-colors underline underline-offset-2"
        >
          Submit another project
        </button>
      </div>
    );
  }

  const field = (id: string, label: string, type = "text", required = true, placeholder = "") => (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      <input
        id={id} type={type} required={required}
        value={(form as any)[id]}
        onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full bg-navy-900/80 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors ${
          errors[id] ? "border-red-500 focus:border-red-400" : "border-navy-750 focus:border-gold-500"
        }`}
      />
      {errors[id] && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[id]}</p>}
    </div>
  );

  const selectField = (id: string, label: string, options: string[], required = false) => (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={(form as any)[id]}
          onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
          className={`w-full appearance-none bg-navy-900/80 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors pr-10 ${
            errors[id] ? "border-red-500" : "border-navy-750 focus:border-gold-500"
          }`}
        >
          <option value="">Select...</option>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {errors[id] && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <input type="text" name="honeypot" value={form.honeypot} onChange={e => setForm(f => ({ ...f, honeypot: e.target.value }))} className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {field("fullName", "Full Name", "text", true, "Your full name")}
        {field("phone", "Phone Number", "tel", true, "+91 98765 XXXXX")}
      </div>
      {field("email", "Email Address", "email", true, "your@email.com")}

      {selectField("serviceNeeded", "Service Needed", [
        "Custom Song", "Singing / Vocals", "Lyrics Writing",
        "Composition", "Full Production", "Mixing & Mastering",
        "Beat Making", "Other"
      ], true)}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {selectField("genre", "Genre / Style", [
          "Punjabi", "Hip-Hop / Trap", "Urban Desi", "Emotional / Sad",
          "Romantic", "Party", "Bhangra Folk", "Other"
        ])}
        {selectField("purpose", "Project Purpose", [
          "Personal Release", "Gift / Wedding Song", "Brand / Ad Jingle",
          "Film / Video", "Social Media Content", "Other"
        ])}
      </div>

      {field("referenceLink", "Reference Song / Track Link", "url", false, "https://spotify.com/track/... (optional)")}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="deadline" className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">Deadline Date</label>
          <input id="deadline" type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
            className="w-full bg-navy-900/80 border border-navy-750 focus:border-gold-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors" />
        </div>
        {selectField("budgetRange", "Budget Range", [
          "Below ₹5,000", "₹5,000-₹15,000", "₹15,000-₹30,000",
          "₹30,000-₹60,000", "₹60,000+", "Negotiate"
        ])}
      </div>

      <div>
        <label htmlFor="description" className="block text-xs text-gray-300 uppercase tracking-wider font-semibold mb-1.5">
          Project Description <span className="text-gold-400">*</span>
        </label>
        <textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="Describe your project in detail — mood, lyrical theme, target audience, release platform, and any other important information..."
          className={`w-full bg-navy-900/80 border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors resize-none ${
            errors.description ? "border-red-500" : "border-navy-750 focus:border-gold-500"
          }`}
        />
        {errors.description && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
      </div>

      {serverError && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 rounded-full bg-gold-gradient text-navy-950 font-black text-sm uppercase tracking-widest shadow-gold-sm hover:shadow-gold-md hover:scale-[1.01] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {submitting ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting...</> : <>Submit Music Project Request<Sliders className="w-4 h-4" /></>}
      </button>
    </form>
  );
}

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultTab = searchParams.get("type") === "production" ? "production" : "live-show";
  const [activeTab, setActiveTab] = useState<"live-show" | "production">(defaultTab as any);

  return (
    <div className="relative overflow-hidden py-12 sm:py-20 px-4 sm:px-8 max-w-5xl mx-auto">

      <div className="absolute top-20 right-10 w-80 h-80 bg-[radial-gradient(circle,_rgba(201,162,75,0.05)_0%,_transparent_70%)] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>J.Kail Production Bookings</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-white tracking-wide mb-4">
          Book <span className="text-gold-gradient">J.Kail</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Live show performances or studio music production — fill out the form and J.Kail Production will get back to you within 24 hours.
        </p>
      </div>

      {/* Two Big Tab Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <button
          onClick={() => setActiveTab("live-show")}
          className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
            activeTab === "live-show"
              ? "border-gold-400 bg-gold-500/10 shadow-gold-sm"
              : "glass-panel border-navy-750 hover:border-gold-500/40"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${activeTab === "live-show" ? "bg-gold-gradient text-navy-950" : "bg-navy-900 text-gold-400"}`}>
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white mb-2">
            Book a Live Show
          </h3>
          <p className="text-sm text-gray-400">
            Weddings, club nights, college fests, private parties, corporate events. High-energy Punjabi performances.
          </p>
          {activeTab === "live-show" && (
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-gold-gradient text-navy-950 text-xs font-black uppercase tracking-wider">
              Active Form ↓
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("production")}
          className={`p-6 rounded-2xl border text-left transition-all duration-300 ${
            activeTab === "production"
              ? "border-gold-400 bg-gold-500/10 shadow-gold-sm"
              : "glass-panel border-navy-750 hover:border-gold-500/40"
          }`}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${activeTab === "production" ? "bg-gold-gradient text-navy-950" : "bg-navy-900 text-gold-400"}`}>
            <Sliders className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-white mb-2">
            Create Music With Us
          </h3>
          <p className="text-sm text-gray-400">
            Custom songs, vocals, lyrics, composition, full production, mixing & mastering services.
          </p>
          {activeTab === "production" && (
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-gold-gradient text-navy-950 text-xs font-black uppercase tracking-wider">
              Active Form ↓
            </span>
          )}
        </button>
      </div>

      {/* Active Form */}
      <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-navy-750">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
          {activeTab === "live-show" ? "Live Show Booking Form" : "Music Production Booking Form"}
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          {activeTab === "live-show"
            ? "Fill in your event details below. Fields marked with * are required."
            : "Tell us about your music project. J.Kail will personally review your brief."}
        </p>

        {activeTab === "live-show" ? <LiveShowForm /> : <ProductionForm />}
      </div>

      {/* Trust Signals */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {[
          { icon: "⚡", title: "24hr Response", desc: "J.Kail personally responds to every booking inquiry." },
          { icon: "🔒", title: "Secure & Private", desc: "Your booking details are kept completely confidential." },
          { icon: "💬", title: "WhatsApp Confirmation", desc: "Get instant confirmation via WhatsApp after submission." }
        ].map((t, i) => (
          <div key={i} className="p-5 rounded-2xl glass-panel border border-navy-750 text-center">
            <div className="text-3xl mb-2">{t.icon}</div>
            <h4 className="font-serif text-sm font-bold text-white mb-1">{t.title}</h4>
            <p className="text-xs text-gray-400">{t.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
