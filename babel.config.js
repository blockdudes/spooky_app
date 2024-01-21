module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel","react-native-reanimated/plugin",["@babel/plugin-transform-private-methods", { "loose": true }], ['module:react-native-dotenv']]

  };
};
