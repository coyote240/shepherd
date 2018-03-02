const dgram = require('dgram');
const server = dgram.createSocket({type: 'udp4', reuseAddr: true});
const { ipcRenderer } = require('electron');


server.on('message', (msg, rinfo) => {
  ipcRenderer.send('discovery', msg.toString('ascii'));
});

server.on('listening', () => {
  const address = server.address();
  ipcRenderer.send('info',
    `server listening ${address.address}:${address.port}`);

  server.setBroadcast(true);
});

server.bind(44044, '192.168.1.255');

