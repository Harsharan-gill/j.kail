import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Song } from "@/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jkail2026";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader === `Bearer ${ADMIN_PASSWORD}`) return true;
  const passParam = req.nextUrl.searchParams.get("password");
  if (passParam === ADMIN_PASSWORD) return true;
  return false;
}

const songsFilePath = path.join(process.cwd(), "data", "songs.json");

export async function GET() {
  if (!fs.existsSync(songsFilePath)) {
    return NextResponse.json([]);
  }
  const data = JSON.parse(fs.readFileSync(songsFilePath, "utf8"));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const songData: Song = await req.json();
    let songs: Song[] = [];
    if (fs.existsSync(songsFilePath)) {
      songs = JSON.parse(fs.readFileSync(songsFilePath, "utf8"));
    }

    // Auto-generate id if not present
    if (!songData.id) {
      songData.id = songData.title.toLowerCase().replace(/[^a-z0-9]/g, "-") + `-${songData.year || 2026}`;
    }

    // Insert at beginning
    songs = [songData, ...songs];
    fs.writeFileSync(songsFilePath, JSON.stringify(songs, null, 2), "utf8");

    return NextResponse.json({ success: true, song: songData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add song" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const songData: Song = await req.json();
    if (!fs.existsSync(songsFilePath)) {
      return NextResponse.json({ error: "Songs file not found" }, { status: 404 });
    }

    let songs: Song[] = JSON.parse(fs.readFileSync(songsFilePath, "utf8"));
    const index = songs.findIndex((s) => s.id === songData.id);

    if (index === -1) {
      return NextResponse.json({ error: "Song not found" }, { status: 404 });
    }

    songs[index] = { ...songs[index], ...songData };
    fs.writeFileSync(songsFilePath, JSON.stringify(songs, null, 2), "utf8");

    return NextResponse.json({ success: true, song: songs[index] });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update song" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!fs.existsSync(songsFilePath)) {
      return NextResponse.json({ error: "Songs file not found" }, { status: 404 });
    }

    let songs: Song[] = JSON.parse(fs.readFileSync(songsFilePath, "utf8"));
    songs = songs.filter((s) => s.id !== id);
    fs.writeFileSync(songsFilePath, JSON.stringify(songs, null, 2), "utf8");

    return NextResponse.json({ success: true, message: "Song deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete song" }, { status: 500 });
  }
}
