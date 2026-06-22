import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "thegrandpolo.com" }],
        destination: "https://www.thegrandpolo.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com https://www.google-analytics.com; img-src 'self' data: blob: https://www.facebook.com https://www.google-analytics.com https://cdn.sanity.io; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; frame-src https://www.google.com https://www.youtube.com; connect-src 'self' https://www.google-analytics.com https://graph.facebook.com; object-src 'none'; base-uri 'self'; form-action 'self'" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=60, s-maxage=300, stale-while-revalidate=600" },
        ],
      },
    ];
  },
  // Exclude large binaries from serverless function bundle
  outputFileTracingExcludes: {
    "*": [
      "node_modules/@swc/**",
      "node_modules/@next/swc-*/**",
      "node_modules/sharp/vendor/**",
      "node_modules/sharp/build/**",
      "node_modules/prisma/engines/**",
      "node_modules/prisma/**/engine-*",
      "node_modules/better-sqlite3/build/**",
      "node_modules/esbuild/**",
    ],
  },
  // Use minimal serverless function packaging
}

export default nextConfig;
