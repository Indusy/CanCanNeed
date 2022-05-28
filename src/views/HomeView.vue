<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <form @submit.prevent="uploadFile">
      <input type="file" ref="fileInputRef" accept="video/*">
      <input type="submit" value="">
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  data () {
    return {
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    uploadFile () {
      const file = this.$refs.fileInputRef.files[0]
      const formData = new FormData()
      formData.append('file', file)
      axios.defaults.baseURL = 'http://localhost:5000'
      axios.post('/api/testUpload', formData, {
        headers: {
          'Content-type': 'multipart/form-data;charset=UTF-8'
        }
      })
    }
  }
}
</script>
