import { NextRequest, NextResponse } from "next/server";
import { PHONE_NUMBER } from "@/lib/data";

export const runtime = "nodejs";

const getImageOrientation = (page: string, imageType: string): "portrait" | "landscape" => {
  if (page === "fp-1") {
    // Masterplan floorplans are always landscape
    return "landscape";
  }
  // For all other floorplan pages, use portrait
  return "portrait";
};

export async function GET(request: NextRequest) {
  try {
    const project = request.nextUrl.searchParams.get("project");
    const page = request.nextUrl.searchParams.get("page") || "fp-1";

    if (!project) {
      return NextResponse.json({ error: "Project is required" }, { status: 400 });
    }

    // Sanitize inputs
    const safeProject = project.replace(/[^a-zA-Z0-9_-]/g, "");
    const safePage = page.replace(/[^a-zA-Z0-9_-]/g, "");
    const imageType = safePage.includes("masterplan") ? "masterplan" : "floorplan";
    const imageName = `${safeProject}-${safePage}.jpg`;

    // Redirect to the static image URL (Vercel serves public/ files)
    const imageUrl = new URL(`/images/${imageType === "masterplan" ? "masterplans" : "floorplans"}/${imageName}`, request.url).toString();

    return NextResponse.redirect(imageUrl, 302);
  } catch {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
