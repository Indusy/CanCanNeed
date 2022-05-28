const http = require('http')
const Koa = require('koa')
const router = require('./router')
const app = new Koa()
const PORT = 5000
const server = http.createServer(app.callback())
const cors = require('@koa/cors')
const koaBody = require('koa-body')
const { useSocket } = require('./socket')
app.use(cors())
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 5000 * 1024 * 1024
  }
}))
app.use(router.routes())

useSocket(server)

server.listen(PORT, () => {
  console.log(`backend listening on http://localhost:${PORT}`)
})

module.exports = {
  app,
  server
}
