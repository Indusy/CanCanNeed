const axios = require('axios').default

axios.interceptors.request.use(config => {
  config.headers = {
    referer: 'https://www.bilibili.com',
    'User-Agent': 'Mozilla/5.0 BiliDroid/*.*.* (bbcallen@gmail.com)'
  }

  return config
})

module.exports = axios
