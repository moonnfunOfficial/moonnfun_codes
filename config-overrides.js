const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");  

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {  
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
  });
  config.resolve.fallback = fallback;
  // config.devtool = config.mode === "production" ? false : "source-map";

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false, // disable the behavior
    },
  });

  config.module.rules.push({
    enforce: "pre",
    test: /\.(js|ts|jsx|tsx|d.ts)$/,
    loader: "source-map-loader",
    exclude: /node_modules/,
  });
 
  config.ignoreWarnings = [
    {
      module: /node_modules/,
      message: /Failed to parse source map/,
    },
  ]; 
  // config.optimization = {
  //   ...config.optimization,
  //   minimize: true, 
  //   minimizer: [
  //     new TerserPlugin({
  //       terserOptions: {
  //         compress: {
  //           drop_console: true,  
  //         },
  //       },
  //     }),
  //   ],
  // }; 
  config.resolve.fallback = fallback;
    config.devtool = false;  
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])

  return config;
};
 