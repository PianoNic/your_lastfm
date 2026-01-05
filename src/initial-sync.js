require("dotenv").config();
const { sync } = require("./index");

(async () => {
  console.log("🚀 Running FULL initial sync...");
  await sync({ full: true });
  console.log("✅ Initial sync finished");
})();
