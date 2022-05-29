<template>
  <div class="video-player">
    <video ref="rootRef" class="video-js"></video>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, onUnmounted } from 'vue'
import videojs from 'video.js'
// import flvjs from 'flv.js'
import 'video.js/dist/video-js.css'

const rootRef = ref(null)
const player = ref(null)

const props = defineProps({
  options: {
    type: Object,
    default () {
      return {}
    }
  }
})

onMounted(() => {
  player.value = videojs(rootRef.value, props.options, () => {
    player.value.log('onPlayerReady', '666')
  })
})

onUnmounted(() => {
  player.value.dispose()
})
</script>
