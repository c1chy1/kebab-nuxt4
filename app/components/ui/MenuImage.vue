<script setup lang="ts">

defineProps({
  src: String,
  alt: String,
})

</script>

<template>
  <nuxt-img
      sizes="100vw sm:50vw md:400px  xl:300px"
      loading="lazy"
      quality="40"
      format="webp"
      :src="src"
      :alt="alt"
      class="z-10"/>
</template>

<style scoped>


</style>