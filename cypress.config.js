const { defineConfig } = require("cypress");
const fs = require("fs");
module.exports = defineConfig({
  allowCypressEnv: false,
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        ClearDownloads() {
          if (fs.existsSync("cypress/downloads")) {
            fs.rmSync("cypress/downloads", { recursive: true, force: true });
          }
          return null;
        },
      });
    },
  },
});
