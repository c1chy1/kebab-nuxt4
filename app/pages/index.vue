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
  <LazySectionsHome/>
  <LazyLayoutMenu/>
  <LazySectionsEvents/>
  <LazySectionsGallery/>
  <LazyAccountRegister/>
  <LazyAccountLogin v-if="!user.isLoggedIn"/>
  <LazyLayoutFooter/>


</template>