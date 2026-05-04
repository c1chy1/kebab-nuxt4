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
<!--  <LayoutHeader/>-->
<!--  <LayoutHome/>-->
<!--  <LayoutMenu/>-->
<!--  <LayoutEvents/>-->
  <LayoutGallery/>
  <section class="
  bg-[length:10rem_22rem]
  sm:bg-[length:18rem_35rem]
  xl:bg-[length:24rem_40rem]
  bg-[url('/images/register/register-left.png')] bg-no-repeat">
    <AccountLogin v-show="!user.isLoggedIn"/>
    <AccountRegister/>
  </section>

  <LayoutFooter/>


</template>