const ts_config = require('./tsconfig.json');
const ts_config_paths = require('tsconfig-paths');

const base_url = './dist';
ts_config_paths.register({
  baseUrl: base_url,
  paths: ts_config.compilerOptions.paths,
});
