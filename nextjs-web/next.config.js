/** @type {import('next').NextConfig} */
const { version } = require('./package.json');

const nextConfig = {
  experimental: {
    forceSwcTransforms: true
  },
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'tr'],
    defaultLocale: 'tr'
  },
  compiler: {
    styledComponents: true
  },
  env: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    hasuraUrl: process.env.HASURA_URL,
    version: version
  }
};

module.exports = nextConfig;
