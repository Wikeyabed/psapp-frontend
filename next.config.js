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
  // compiler: {
  //   removeConsole: true,
  // },
  reactStrictMode: true,
  images: {
    domains: ["back-ebox.liara.run","front-ebox.liara.run","picsum.photos", "localhost", "eebox.ir", "api.eebox.ir" , "eeboxapi.liara.run","eeboxfront.liara.run"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  // async redirects() {
  //   return [
  //     {
  //       source: "/shop",
  //       destination: "/",
  //       permanent: true,
  //     },
  //   ];
  // },
};
