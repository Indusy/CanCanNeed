<template>
  <div class="layout-header">
    <div class="menu-group">
      <div class="menu-item">
        <button @click.stop="activateSidebar" class="menu-burger">
          <div class="burger-layer"></div>
          <div class="burger-layer"></div>
          <div class="burger-layer"></div>
        </button>
      </div>
      <div class="menu-item"></div>
    </div>
    <div class="menu-group">
      <div class="menu-item">
        <button class="text-btn" @click="uploadVideo">上传视频</button>
        <button class="text-btn">分享房间</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'

const store = useStore()

function activateSidebar () {
  store.dispatch('setSidebarActive', true)
}

function uploadVideo () {
  return true
}
</script>

<style lang="scss" scoped>
.layout-header {
  width: 100%;
  height: 0.5rem;
  background-color: rgba(189, 75, 44, 0.8);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.menu-burger {
  width: 0.4rem;
  height: 0.4rem;
  background-color: transparent;
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .burger-layer {
    background-color: #fff;
    width: 80%;
    height: 2.8px;
  }
}
</style>
