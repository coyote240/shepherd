const { ipcRenderer } = require('electron');

let versions = {
  'node-version': process.versions.node,
  'chromium-version': process.versions.chrome,
  'electron-version': process.versions.electron
};

Object.entries(versions).map(entry => {
  let [id, version] = entry;
  let el = document.getElementById(id);
  el.appendChild(
    document.createTextNode(version));
});

let infoOutlet = document.querySelector('.init');

ipcRenderer.on('discovery', (event, msg) => {
  let message = document.createElement('div');
  message.appendChild(
    document.createTextNode(msg));
  infoOutlet.appendChild(message);
});
