const net = require('net')


const client = new net.Socket()

client.connect(8080, 'localhost', () => {})