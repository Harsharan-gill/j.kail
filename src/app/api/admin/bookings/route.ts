import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jkail2026";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader === `Bearer ${ADMIN_PASSWORD}`) return true;
  const passParam = req.nextUrl.searchParams.get("password");
  if (passParam === ADMIN_PASSWORD) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const filePath = path.join(process.cwd(), "data", "bookings.json");
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ liveShows: [], production: [] });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, type, status } = await req.json();
    const filePath = path.join(process.cwd(), "data", "bookings.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (type === "liveShows") {
      const idx = data.liveShows.findIndex((b: any) => b.id === id);
      if (idx !== -1) {
        data.liveShows[idx].status = status;
      }
    } else if (type === "production") {
      const idx = data.production.findIndex((b: any) => b.id === id);
      if (idx !== -1) {
        data.production[idx].status = status;
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update booking" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, type } = await req.json();
    const filePath = path.join(process.cwd(), "data", "bookings.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (type === "liveShows") {
      data.liveShows = data.liveShows.filter((b: any) => b.id !== id);
    } else if (type === "production") {
      data.production = data.production.filter((b: any) => b.id !== id);
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json({ success: true, message: "Booking removed successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 500 });
  }
}
