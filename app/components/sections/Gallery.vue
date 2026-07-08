<template>
  <div id="gallery" class="px-4">

    <h2 ref="titleRef" class="section-title text-primary pt-28 lg:pt-44 lg:pb-8 xl:pb-16">{{ $t('gallery.title') }}</h2>
    <div ref="gallery" class="max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl  grid  sm:grid-cols-3 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2 mx-auto shadow-dark-sm"

    >
      <a v-for="(image, i) in hamburgers"

          class="relative cursor-zoom-in img"
          :href="image.img"
      >
        <nuxt-img
            loading="lazy"
            format="webp"
            quality="75"
            :src="image.img"
            :alt="`${$t('gallery.imageAlt')} ${i + 1}`"
            sizes="lg:25vw sm:33vw 100vw"
            width="286"
            height="301"
            class="w-full"
        />
        <div
            class="absolute
          top-0
          left-0
          opacity-0
          flex
          justify-center
          items-center
          w-full
          h-full
          transition-all
          duration-1000
          bg-black/50
          hover:opacity-80
  hover:bg-primary/80
">
          <UiButtonSearch class="transition-all duration-500 animate-bounce animate bottom-5"/>

        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>

const { public: { lightgalleryLicense } } = useRuntimeConfig()
const gallery = ref()
const titleRef = ref<HTMLElement>()
useLocaleTransition(titleRef)

onMounted(async () => {
  const [{ default: Lightgallery }] = await Promise.all([
    import('lightgallery'),
    import('lightgallery/scss/lightgallery.scss'),
  ])
  Lightgallery(gallery.value, gallerySettings)
})

const hamburgers = [

  {
    img: 'images/gallery/1.png',
    title: 'Hamburger1',

  },
  {
    img: 'images/gallery/4.png',
    title: 'Hamburger2',

  },
  {
    img: 'images/gallery/2.png',
    title: 'Hamburger3',

  },
  {
    img: 'images/gallery/3.png',
    title: 'Hamburger4',

  },
  {
    img: 'images/gallery/4.png',
    title: 'Hamburger5',

  },
  {
    img: 'images/gallery/1.png',
    title: 'Hamburger6',
  }
  ,
  {
    img: 'images/gallery/3.png',
    title: 'Hamburger7',
  },
  {
    img: 'images/gallery/2.png',
    title: 'Hamburger8',
  }
]

const gallerySettings = {
  selector: '.img',
  speed: 500,
  download: false,
  counter: false,
  licenseKey: lightgalleryLicense,
}
</script>

<style scoped>

</style>
