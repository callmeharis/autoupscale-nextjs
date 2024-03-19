/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false, // it should be false by default
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  env: {
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
    ECHO_APP_KEY: process.env.ECHO_APP_KEY,
    ECHO_HOST: process.env.ECHO_HOST,
    ECHO_PORT: process.env.ECHO_PORT,
    ECHO_CLUSTER: process.env.ECHO_CLUSTER,
  },
  i18n: {
    defaultLocale: 'en-us',
    locales: ['en-us'],
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
