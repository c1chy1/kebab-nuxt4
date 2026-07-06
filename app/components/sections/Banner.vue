
<template>
<article ref="articleRef" class="relative  w-full overflow-hidden rounded-xl">
<div class="absolute top-0 left-0  ml-3 mt-2  sm:space-y-2 lg:ml-8 lg:mt-7 z-[1]">
  <p class="text-sm sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-medium  leading-normal text-white">{{subject}}</p>
  <h2 class="text-2xl sm:text-5xl lg:text-xl xl:text-2xl 2xl:text-3xl text-white" >{{ title }}</h2>

</div>

        <nuxt-img
            loading="lazy"
            fetchpriority="low"
            format="webp"
            quality="60"
            sizes="330px sm:360px md:380px lg:350px"
            width="330"
            height="235"
            alt=""
            :src="src"
             class="
             w-full
             hover:scale-105
             transition
             duration-500
             cursor-pointer
             object-cover"/>
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
