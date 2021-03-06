const url = require('url');
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  discoveryListener = new BrowserWindow({ show: false });
  discoveryListener.loadURL(url.format({
    pathname: path.join(__dirname, 'discovery/discovery.html'),
    protocol: 'file:',
    slashes: true
  }));

  ipcMain.on('info', (_, message) => {
    console.log(message);
  });

  ipcMain.on('discovery', (_, message) => {
    // This is fun for a console, but better will be to use this to
    // store and configure host/port for future app calls.
    win.webContents.send('discovery', message);
  });

  ipcMain.on('networking', (_, message) => {
    console.log(message);
  });
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
