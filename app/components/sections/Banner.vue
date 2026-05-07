
<template>
<article class="relative  w-full overflow-hidden rounded-xl">
<div class="absolute top-0 left-0 text-white font-bebas ml-3 mt-2  sm:space-y-2 lg:ml-8 lg:mt-7 z-[1]">
  <h4 class=" text-sm sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-medium  leading-normal">{{subject}}</h4>
  <h3 class=" text-2xl sm:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl" >{{ title }}</h3>

</div>

        <nuxt-img
            loading="lazy"
            format="webp"
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

</script>

<style scoped>

</style>