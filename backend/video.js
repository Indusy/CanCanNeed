const mkdirp = require('mkdirp')
const path = require('path')
const moment = require('moment')
const { existsSync } = require('fs')
const { copyFile, unlink } = require('fs/promises')
moment.locale('zh-cn')

async function cacheVideoFile (videoFile) {
  const newPath = path.resolve(__dirname, 'storage', moment().format('L'))
  if (!existsSync(newPath)) {
    await mkdirp(newPath)
  }
  return Promise.all(
    Object.values(videoFile).map((file) => {
      return new Promise((resolve, reject) => {
        const { filepath, newFilename, mimetype } = file
        const mimesplit = mimetype.split('/')
        const type = mimesplit[mimesplit.length - 1]
        copyFile(filepath, path.resolve(newPath, newFilename + '.' + type)).then(() => {
          unlink(filepath)
        }).then(() => {
          resolve('保存文件成功')
        }).catch(e => {
          reject(Error('保存文件失败!\n' + e))
        })
      })
    })
  )
}

function createVideoStream (id) {
  
}

module.exports = {
  cacheVideoFile,
  createVideoStream
}
