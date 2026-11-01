import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Show } from "@/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jkail2026";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader === `Bearer ${ADMIN_PASSWORD}`) return true;
  const passParam = req.nextUrl.searchParams.get("password");
  if (passParam === ADMIN_PASSWORD) return true;
  return false;
}

const showsFilePath = path.join(process.cwd(), "data", "shows.json");

export async function GET() {
  if (!fs.existsSync(showsFilePath)) {
    return NextResponse.json([]);
  }
  const data = JSON.parse(fs.readFileSync(showsFilePath, "utf8"));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const showData: Show = await req.json();
    let shows: Show[] = [];
    if (fs.existsSync(showsFilePath)) {
      shows = JSON.parse(fs.readFileSync(showsFilePath, "utf8"));
    }

    if (!showData.id) {
      showData.id = `show-${Date.now().toString().slice(-4)}`;
    }

    shows = [showData, ...shows];
    fs.writeFileSync(showsFilePath, JSON.stringify(shows, null, 2), "utf8");

    return NextResponse.json({ success: true, show: showData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add show" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const showData: Show = await req.json();
    if (!fs.existsSync(showsFilePath)) {
      return NextResponse.json({ error: "Shows file not found" }, { status: 404 });
    }

    let shows: Show[] = JSON.parse(fs.readFileSync(showsFilePath, "utf8"));
    const index = shows.findIndex((s) => s.id === showData.id);

    if (index === -1) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    shows[index] = { ...shows[index], ...showData };
    fs.writeFileSync(showsFilePath, JSON.stringify(shows, null, 2), "utf8");

    return NextResponse.json({ success: true, show: shows[index] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update show" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!fs.existsSync(showsFilePath)) {
      return NextResponse.json({ error: "Shows file not found" }, { status: 404 });
    }

    let shows: Show[] = JSON.parse(fs.readFileSync(showsFilePath, "utf8"));
    shows = shows.filter((s) => s.id !== id);
    fs.writeFileSync(showsFilePath, JSON.stringify(shows, null, 2), "utf8");

    return NextResponse.json({ success: true, message: "Show deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete show" }, { status: 500 });
  }
}
