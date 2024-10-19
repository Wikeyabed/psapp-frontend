const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  transpilePackages: ["mui-color-input"],
  compiler: {
    removeConsole: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      "back-ebox.liara.run",
      "front-ebox.liara.run",
      "picsum.photos",
      "localhost",
      "eebox.ir",
      "api.eebox.ir",
    ],
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
});

// module.exports = {
//   transpilePackages: ["mui-color-input"],
//   compiler: {
//     removeConsole: true,
//   },
//   reactStrictMode: true,
//   images: {
//     domains: [
//       "back-ebox.liara.run",
//       "front-ebox.liara.run",
//       "picsum.photos",
//       "localhost",
//       "eebox.ir",
//       "api.eebox.ir",
//     ],
//   },
//   eslint: {
//     // Warning: This allows production builds to successfully complete even if
//     // your project has ESLint errors.
//     ignoreDuringBuilds: true,
//   },

//   // async redirects() {
//   //   return [
//   //     {
//   //       source: "/shop",
//   //       destination: "/",
//   //       permanent: true,
//   //     },
//   //   ];
//   // },
// };
