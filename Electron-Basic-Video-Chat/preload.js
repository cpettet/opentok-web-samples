const {
  contextBridge,
  desktopCapturer,
  // ipcMain,
  ipcRenderer
} = require('electron');

console.log('starting preload....');
// Expose the desktopCapturer so that the SDK can access to it
// via window.electron.desktopCapturer
contextBridge.exposeInMainWorld(
  'electron', {
    desktopCapturer
  }
);

// this causes trouble with preload
// ipcMain.handle(
//   'DESKTOP_CAPTURER_GET_SOURCES',
//   (event, opts) => desktopCapturer.getSources(opts)
// );

desktopCapturer.getSources = opts => ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts);
