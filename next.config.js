/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.youtube.com", "i.ytimg.com"],
    formats: ["image/avif", "image/webp"],
  },
  //compiler: {
  //  removeConsole: process.env.NODE_ENV === "production",
  //},
  allowedDevOrigins: ["dskb-dhruv.loca.lt"]
};

module.exports = nextConfig;
