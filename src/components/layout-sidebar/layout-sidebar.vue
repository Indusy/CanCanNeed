<template>
  <transition name="sidebar">
    <div ref="rootRef" v-if="activated" class="layout-sidebar">
      <div class="menu-group">
        <div class="menu-item">
        </div>
        <div class="menu-item">
        </div>
      </div>
      <div class="menu-group">
        <div class="menu-item">

        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const rootRef = ref(null)
const listener = ref(null)
const activated = computed(() => {
  return store.state.sideBarActive
})

onMounted(async () => {
  listener.value = window.addEventListener('click', (evt) => {
    if (!evt.composedPath().includes(rootRef.value) && activated.value) {
      store.dispatch('setSidebarActive', false)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('click', listener.value)
})
</script>

<style lang="scss" scoped>
.layout-sidebar {
  width: 3.2rem;
  height: $fixed-100p-vh;
  background-color: rgba(255, 255, 255, 0.99);
  box-shadow: 1px 0 100px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
}
</style>
