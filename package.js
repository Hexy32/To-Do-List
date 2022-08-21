const packager = require('electron-packager')

async function bundleElectronApp(options) {
  const appPaths = await packager(options)
  console.log(`Electron app bundles created:\n${appPaths.join('\n')}`)
}

bundleElectronApp({
  dir: __dirname,
  appBundleId: '',
  appCopyright: 'MIT',
  appVersion: '1.0.0',
  arch: 'x64',
  executableName: 'todo',
  icon: 'assets/logos/128x128.ico',
  name: 'To Do',
  out: 'out',
  overwrite: 'true',
  platform: ['win32'],
  prune: true,
  ignore: [
    '.vscode',
    'build/app',
    'node_modules',
    'src',
    'out',
    '.gitattributes',
    '.gitignore',
    'webpack.config.js',
    'base-tsconfig.json',
    'package-lock.json',
    'tsconfig.json',
    'README.md',
  ],
})
