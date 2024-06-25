const path = require("path");
const { virtual_env, project_dir } = require("./constants");

module.exports = async (kernel) => {
  const appInstalled =
    (await kernel.exists(__dirname, project_dir, virtual_env)) &&
    !(await kernel.script.running(__dirname, "install.js"));

  let menu = [];
  const start_btn = {
	icon: "fa-solid fa-desktop",
	text: "Start",
	href: "start.js",
  }
  const stop_btn = {
	icon: "fa-solid fa-power-off",
	text: "Stop",
	href: "stop.js",
  }
  const install_btn = {
	icon: "fa-solid fa-plug",
	text: "Install",
	href: "install.js",
  }
  const update_btn = {
	icon: "fa-solid fa-bolt",
	text: "Update",
	href: "update.js",
  }

  if (appInstalled) {
    menu = [
      start_btn,
    ];

    // app running
    if (kernel.script.running(__dirname, "start.js")) {
      menu = [
        start_btn,
        stop_btn,
      ];
    }
	// app stopped
	else {
		menu = [start_btn]
	}
  }
  // fresh install
  else {
    menu = [
      install_btn,
    ];
  }
  return menu;
};
