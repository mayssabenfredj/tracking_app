// Explicit Babel config for Expo + react-native-reanimated
// Keep 'react-native-reanimated/plugin' as the last plugin in the list.
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Reanimated plugin must be last
      'react-native-reanimated/plugin',
    ],
  };
};
