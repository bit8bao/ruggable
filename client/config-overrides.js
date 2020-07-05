const path = require('path');
const { override, addWebpackAlias, addBabelPlugins } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader-for-customize-cra');

module.exports = override(
  rewireReactHotLoader(),
  ...addBabelPlugins(
    'babel-plugin-ts-optchain' // fix for ie11
  ),
  addWebpackAlias({
    environment: path.join(__dirname, 'src', 'Environments', process.env.CLIENT_ENV || 'production'),
  })
);
