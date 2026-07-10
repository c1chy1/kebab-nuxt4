<script setup lang="ts">
import {useUserStore} from "../stores/userStore";
const user = useUserStore()
definePageMeta
({
  middleware
      : ["auth"]
})

useHead({
  title: 'Kebab',
})

</script>
<template >
  <LayoutNavigation/>
  <LayoutHeader/>
  <div class="[content-visibility:auto] [contain-intrinsic-size:0_600px]">
    <LazySectionsHome/>
  </div>
  <div class="[content-visibility:auto] [contain-intrinsic-size:0_800px]">
    <LazyLayoutMenu/>
  </div>
  <div class="[content-visibility:auto] [contain-intrinsic-size:0_600px]">
    <LazySectionsEvents/>
  </div>
  <div class="[content-visibility:auto] [contain-intrinsic-size:0_600px]">
    <LazySectionsGallery/>
  </div>
  <section class="[content-visibility:auto] [contain-intrinsic-size:0_400px]">
    <LazyAccountRegister/>
    <LazyAccountLogin v-if="!user.isLoggedIn"/>
  </section>
  <div class="[content-visibility:auto] [contain-intrinsic-size:0_300px]">
    <LazyLayoutFooter/>
  </div>


</template>