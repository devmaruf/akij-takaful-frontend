/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  ...nextConfig,
  env: {
    BASE_URL: process.env.REACT_APP_API_URL,
    PORT: process.env.PORT,
    APP_NAME: process.env.APP_NAME,
    APP_DOMAIN: process.env.APP_DOMAIN,
    REACT_APP_PUBLIC_URL: process.env.REACT_APP_PUBLIC_URL,
  },
  typescript: {
    // @TODO: Remove this line in near future after implementing all in typescript
    // Dangerously allow production builds to successfully complete even if your project has type errors.
    ignoreBuildErrors: true,
  },
};
