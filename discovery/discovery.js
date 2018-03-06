const os = require('os');
const http = require('http');
const dgram = require('dgram');
const client = dgram.createSocket({type: 'udp4', reuseAddr: true});
//const Netmask = require('netmask').Netmask;

const { ipcRenderer } = require('electron');

/*
let interfaces = os.networkInterfaces();
Object.entries(interfaces).forEach(interface => {
  let [iface, config] = interface;

  config.forEach(addr => {
    if (addr.internal) {
      return;
    }

    if (addr.family === 'IPv4') {
      let block = new Netmask(`${addr.address}/${address.bitmask}`);
      ipcRenderer.send('networking', block);
    }
  });
});
*/

function handleConfigurationData (msg, rinfo) {
  let message = JSON.parse(
    msg.toString('ascii'));

  let request = http.request({
    host: message.web_addr,
    port: message.web_port,
    path: '/',
    method: 'HEAD'
  }, (res) => {
    if (res.statusCode === 200) {
      localStorage.setItem('web_addr', message.web_addr);
      localStorage.setItem('web_port', message.web_port);

      client.removeListener('message', handleConfigurationData);
      ipcRenderer.send('discovery', 'host info configured');
    }
  });
  request.end();
}

client.on('message', handleConfigurationData);

client.on('listening', () => {
  const address = client.address();
  ipcRenderer.send('discovery',
    `listening for hive mind on ${address.address}:${address.port}`);

  client.setBroadcast(true);
});

client.bind(44044, '192.168.1.255');

