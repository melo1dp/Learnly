// Metro needs to be told about the monorepo: npm hoists most packages up to the
// repo-root node_modules, but Metro only looks in the project folder by default.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch the whole workspace so changes outside mobile/ still trigger a rebuild.
config.watchFolders = [workspaceRoot];

// Resolve from the project first, then the hoisted root.
//
// Hierarchical lookup stays ON (the default): npm doesn't fully flatten — it
// nests conflicting versions, e.g. react-native/node_modules/scheduler — and
// disabling it makes those nested packages unresolvable.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;
