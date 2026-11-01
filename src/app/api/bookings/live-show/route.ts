import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { LiveShowBooking } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot spam protection
    if (body.website_url_honey || body.honeypot) {
      return NextResponse.json({ success: true, message: "Booking received" });
    }

    const {
      fullName,
      phone,
      email,
      eventType,
      eventDate,
      cityVenue,
      audienceSize,
      budgetRange,
      duration,
      message,
    } = body;

    // Server-side validation
    if (!fullName || !phone || !email || !eventType || !eventDate || !cityVenue) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Phone, Email, Event Type, Date, Venue)" },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    // Phone validation
    if (phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Please enter a valid contact phone number (at least 10 digits)" }, { status: 400 });
    }

    const bookingsFilePath = path.join(process.cwd(), "data", "bookings.json");
    let currentData = { liveShows: [] as LiveShowBooking[], production: [] as any[] };

    if (fs.existsSync(bookingsFilePath)) {
      try {
        const fileContent = fs.readFileSync(bookingsFilePath, "utf8");
        currentData = JSON.parse(fileContent);
      } catch {
        // Fallback if empty
      }
    }

    const newBooking: LiveShowBooking = {
      id: `LS-${Date.now().toString().slice(-6)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      eventType,
      eventDate,
      cityVenue: cityVenue.trim(),
      audienceSize: audienceSize || "Not specified",
      budgetRange: budgetRange || "Negotiable",
      duration: duration || "60-90 mins",
      message: message ? message.trim() : "",
      status: "New",
      createdAt: new Date().toISOString(),
    };

    currentData.liveShows = [newBooking, ...(currentData.liveShows || [])];

    fs.writeFileSync(bookingsFilePath, JSON.stringify(currentData, null, 2), "utf8");

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      `*New Live Show Booking Inquiry*\n\n` +
      `*ID:* ${newBooking.id}\n` +
      `*Name:* ${newBooking.fullName}\n` +
      `*Phone:* ${newBooking.phone}\n` +
      `*Email:* ${newBooking.email}\n` +
      `*Event Type:* ${newBooking.eventType}\n` +
      `*Date:* ${newBooking.eventDate}\n` +
      `*City & Venue:* ${newBooking.cityVenue}\n` +
      `*Audience:* ${newBooking.audienceSize}\n` +
      `*Budget:* ${newBooking.budgetRange}\n` +
      `*Duration:* ${newBooking.duration}\n` +
      (newBooking.message ? `*Notes:* ${newBooking.message}\n` : "") +
      `\nSent via J.Kail Official Website.`
    );

    const whatsappUrl = `https://wa.me/919915639404?text=${waText}`;

    return NextResponse.json({
      success: true,
      booking: newBooking,
      whatsappUrl,
      message: "Your live show booking request has been submitted successfully!",
    });
  } catch (error) {
    console.error("Error creating live show booking:", error);
    return NextResponse.json({ error: "Failed to process booking. Please try again." }, { status: 500 });
  }
}
