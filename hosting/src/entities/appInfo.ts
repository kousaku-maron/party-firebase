export type AppInfo = {
  name: string
  appleStoreURL: string
  googleStoreURL: string
}

export const initAppInfo = () => {
  const appInfo: AppInfo = {
    name: 'Nomoca', // 仮
    appleStoreURL: 'xxxx',
    googleStoreURL: 'xxxx'
  }

  return appInfo
}
