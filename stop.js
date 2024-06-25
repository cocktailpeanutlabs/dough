module.exports = () => {
  const config = {
    run: [
      {
        method: "script.stop",
        params: {
          uri: __dirname + "/start.js",
        },
      },
    ],
  };

  return config;
};
