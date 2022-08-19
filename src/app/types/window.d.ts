declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}

export interface ElectronAPI {
  test(): string
}
