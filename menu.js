const path = require("path");
const { virtual_env, project_dir } = require("./constants");
module.exports = async (kernel, info) => {
  let menu = [];
  const start_btn = {
    default: true,
    icon: "fa-solid fa-desktop",
    text: "Start",
    href: "start.js",
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

  const appInstalled = info.exists(project_dir, virtual_env)
  const appRunning = info.running("start.js")
  if (appInstalled) {
    if (appRunning) {
      const local = info.local("start.js")
      if (local && local.url) {
        const app_btn = {
          default: true,
          icon: "fa-solid fa-rocket",
          text: "Open Web UI",
          href: local.url,
          popout: true
        }
        menu = [ app_btn, start_btn ];
      } else {
        menu = [ start_btn ];
      }
    } else {
      menu = [ start_btn, update_btn, reset_btn ];
    }
  } else {
    menu = [install_btn]
  }
  return menu;
};
