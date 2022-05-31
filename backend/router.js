const { getVideoView, getPlayUrl, getVideoFile } = require('./service')
const { cacheVideoFile } = require('./video')
const { pipeStream } = require('./videostream')
const path = require('path')
const { createVideoFlvStreamCommand } = require('./ffmpeg')
const { nms } = require('./nms')

const _r = require('koa-router')()

_r.get('/', (ctx, next) => {
  ctx.body = '114514'
})

_r.get('/api/getVideoView', async (ctx, next) => {
  const { bvid } = ctx.query
  ctx.body = await getVideoView({
    bvid
  })
})

_r.get('/api/getPlayUrl', async (ctx, next) => {
  const { bvid, cid } = ctx.query
  ctx.body = await getPlayUrl({ bvid, cid })
})

_r.get('/api/getVideoStream', async (ctx, next) => {
  const { url } = ctx.query
  ctx.body = await getVideoFile({ url }).then(data => {
    console.log(data)
  })
})

_r.post('/api/testUpload', async (ctx, next) => {
  ctx.body = await cacheVideoFile(ctx.request.files)
})

_r.get('/api/streamingVideo', async (ctx, next) => {
  await pipeStream(ctx, path.resolve(__dirname, 'testcase/fart.mp4'))
})

_r.get('/api/startStream', async (ctx, next) => {
  nms.run()
  createVideoFlvStreamCommand(path.resolve(__dirname, 'testcase/fart.mp4'), 114514).run()
})
module.exports = _r
