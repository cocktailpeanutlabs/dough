const fs = require("fs");
const path = require("path");

function getCurrentVersion() {
  const versionFilePath = path.join(__dirname, "scripts", "app_version.txt");
  try {
    const versionData = fs.readFileSync(versionFilePath, "utf-8");
    return versionData.trim();
  } catch (err) {
    console.error("Error reading version file:", err);
    return "0.9.8";
  }
}

const version = getCurrentVersion();

module.exports = {
  version: version,
  title: `Dough ${version}`,
  description: "Dough is a open source tool for steering AI animations with precision",
  icon: "./sample_assets/app_icon.svg.svg",
  menu: require(__dirname + "/scripts/pinokio/menu.js"),
};
