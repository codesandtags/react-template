const path = require('path');

const ROOT_DIRECTORY = path.join(__dirname, '..');
const BUILD_DIRECTORY = path.join(ROOT_DIRECTORY, 'dist');
const APP_DIRECTORY = path.join(ROOT_DIRECTORY, 'src', 'app');
const APP_ENTRY_FILE = path.resolve(ROOT_DIRECTORY, 'src', 'app', 'index.tsx');
const SERVER_DIRECTORY = path.join(ROOT_DIRECTORY, 'src', 'server');
const SERVER_ENTRY_FILE = path.resolve(ROOT_DIRECTORY, 'src', 'server', 'server.tsx');
const ENV_DIRECTORY = path.join(ROOT_DIRECTORY, 'environments');

module.exports = {
  ROOT_DIRECTORY,
  BUILD_DIRECTORY,
  APP_DIRECTORY,
  APP_ENTRY_FILE,
  SERVER_DIRECTORY,
  SERVER_ENTRY_FILE,
  ENV_DIRECTORY
};
