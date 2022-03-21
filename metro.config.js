const { getDefaultConfig } = require("metro-config");
const exclusionList = require('metro-config/src/defaults/exclusionList');
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
module.exports = {
  resolver: {
  blacklistRE: exclusionList([/#current-cloud-backend\/.*/]),
  sourceExts: [
    ...defaultResolver.sourceExts,
    "cjs",
  ],
},
transformer: {
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  }),
},
}