const packager = require('electron-packager')

async function bundleElectronApp() {
  const appPaths = await packager({
    dir: __dirname,
    appBundleId: '',
    appCopyright: 'Apache License',
    appVersion: '1.0',
    arch: 'x64',
    executableName: 'todo',
    icon: './public/assets/logos/128x128.ico',
    name: 'todo',
    out: 'build',
    overwrite: true,
    platform: ['win32', 'darwin', 'linux'],
    prune: true,

    ignore: [
      '.vscode',
      'build',
      'node_modules',
      'public',
      'sass',
      'src',
      '.gitattributes',
      '.gitignore',
      'package-lock.json',
      'tsconfig.json',
      'README.md',
      'LICENSE',
    ],
  })
  console.log(`Electron app bundles created:\n${appPaths.join('\n')}`)
}

bundleElectronApp()
