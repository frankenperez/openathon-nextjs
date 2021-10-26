const path = require("path");

module.exports = {
  images: {
    domains: ["localhost"],
    imageSizes: [64, 128, 320, 512, 640]
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "node_modules"), path.join(__dirname, "src/styles")]
  }
};
