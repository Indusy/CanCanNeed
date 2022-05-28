const { getVideoView, getPlayUrl, getVideoFile } = require('./service')
const { cacheVideoFile } = require('./video')

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

module.exports = _r
