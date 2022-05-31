const ffmpeg = require('fluent-ffmpeg')

function createVideoFlvStreamCommand (videoPath, id) {
  // ffmpeg -re -i nt.mp4 -c copy -f flv rtmp://localhost/live/fart
  const outputPathPrefix = 'rtmp://localhost/live/'
  const commmand = ffmpeg(videoPath).inputOptions('-re').inputOptions('-ac 2').format('flv').output(outputPathPrefix.concat(id))
  return commmand
}

module.exports = {
  createVideoFlvStreamCommand
}
