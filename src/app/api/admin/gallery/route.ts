import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { GalleryItem } from "@/types";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "jkail2026";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader === `Bearer ${ADMIN_PASSWORD}`) return true;
  const passParam = req.nextUrl.searchParams.get("password");
  if (passParam === ADMIN_PASSWORD) return true;
  return false;
}

const galleryFilePath = path.join(process.cwd(), "data", "gallery.json");

export async function GET() {
  if (!fs.existsSync(galleryFilePath)) {
    return NextResponse.json([]);
  }
  const data = JSON.parse(fs.readFileSync(galleryFilePath, "utf8"));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const itemData: GalleryItem = await req.json();
    let items: GalleryItem[] = [];
    if (fs.existsSync(galleryFilePath)) {
      items = JSON.parse(fs.readFileSync(galleryFilePath, "utf8"));
    }

    if (!itemData.id) {
      itemData.id = `gal-${Date.now().toString().slice(-4)}`;
    }

    items = [itemData, ...items];
    fs.writeFileSync(galleryFilePath, JSON.stringify(items, null, 2), "utf8");

    return NextResponse.json({ success: true, item: itemData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add gallery item" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!fs.existsSync(galleryFilePath)) {
      return NextResponse.json({ error: "Gallery file not found" }, { status: 404 });
    }

    let items: GalleryItem[] = JSON.parse(fs.readFileSync(galleryFilePath, "utf8"));
    items = items.filter((g) => g.id !== id);
    fs.writeFileSync(galleryFilePath, JSON.stringify(items, null, 2), "utf8");

    return NextResponse.json({ success: true, message: "Gallery item removed" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete gallery item" }, { status: 500 });
  }
}
