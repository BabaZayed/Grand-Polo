"use client";

import { useEffect } from "react";
import { fbqTrackCustom } from "@/lib/meta-pixel";

export default function UTMTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source");
    const medium = params.get("utm_medium");
    const campaign = params.get("utm_campaign");
    const term = params.get("utm_term");
    const content = params.get("utm_content");
    const ref = params.get("ref");

    if (source || medium || campaign || ref) {
      const existing = localStorage.getItem("gp_utm");
      if (!existing) {
        const utmData = {
          source: source || undefined,
          medium: medium || undefined,
          campaign: campaign || undefined,
          term: term || undefined,
          content: content || undefined,
          ref: ref || undefined,
          firstTouchTimestamp: Date.now(),
          landingPage: window.location.href,
        };
        localStorage.setItem("gp_utm", JSON.stringify(utmData));
        fbqTrackCustom("UTM_Capture", { source, medium, campaign });
      }
    }
  }, []);

  return null;
}
