/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  env: {
    BASE_URL: process.env.REACT_APP_API_URL,
    PORT: process.env.PORT,
  },
};
