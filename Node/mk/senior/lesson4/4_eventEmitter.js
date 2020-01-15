const EventEmitter = require('events')

class MyEventEmitter extends EventEmitter {

}

const mee = new MyEventEmitter()

mee.on('test', () => {
  console.log('toggle test event')
})

setInterval(() => {
  mee.emit('test')
}, 2000)

setInterval(() => {
  mee.removeAllListeners()
}, 3000)