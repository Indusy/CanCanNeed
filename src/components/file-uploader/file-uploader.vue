<template>
  <div class="file-uploader">
    <form @submit.prevent="handleSubmit">
      <input ref="fileInputRef" type="file" name="file">
      <button type="submit">上传</button>
    </form>
  </div>
</template>

<script setup>
import { genSlice, Scheduler } from '@/assets/js/util'
import { ref } from 'vue'
import axios from './axios'
const fileInputRef = ref(null)
const uploading = ref(false)
const scheduler = new Scheduler(4)
async function uploadFile (file) {
  return new Promise((resolve, reject) => {
    const fd = new FormData()
    fd.append('file', file)
    axios.post('/api/testUpload', fd, {
      headers: {
        'Content-type': 'multipart/form-data;charset=UTF-8'
      }
    }).then(data => resolve(data)).catch(err => reject(err))
  })
}
async function handleSubmit (evt) {
  if (!uploading.value) {
    const chunkList = []
    window.cl = chunkList
    const file = fileInputRef.value.files[0]
    for await (const chunk of genSlice(file)) {
      scheduler.add(() => {
        uploadFile(new File(chunk, 'xxx 文件名'))
      })
    }
  }
}

</script>
