const path = require("path");
const { virtual_env, project_dir } = require("./constants");

module.exports = async (kernel, info) => {
  const appInstalled = info.exists(project_dir, virtual_env) && info.running("install.js")

  let menu = [];
  const start_btn = {
    default: true,
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
    default: true,
    icon: "fa-solid fa-plug",
    text: "Install",
    href: "install.js",
  }
  const update_btn = {
    icon: "fa-solid fa-bolt",
    text: "Update",
    href: "update.js",
  }
  const reset_btn = {
    icon: "fa-solid fa-delete-left",
    text: "Reset",
    href: "reset.js",
  }

  if (appInstalled) {
    menu = [
      start_btn,
    ];

    // app running
    if (info.running("start.js")) {
      menu = [
        start_btn,
        stop_btn,
      ];
    }
    // app stopped
    else {
      menu = [start_btn, update_btn, reset_btn]
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
