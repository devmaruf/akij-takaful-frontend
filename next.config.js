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
  },
};
