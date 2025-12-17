const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Fix tslib ESM/CJS compatibility issue with framer-motion
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Redirect tslib ESM module to CommonJS version
  if (moduleName === 'tslib' && platform === 'web') {
    return {
      filePath: path.resolve(__dirname, 'node_modules/tslib/tslib.js'),
      type: 'sourceFile',
    };
  }
  
  // Fall back to default resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

