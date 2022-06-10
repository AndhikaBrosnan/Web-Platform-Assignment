const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    skipWaiting: true,
    // dest: ".next/pwa",
    // pwa output folder
    //
    // Other configurations:
    // ...
  },
});
