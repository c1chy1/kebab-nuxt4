
<template>
<article ref="articleRef" class="relative w-full h-full overflow-hidden rounded-xl">
<div class="absolute top-0 left-0 ml-3 mt-2 sm:space-y-2 lg:ml-8 lg:mt-7 z-[1]">
  <p class="text-sm sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-medium leading-normal text-white">{{subject}}</p>
  <h2 class="text-2xl sm:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white">{{ title }}</h2>
</div>

        <nuxt-img
            loading="lazy"
            fetchpriority="low"
            format="webp"
            quality="60"
            sizes="100vw sm:50vw lg:50vw"
            alt=""
            :src="src"
            class="w-full h-full min-h-50 hover:scale-105 transition duration-500 cursor-pointer object-cover"/>
</article>



</template>
<script setup lang="ts">

defineProps({
  subject: String,
  title: String,
  src : String
})

const articleRef = ref<HTMLElement>()
useLocaleTransition(articleRef, 'h2, p')
</script>

<style scoped>

</style>
