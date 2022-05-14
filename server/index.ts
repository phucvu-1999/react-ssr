require("ignore-styles");
require("@babel/register")({
  ignore: [/node_modules/],
  preset: ["@babel/preset-env", "@babel/preset-react"],
});

require("./server");
