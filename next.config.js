// const withPWA = require("next-pwa")({
//   dest: "public",
// });

// module.exports = withPWA({
//   reactStrictMode: true,
//   distDir: "builded",
//   images: {
//     domains: ["picsum.photos"],
//   },

//   async redirects() {
//     return [
//       {
//         source: "/",
//         destination: "/shop",
//         permanent: true,
//       },
//     ];
//   },
// });

module.exports = {
  reactStrictMode: true,
  distDir: "builded",
  images: {
    domains: ["picsum.photos", "localhost"],
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
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
