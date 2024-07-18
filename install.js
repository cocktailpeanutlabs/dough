const { virtual_env, project_dir } = require("./constants");
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
            "git clone --depth 1 -b main https://github.com/piyushK52/comfy_runner",
            "git clone https://github.com/comfyanonymous/ComfyUI.git",
          ],
        },
      },
      {
        method: "shell.run",
        params: {
          path: project_dir,
          venv: virtual_env,
          message: [
            "pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118",
            `pip install -r requirements.txt`,
            `pip install -r comfy_runner/requirements.txt`,
            `pip install -r ComfyUI/requirements.txt`,
          ]
        },
      },
      {
        method: "fs.copy",
        params: {
          src: `${project_dir}/.env.sample`,
          dest: `${project_dir}/.env`,
        },
      },
      {
        method: "fs.link",
        params: {
          venv: `${project_dir}/${virtual_env}`
        }
      },
      {
        method: "fs.link",
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
    ],
  };
  return config;
};
