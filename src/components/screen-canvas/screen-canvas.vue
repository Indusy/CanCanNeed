<template>
  <div class="screen-canvas">
    <canvas class="canvas" ref="rootRef" @mousemove.prevent="moveBrush" :width="props.width" :height="props.height"></canvas>
  </div>
  <input type="range" min="1" max="20" v-model="lineWidth" >
</template>

<script setup>
import { onMounted, reactive, ref, defineProps } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 300
  },
  height: {
    type: Number,
    default: 150
  }
})

const rootRef = ref(null)
const ctx = ref(null)
const ctxClientRect = reactive({
  height: undefined,
  width: undefined
})

const prevCoordinate = reactive({
  x: undefined,
  y: undefined
})
const lineWidth = ref(5)

onMounted(() => {
  const { width, height } = getComputedStyle(rootRef.value)
  Object.assign(ctxClientRect, { width: parseInt(width), height: parseInt(height) })
  ctx.value = rootRef.value.getContext('2d')
})

function moveBrush (evt) {
  if (evt.which) {
    if (evt.offsetX <= ctxClientRect.width && evt.offsetY <= ctxClientRect.height) {
      if (!(prevCoordinate.x && prevCoordinate.y)) {
        prevCoordinate.x = evt.offsetX
        prevCoordinate.y = evt.offsetY
      }
      drawLine(prevCoordinate.x, prevCoordinate.y, evt.offsetX, evt.offsetY)
      prevCoordinate.x = evt.offsetX
      prevCoordinate.y = evt.offsetY
    }
  } else {
    prevCoordinate.x = undefined
    prevCoordinate.y = undefined
  }
}

function drawLine (x1, y1, x2, y2) {
  const ctxVal = ctx.value
  ctxVal.lineWidth = lineWidth.value
  ctxVal.lineCap = 'round'
  ctxVal.lineJoin = 'round'
  ctxVal.strokeStyle = '#ff0000'
  ctxVal.moveTo(x1, y1)
  ctxVal.lineTo(x2, y2)
  ctxVal.stroke()
  ctxVal.closePath()
}

</script>

<style lang="scss" scoped>
.canvas {
  border: 1px solid black;
}
</style>
