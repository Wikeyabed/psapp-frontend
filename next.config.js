const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = withPWA({
  transpilePackages: ["mui-color-input"],
  compiler: {
    removeConsole: true,
  },

  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|svg|gif|ico|eot|ttf|woff|woff2|mp4|pdf|webm)$/,
      type: "asset",
      generator: {
        filename: "static/[path][name].[hash][ext]",
      },
    });

    return config;
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
      "v2api.eebox.ir",
    ],
    // localPatterns: [
    //   {
    //     pathname: "/public/images/**",
    //     search: "",
    //   },
    // ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },


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
