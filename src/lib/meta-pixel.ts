// Meta Pixel utility for Grand Polo Club & Resort
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export function fbqTrack(event: string, params?: Record<string, unknown>, eventId?: string) {
  if (typeof window !== "undefined" && window.fbq) {
    if (eventId) {
      // Send with eventID for server-side deduplication
      window.fbq("track", event, params, { eventID: eventId });
    } else {
      window.fbq("track", event, params);
    }
  }
}

export function fbqTrackCustom(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", event, params);
  }
}

export function trackLead(params?: { formType?: string; propertyInterest?: string; eventId?: string }) {
  fbqTrack("Lead", params, params?.eventId);
}

export function trackContact(eventId?: string) {
  fbqTrack("Contact", undefined, eventId);
}

export function trackViewContent(params?: Record<string, unknown>, eventId?: string) {
  fbqTrack("ViewContent", params, eventId);
}

export function trackInitiateCheckout() {
  fbqTrack("InitiateCheckout");
}

export function trackCompleteRegistration() {
  fbqTrack("CompleteRegistration");
}

export function trackSearch(params?: Record<string, unknown>) {
  fbqTrack("Search", params);
}

export function trackAddToWishlist() {
  fbqTrack("AddToWishlist");
}

export function trackPhoneCall() {
  fbqTrackCustom("PhoneCall");
}

export function trackEmailClick() {
  fbqTrackCustom("EmailClick");
}

// Get fbp cookie for CAPI matching
export function getFbp(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : undefined;
}

// Get fbc cookie for CAPI matching (click ID)
export function getFbc(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(/_fbc=([^;]+)/);
  return match ? match[1] : undefined;
}
