const path = require("path");

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

  optimization: {
    minimize: true,
    // realContentHash: true,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 7,
          reuseExistingChunk: true,
        },
        sheinComponents: {
          name: "chunk-shein-components",
          test: /[\\/]@shein-components[\\/]/,
          chunks: "initial",
          priority: 8,
          reuseExistingChunk: true,
        },
        shineout: {
          name: "chunk-shineout",
          test: /[\\/](shineout)[\\/]/,
          chunks: "initial",
          priority: 9,
          reuseExistingChunk: true,
        },
        react: {
          name: "chunk-react",
          test: /[\\/](react|react-dom)[\\/]/,
          chunks: "initial",
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: true,
    moduleIds: "deterministic",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|ico|otf)$/i,
        type: "asset",
      },

      getNodeModulesLessLoaderRspack(),
      getNodeModulesCssLoaderRspack(),
      getSrcCssLoaderRspack(),
      getSrcLessLoaderRspack(),
    ],
  },
  builtins: {
    presetEnv: {
      targets: ["chrome 100"],
    },

    progress: {
      prefix: "progressPrefix",
    },
    react: {
      runtime: "automatic",
    },
  },
  mode: "production",
  devtool: "hidden-source-map",
};
