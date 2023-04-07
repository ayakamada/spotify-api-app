/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.scdn.co",
      "mosaic.scdn.co",
      "seed-mix-image.spotifycdn.com",
      "wrapped-images.spotifycdn.com",
      "charts-images.scdn.co",
      "newjams-images.scdn.co",
    ],
  },
};

module.exports = nextConfig;
