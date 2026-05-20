// Meta Pixel utility for Grand Polo Club & Resort
declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}


export function fbqTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
}

export function fbqTrackCustom(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", event, params);
  }
}

export function trackLead(params?: { formType?: string; propertyInterest?: string }) {
  fbqTrack("Lead", params);
}

export function trackContact() {
  fbqTrack("Contact");
}

export function trackViewContent(params?: Record<string, unknown>) {
  fbqTrack("ViewContent", params);
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
