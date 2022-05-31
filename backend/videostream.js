const fs = require('fs')
const { stat } = require('fs/promises')
const path = require('path')
const mime = require('mime-types')

const streamingVideos = [

]

async function pipeStream (ctx, filepath) {
  const { range } = ctx.req.headers
  if (range) {
    const stats = await stat(filepath)
    const r = range.match(/=(\d+)-(\d+)?/)
    const start = parseInt(r[1], 10)
    const end = r[2] ? parseInt(r[2], 10) : start + 1024 * 1024
    const headerOpt = {
      'Content-type': mime.lookup(filepath),
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Content-Length': end - start + 1,
      'Accept-Ranges': 'bytes'
    }
    ctx.res.writeHead(206, headerOpt)
    ctx.body = fs.createReadStream(filepath, { start, end })
  } else {
    ctx.body = fs.createReadStream(filepath, { start: 0, end: 1024 * 1024 })
  }
}

module.exports = {
  pipeStream
}
