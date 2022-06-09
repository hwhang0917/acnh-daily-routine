const { PHASE_PRODUCTION_SERVER } = require("next/constants");

/** @type {(phase: string) => import('next').NextConfig} */
module.exports = (phase) => {
  const isEnvProduction = phase === PHASE_PRODUCTION_SERVER;

  return {
    reactStrictMode: true,
    compiler: {
      removeConsole: isEnvProduction,
      styledComponents: true,
    },
    swcMinify: isEnvProduction,
    poweredByHeader: false,
    experimental: {
      emotion: true,
    },
  };
};
