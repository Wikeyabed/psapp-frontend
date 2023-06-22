module.exports = {
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
};
