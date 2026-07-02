
<template>
<footer
    id="contact"
    class="relative footer bg-transparent w-full flex flex-col opacity-95 pl-4 pr-6 lg:pl-12 lg:pr-20"
>
  <NuxtImg
    src="/images/contact/footer-bg.png"
    format="webp"
    quality="75"
    sizes="100vw"
    loading="lazy"
    alt=""
    aria-hidden="true"
    class="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
  />
  <div class="relative z-10 flex flex-col w-full">
<nav class="footer pt-8 xl:pt-0 flex flex-col gap-4 lg:flex-row items-end lg:items-center">

<div class="lg:w-1/2 pt-20">
  <UiLogo
             alt="burger house logo"
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
  <div class="py-3 flex uppercase justify-center items-center">
    <Icon name="heroicons:map-pin" class="w-6 h-6 lg:w-6 lg:h-6 text-white" />
    <a href="#address" class="ml-4 lg:ml-6 text-xl lg:text-3xl text-white transition-all duration-500 cursor-pointer hover:text-[#ffc107]"
       @click.prevent="showModal('address')">Dammstraße, 22A, Lüdenscheid, {{ $t('footer.country') }}</a>
    <dialog id="address" class="modal">
      <div class="modal-box text-[#3d2514]">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 class="font-bold text-3xl">Dammstraße, 22A, Lüdenscheid, {{ $t('footer.country') }}</h3>
      </div>
    </dialog>
  </div>
  <div class="flex uppercase justify-center items-center">
  <Icon name="heroicons:envelope" class="w-6 h-6 lg:w-6 lg:h-6 text-white" />
<a href="mailto:info@companyname.com" class=" ml-4 lg:ml-6 text-xl lg:text-3xl text-white hover:text-[#ffc107] transition-all duration-500">info@companyname.com</a>
  </div>

</div>
</nav>

  <footer class="footer footer-center leading-6  text-white flex flex-col-reverse lg:flex-row justify-between items-end pt-32 pb-6">
    <aside>
      <p class=”pt-4 lg:pt-0 text-white” >Copyright © 2026 - {{ $t('footer.copyright') }} by  <a href=”https://c1chy.de/” target=”_blank” class=”transition-all duration-500”>c1chy</a></p>
    </aside>
<LayoutFooterSocial/>

  </footer>
  </div>
</footer>

</template>
<script setup lang="ts">
function showModal(id: string) {
  document.getElementById(id)?.showModal()
}
</script>