<script setup lang="ts">

defineProps({
  src: String,
  alt: String,
})

</script>

<template>
  <nuxt-img
      sizes="290px sm:350px md:380px xl:320px"
      width="290"
      height="194"
      loading="lazy"
      fetchpriority="low"
      quality="40"
      format="webp"
      :src="src"
      :alt="alt"
      class="z-10"/>
</template>

<style scoped>


</style>