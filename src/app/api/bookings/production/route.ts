import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ProductionBooking } from "@/types";

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
      serviceNeeded,
      genre,
      purpose,
      referenceLink,
      deadline,
      budgetRange,
      description,
    } = body;

    // Server-side validation
    if (!fullName || !phone || !email || !serviceNeeded || !description) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Phone, Email, Service Needed, Project Description)" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    if (phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Please enter a valid phone number (at least 10 digits)" }, { status: 400 });
    }

    const bookingsFilePath = path.join(process.cwd(), "data", "bookings.json");
    let currentData = { liveShows: [] as any[], production: [] as ProductionBooking[] };

    if (fs.existsSync(bookingsFilePath)) {
      try {
        const fileContent = fs.readFileSync(bookingsFilePath, "utf8");
        currentData = JSON.parse(fileContent);
      } catch {
        // Fallback
      }
    }

    const newBooking: ProductionBooking = {
      id: `PR-${Date.now().toString().slice(-6)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      serviceNeeded,
      genre: genre || "Urban Desi / Punjabi",
      purpose: purpose || "Personal Release",
      referenceLink: referenceLink ? referenceLink.trim() : "",
      deadline: deadline || "Flexible",
      budgetRange: budgetRange || "Standard",
      description: description.trim(),
      status: "New",
      createdAt: new Date().toISOString(),
    };

    currentData.production = [newBooking, ...(currentData.production || [])];

    fs.writeFileSync(bookingsFilePath, JSON.stringify(currentData, null, 2), "utf8");

    // Prepare WhatsApp message
    const waText = encodeURIComponent(
      `*New Studio / Music Production Booking*\n\n` +
      `*ID:* ${newBooking.id}\n` +
      `*Name:* ${newBooking.fullName}\n` +
      `*Phone:* ${newBooking.phone}\n` +
      `*Email:* ${newBooking.email}\n` +
      `*Service:* ${newBooking.serviceNeeded}\n` +
      `*Genre:* ${newBooking.genre}\n` +
      `*Purpose:* ${newBooking.purpose}\n` +
      `*Budget:* ${newBooking.budgetRange}\n` +
      `*Deadline:* ${newBooking.deadline}\n` +
      (newBooking.referenceLink ? `*Reference:* ${newBooking.referenceLink}\n` : "") +
      `*Description:* ${newBooking.description}\n` +
      `\nSent via J.Kail Official Website.`
    );

    const whatsappUrl = `https://wa.me/919915639404?text=${waText}`;

    return NextResponse.json({
      success: true,
      booking: newBooking,
      whatsappUrl,
      message: "Your music production booking inquiry has been received!",
    });
  } catch (error) {
    console.error("Error creating production booking:", error);
    return NextResponse.json({ error: "Failed to process production request. Please try again." }, { status: 500 });
  }
}
