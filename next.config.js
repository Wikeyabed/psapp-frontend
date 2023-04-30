module.exports = {
  reactStrictMode: true,
  distDir: "build-app",
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
