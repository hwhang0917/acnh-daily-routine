const { PHASE_PRODUCTION_SERVER } = require("next/constants");

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';
`;

/** @type {Array<{key: string, value: string}>} */
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

/** @type {(phase: string) => import('next').NextConfig} */
module.exports = (phase) => {
  const isProduction = phase === PHASE_PRODUCTION_SERVER;
  return {
    async headers() {
      return isProduction
        ? [
            {
              source: "/:path*",
              headers: securityHeaders,
            },
          ]
        : [];
    },
    compiler: {
      styledComponents: true,
      removeConsole: isProduction,
    },
    reactStrictMode: true,
    swcMinify: true,
  };
};
