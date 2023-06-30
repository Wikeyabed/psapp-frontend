const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  distDir: "builded",
  images: {
    domains: ["picsum.photos"],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/shop",
        permanent: true,
      },
    ];
  },
});
