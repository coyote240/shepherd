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

ipcRenderer.on('networking', (event, msg) => {
  console.log(msg);
});
