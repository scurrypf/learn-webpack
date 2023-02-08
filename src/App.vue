<!--单文件组件浏览器无法解析-->
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg">
</template> 

<style>
h1{
    color: red;
}
</style>