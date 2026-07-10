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

let lgInstance: any = null
let historyPushed = false

const handlePopstate = () => {
  if (historyPushed) {
    historyPushed = false
    lgInstance?.closeGallery()
  }
}

onMounted(async () => {
  window.addEventListener('popstate', handlePopstate)

  const [{ default: Lightgallery }] = await Promise.all([
    import('lightgallery'),
    import('lightgallery/scss/lightgallery.scss'),
  ])
  lgInstance = Lightgallery(gallery.value, gallerySettings)

  gallery.value.addEventListener('lgAfterOpen', () => {
    history.pushState({ lgOpen: true }, '')
    historyPushed = true

    const container = document.querySelector('.lg-container')
    if (container && !container.querySelector('.lg-custom-close')) {
      const btn = document.createElement('button')
      btn.className = 'lg-custom-close'
      btn.innerHTML = '&times;'
      btn.setAttribute('aria-label', 'Close')
      btn.onclick = () => lgInstance?.closeGallery()
      container.appendChild(btn)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { btn.classList.add('lg-custom-close--visible') })
      })
    }
  })

  gallery.value.addEventListener('lgAfterClose', () => {
    document.querySelector('.lg-custom-close')?.remove()
  })

  gallery.value.addEventListener('lgBeforeClose', () => {
    const btn = document.querySelector('.lg-custom-close') as HTMLElement | null
    if (btn) btn.classList.remove('lg-custom-close--visible')
    if (historyPushed) {
      historyPushed = false
      history.go(-1)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopstate)
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

<style>
.lg-custom-close {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 10000;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 28px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.35s ease, background 0.2s;
}
.lg-custom-close--visible {
  opacity: 1;
}
.lg-custom-close:hover {
  background: rgba(0, 0, 0, 0.8);
}
</style>
