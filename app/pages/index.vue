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
  <SectionsHome/>
  <LayoutMenu/>
  <SectionsEvents/>
  <SectionsGallery/>
  <section class="
  bg-size-[10rem_22rem]
  sm:bg-size-[18rem_35rem]
  xl:bg-size-[24rem_40rem]
  bg-[url('/images/register/register-left.png')] bg-no-repeat">
    <AccountLogin v-show="!user.isLoggedIn"/>
    <AccountRegister/>
  </section>

  <LayoutFooter/>


</template>