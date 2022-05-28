const axios = require('./axios')

const playUrlPayload = {
  qn: 112,
  fnval: 0,
  fnver: 0,
  fourk: 1
}

function getVideoView ({ bvid }) {
  return axios
    .get('http://api.bilibili.com/x/web-interface/view', {
      headers: {},
      params: {
        bvid
      }
    })
    .then((response) => {
      console.log(response)
      if (response.status < 400) return response.data
    })
    .then((data) => {
      if (data.code !== 0) throw Error(`获取视频链接失败, code: ${data.code}`)
      const rsp = {
        code: 0,
        status: 'ok',
        data: {
          bvid: data.data.bvid,
          videos: data.data.videos,
          tid: data.data.tid,
          tname: data.data.tname,
          pic: data.data.pic,
          desc: data.data.desc,
          owner: data.data.owner,
          dimension: data.data.dimension,
          pages: data.data.pages
        }
      }
      return rsp
    })
    .catch((err) => {
      console.log(err)
    })
}

function getPageList ({ bvid }) {
  return axios.get('http://api.bilibili.com/x/player/pagelist', {
    headers: {},
    params: {
      bvid
    }
  })
}

function getPlayUrl ({ bvid, cid }) {
  return axios.get('http://api.bilibili.com/x/player/playurl', {
    headers: {
      // 'Cookie': 'SESSDATA=xxx'
    },
    params: {
      bvid,
      cid,
      ...playUrlPayload
    }
  })
    .then((response) => {
      console.log(response)
      if (response.status < 400) return response.data
    })
    .then((data) => {
      if (data.code !== 0) throw Error(`获取视频链接失败, code: ${data.code}`)
      console.log(data)
      const rsp = {
        code: 0,
        status: 'ok',
        data: {
          bvid,
          cid,
          quality: data.data.quality,
          format: data.data.format,
          timelength: data.data.timelength,
          accept_format: data.data.accept_format,
          durl: data.data.durl
        }
      }
      return rsp
    })
    .catch((err) => {
      console.log(err)
    })
}

function getVideoFile ({ url }) {
  return axios.get(url, {
    headers: {
      Range: 'bytes=0-1023'
    }
  })
    .then((response) => {
      console.log(response)
      if (response.status < 400) return response.data
    })
    .then(data => {
      console.log(data)
    })
}

module.exports = {
  getVideoView,
  getPlayUrl,
  getPageList,
  getVideoFile
}
