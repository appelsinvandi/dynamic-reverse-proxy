const fs = require('fs')
const path = require('path')

const encodedProxyMap = process.env.PROXY_MAP
const proxyMap = JSON.parse(Buffer.from(encodedProxyMap, 'base64').toString('utf8'))

const nginxConfContent = proxyMap.map(({source, destination}) => `
server {
  server_name ${source};
  location / {
    proxy_pass ${destination};
  }
}`).join('').trim()

fs.writeFileSync(path.resolve(__dirname, 'nginx.conf'), nginxConfContent)
