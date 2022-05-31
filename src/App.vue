<template>
  <layout-sidebar />
  <router-view/>
</template>

<script setup>
import vhCheck from 'vh-check'
import { onMounted } from 'vue'
import LayoutSidebar from '@/components/layout-sidebar/layout-sidebar'

onMounted(() => {
  document.documentElement.style.setProperty('--vh-offset', `${vhCheck().offset}px`)
})
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: row;
}
</style>
