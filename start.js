const { virtual_env, project_dir } = require("./constants");

module.exports = () => {
  const config = {
    daemon: true,
    run: [
      {
        method: "shell.run",
        params: {
          path: project_dir,
          venv: virtual_env,
          message:
            "streamlit run app.py --runner.fastReruns false --server.port 5500",
          on: [{ event: "/http://[0-9.:]+/", done: true }],
        },
      },
    ],
  };

  return config;
};
