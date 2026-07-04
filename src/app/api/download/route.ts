import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Handle ?type=brochure|floorplan&file=name.pdf (used by /brochures page)
    const type = request.nextUrl.searchParams.get("type");
    const file = request.nextUrl.searchParams.get("file");

    if (type && file) {
      const safeType = type.replace(/[^a-zA-Z0-9_-]/g, "");
      const safeFile = file.replace(/[^a-zA-Z0-9_.-]/g, "");
      // "brochure" → "brochures" dir, "floorplan" → "floorplans" dir
      const dir = safeType === "floorplan" ? "floorplans" : "brochures";
      const url = new URL(`/downloads/${dir}/${safeFile}`, request.url).toString();
      return NextResponse.redirect(url, 302);
    }

    // Legacy params: ?brochure=name or ?project=name
    const brochure = request.nextUrl.searchParams.get("brochure");
    const project = request.nextUrl.searchParams.get("project");

    if (brochure) {
      const safeBrochure = brochure.replace(/[^a-zA-Z0-9_.-]/g, "");
      const url = new URL(`/downloads/brochures/${safeBrochure}`, request.url).toString();
      return NextResponse.redirect(url, 302);
    }

    if (project) {
      const safeProject = project.replace(/[^a-zA-Z0-9_-]/g, "");
      const url = new URL(`/downloads/brochures/${safeProject}-brochure.pdf`, request.url).toString();
      return NextResponse.redirect(url, 302);
    }

    return NextResponse.json({ error: "Missing parameters. Use type+file, brochure, or project." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
