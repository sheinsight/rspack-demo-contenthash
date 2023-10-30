const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

function getSrcLessLoaderRspack() {
  return {
    test: /\.less$/i,
    exclude: /node_modules/,
    oneOf: [
      {
        resourceQuery: /modules/,
        type: "css/module",
        use: [getLessLoader()],
      },
      {
        type: "css",
        use: [getLessLoader()],
      },
    ],
  };
}

function getSrcCssLoaderRspack() {
  return {
    test: /\.css$/i,
    exclude: /node_modules/,
    oneOf: [
      {
        resourceQuery: /modules/,
        type: "css/module",
      },
      {
        type: "css",
      },
    ],
  };
}

function getNodeModulesCssLoaderRspack() {
  return {
    test: /\.css$/i,
    type: "css",
    include: /node_modules/,
  };
}

function getNodeModulesLessLoaderRspack() {
  return {
    test: /\.less$/i,
    type: "css",
    include: /node_modules/,
    use: [getLessLoader({})],
  };
}

function getLessLoader() {
  return {
    loader: "less-loader",
  };
}

module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "statics/[name].[contenthash:8].js",
    chunkFilename: "statics/[name].[contenthash:8].chunk.js",
    publicPath: "/",
    clean: true,
  },
  cache: false,
  target: ["web", "es5"],
 
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|ico|otf)$/i,
        type: "asset",
      },
      {
        test: /\.(js|mjs|ts|cjs)x?$/,
        type: "javascript/auto",
        exclude: [/node_modules/],
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: "typescript",
                  jsx: true,
                  tsx: true,
                },
                target: "es5",
                transform: {
                  react: {
                    runtime: "automatic",
                    refresh: true,
                    development: true,
                  },
                },
              },
            },
          },
        ],
      },
      getNodeModulesLessLoaderRspack(),
      getNodeModulesCssLoaderRspack(),
      getSrcCssLoaderRspack(),
      getSrcLessLoaderRspack(),
    ],
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  builtins: { 
    progress: {
      prefix: "progressPrefix",
    }, 
  },
  mode: "production",
  devtool: "hidden-source-map",
  experiments:{
    rspackFuture: {
      disableTransformByDefault: true,
      newResolver: true,
    },
  }
};
