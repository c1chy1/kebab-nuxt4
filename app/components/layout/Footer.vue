
<template>
<footer
    id="contact"
    class="bg-[url('/images/contact/footer-bg.png')]
    footer bg-cover bg-no-repeat bg-center w-full  flex flex-col
  opacity-95  pl-4  pr-6 lg:pl-12 lg:pr-20
"
>
<nav class="footer pt-8 xl:pt-0 flex flex-col gap-4 lg:flex-row items-end lg:items-center">

<div class="lg:w-1/2 pt-20 ">
  <UiLogo
             color="White"
             label="Burger House"
             text-size="text-4xl sm:text-5xl lg:text-6xl"
             svg-size=" w-14 sm:w-24 "
             src="/images/contact/logo-footer.png"
            class="space-x-8 font-bebas uppercase flex justify-center items-center transition-all duration-500 cursor-pointer"
  />
<p class="text-white text-[17px]  leading-normal pt-10">{{ $t('footer.about') }}</p>

</div>
<div class="lg:w-1/2 font-bebas text-2xl place-items-baseline xl:place-items-end pt-20" >
  <div class="py-3 flex items-center uppercase">
    <Icon name="heroicons:map-pin" class="w-6 h-6 lg:w-8 lg:h-8 text-white" />
    <a class="ml-4 lg:ml-8 text-xl lg:text-3xl text-white transition-all duration-500 cursor-pointer hover:text-[#ffc107]"
       @click="showModal('address')">Dammstraße, 22A, Lüdenscheid, {{ $t('footer.country') }}</a>
    <dialog id="address" class="modal">
      <div class="modal-box text-[#3d2514]">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-3xl">Dammstraße, 22A, Lüdenscheid, {{ $t('footer.country') }}</h3>
      </div>
    </dialog>
  </div>
  <div class="flex uppercase">
  <Icon name="heroicons:envelope" class="w-6 h-6 lg:w-8 lg:h-8 text-white" />
<a href="mailto:info@companyname.com" class=" ml-4 lg:ml-8 text-xl lg:text-3xl text-white hover:text-[#ffc107] transition-all duration-500">info@companyname.com</a>
  </div>

</div>
</nav>

  <footer class="footer footer-center leading-6  text-white flex flex-col-reverse lg:flex-row justify-between items-end pt-32 pb-6">
    <aside>
      <p class=”pt-4 lg:pt-0 text-white” >Copyright © 2026 - {{ $t('footer.copyright') }} by  <a href=”https://c1chy.de/” target=”_blank” class=”transition-all duration-500”>c1chy</a></p>
    </aside>
<LayoutFooterSocial/>

  </footer>
</footer>

</template>
<script setup lang="ts">
function showModal(id: string) {
  document.getElementById(id)?.showModal()
}
</script>