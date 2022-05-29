<template>
  <div class="home">
    <video-player :options="videoOptions" v-if="false" />
    <screen-canvas :width="500" :height="500" v-if="false" />
    <file-uploader />
  </div>
</template>

<script>
import ScreenCanvas from '@/components/screen-canvas/screen-canvas'
import VideoPlayer from '@/components/video-player/video-player'
import FileUploader from '@/components/file-uploader/file-uploader'

export default {
  name: 'HomeView',
  data () {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
            type: 'video/mp4'
          }
        ]
      }
    }
  },
  components: {
    ScreenCanvas,
    VideoPlayer,
    FileUploader
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
