const http = require('http')
const Koa = require('koa')
const router = require('./router')
const app = new Koa()
const PORT = 5000
const server = http.createServer(app.callback())
const { useSocket } = require('./socket')

useSocket(server)
app.use(router.routes())

server.listen(PORT, () => {
  console.log(`backend listening on http://localhost:${PORT}`)
})

module.exports = {
  app,
  server
}
