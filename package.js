const packager = require('electron-packager')

async function bundleElectronApp(options) {
  const appPaths = await packager(options)
  console.log(`Electron app bundles created:\n${appPaths.join('\n')}`)
}

bundleElectronApp({
  appBundleId: '',
  appCopyright: 'MIT',
  appVersion: '1.0.0',
  arch: 'x64',
  dir: 'bundle',
  executableName: 'todo.exe',
  extraResource: ['assets', 'index.html', 'style.css'],
  icon: 'assets/logos/64x64.png',
  name: 'To Do',
  out: 'out',
  overwrite: 'true',
  platform: ['linux', 'win32', 'darwin'],
  prune: true,
})
