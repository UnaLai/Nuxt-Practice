<template>
  <nav class="nav">
    <div class="logo">
      <nuxt-link :to="{name:'index'}">Home</nuxt-link>
      <nuxt-link :to="{name:'post-id',params:{id:'1'}}">Post</nuxt-link>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>