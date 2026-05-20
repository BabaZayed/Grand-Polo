export interface UTMData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  ref?: string;
  firstTouchTimestamp?: number;
  landingPage?: string;
}

const UTM_KEY = "gp_utm";

export function getUTMData(): UTMData | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(UTM_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function getUTMString(): string {
  const utm = getUTMData();
  if (!utm) return "";
  const params = new URLSearchParams();
  if (utm.source) params.set("utm_source", utm.source);
  if (utm.medium) params.set("utm_medium", utm.medium);
  if (utm.campaign) params.set("utm_campaign", utm.campaign);
  if (utm.term) params.set("utm_term", utm.term);
  if (utm.content) params.set("utm_content", utm.content);
  if (utm.ref) params.set("ref", utm.ref);
  return params.toString();
}

export function getUtmForApi(): { utmSource?: string; utmMedium?: string; utmCampaign?: string } {
  const utm = getUTMData();
  if (!utm) return {};
  return {
    utmSource: utm.source,
    utmMedium: utm.medium,
    utmCampaign: utm.campaign,
  };
}
