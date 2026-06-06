import { NextRequest, NextResponse } from "next/server";
import { PHONE_NUMBER } from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    const brochure = request.nextUrl.searchParams.get("brochure");
    const project = request.nextUrl.searchParams.get("project");

    if (brochure) {
      const safeBrochure = brochure.replace(/[^a-zA-Z0-9_-]/g, "");
      const url = new URL(`/brochures/${safeBrochure}.pdf`, request.url).toString();
      return NextResponse.redirect(url, 302);
    }

    if (project) {
      const safeProject = project.replace(/[^a-zA-Z0-9_-]/g, "");
      const url = new URL(`/brochures/${safeProject}-brochure.pdf`, request.url).toString();
      return NextResponse.redirect(url, 302);
    }

    return NextResponse.json({ error: "brochure or project required" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
