const SocketIO = require('socket.io')
const { getVideoView } = require('./service')

function useSocket (server) {
  const io = SocketIO(server, {
    cors: {
      origin: 'http://localhost:3000'
    }
  })

  io.on('connection', (socket) => {
    socket.on('message', (ev) => {
      console.log(ev)
    })

    socket.on('testplayurl', (ev) => {
      getVideoView({ bvid: 'BV1y7411Q7Eq' })
        .then((response) => {
          console.log(response)
          if (response.status < 400) return response.data
        })
        .then((data) => {
          if (data.code !== 0) { throw Error(`获取视频链接失败, code: ${data.code}`) }
        })
        .catch((err) => {
          console.log(err)
        })
    })
  })
  return io
}

module.exports = {
  useSocket
}
