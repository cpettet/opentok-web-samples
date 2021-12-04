const {
  contextBridge,
  desktopCapturer,
  // ipcRenderer,
} = require('electron');

// Expose the desktopCapturer so that the SDK can access to it
// via window.electron.desktopCapturer
contextBridge.exposeInMainWorld(
  'electron', {
    desktopCapturer
  }
);

// const desktopCapturer = {
//   getSources: (opts) =>
//     ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts)
// };
