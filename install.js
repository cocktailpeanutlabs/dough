const { execSync } = require("child_process");
const path = require('path');

const { virtual_env, project_dir } = require("./constants");

function hasSudo() {
  try {
    execSync("sudo -n true", { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

function getInstallCommand(kernel) {
  const { platform, gpu } = kernel;

  function combineLists(list1, list2) {
    return [...list1, ...list2];
  }

  project_requirements = [
    `pip install -r ${path.resolve(__dirname, project_dir, 'requirements.txt')}`,
    `pip install -r ${path.resolve(__dirname, project_dir, 'comfy_runner', 'requirements.txt')}`,
    `pip install -r ${path.resolve(__dirname, project_dir, 'ComfyUI', 'requirements.txt')}`,
  ];

  // only handling linux and win32 for now
  if (platform == "linux") {
    cmd_list = []; // pinokio by default uses py3.10
    return combineLists(cmd_list, project_requirements);
  }

  if (platform == "win32") {
    cmd_list = [
      "python.exe -m pip install --upgrade pip",
      "pip install websocket",
      "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118",
    ];

    return combineLists(cmd_list, project_requirements);
  }

  return [
    "conda install libsqlite --force-reinstall -y", // mac issue with sqlite3 package
    `pip install -r ${path.resolve(__dirname, project_dir, 'requirements.txt')}`,
  ];
}

module.exports = async (kernel) => {
  const config = {
    run: [
      {
        method: "shell.run",
        params: {
          message: [
            `git clone --depth 1 -b main https://github.com/banodoco/Dough.git ${project_dir}`,
          ],
        },
      },
      {
        method: "shell.run",
        params: {
          path: project_dir,
          message: [
            "git clone --depth 1 -b main https://github.com/piyushK52/comfy_runner.git",
            "git clone https://github.com/comfyanonymous/ComfyUI.git",
          ],
        },
      },
      {
        method: "shell.run",
        params: {
          path: project_dir,
          venv: virtual_env,
          message: getInstallCommand(kernel),
        },
      },
      {
        method: "fs.copy",
        params: {
          src: path.resolve(__dirname, project_dir , ".env.sample"),
          dest: path.resolve(__dirname, project_dir , ".env"),
        },
      },
      {
        method: "fs.share",
        params: {
          drive: {
            "checkpoints": "Dough/ComfyUI/models/checkpoints",
            "clip": "Dough/ComfyUI/models/clip",
            "clip_vision": "Dough/ComfyUI/models/clip_vision",
            "configs": "Dough/ComfyUI/models/configs",
            "controlnet": "Dough/ComfyUI/models/controlnet",
            "embeddings": "Dough/ComfyUI/models/embeddings",
            "loras": "Dough/ComfyUI/models/loras",
            "upscale_models": "Dough/ComfyUI/models/upscale_models",
            "vae": "Dough/ComfyUI/models/vae"
          },
          peers: [
            "https://github.com/cocktailpeanutlabs/automatic1111.git",
            "https://github.com/cocktailpeanutlabs/fooocus.git",
            "https://github.com/cocktailpeanutlabs/forge.git"
          ]
        }
      },
      {
        method: "input",
        params: {
          title: "Install complete",
          description: "Go back to the dashboard to launch the application.",
        },
      },
    ],
  };

  return config;
};
