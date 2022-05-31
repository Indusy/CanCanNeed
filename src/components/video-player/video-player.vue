<template>
  <div class="video-player">
    <video ref="rootRef" controls :width="width" :height="height"></video>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, onUnmounted } from 'vue'
import flvjs from 'flv.js'

const rootRef = ref(null)
const player = ref(null)

const props = defineProps({
  options: {
    type: Object,
    default () {
      return {}
    }
  },
  width: {
    type: Number,
    default: 800
  },
  height: {
    type: Number,
    default: 450
  }
})

onMounted(() => {
  if (flvjs.isSupported()) {
    player.value = flvjs.createPlayer(props.options)
    const playerVal = player.value
    playerVal.attachMediaElement(rootRef.value)
    playerVal.load()
    // playerVal.play()
  }
})

onUnmounted(() => {

})
</script>

<style lang="scss">
  .video-player {
    width: fit-content;
    height: fit-content;
    padding: 20px;
    background-color: rgba(104, 212, 158, 0.26);
  }
</style>
