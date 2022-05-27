const { getVideoView, getPlayUrl } = require('./service')

const router = require('koa-router')()

router.get('/', (ctx, next) => {
  ctx.body = '114514'
})

router.get('/api/getVideoView', async (ctx, next) => {
  const { bvid } = ctx.query
  ctx.body = await getVideoView({
    bvid
  })
})

router.get('/api/getPlayUrl', async (ctx, next) => {
  const { bvid, cid } = ctx.query
  ctx.body = await getPlayUrl({ bvid, cid })
})

module.exports = router
