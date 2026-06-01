const _localeChanging = ref(false)

export function setLocaleChanging(value: boolean) {
  _localeChanging.value = value
}

export function useLocaleTransition(
  containerRef: Ref<HTMLElement | HTMLElement[] | null | undefined>,
  selector?: string
) {
  const { gsap } = useGSAP()

  watch(_localeChanging, async (changing) => {
    const raw = containerRef.value
    if (!raw) return

    const containers = Array.isArray(raw) ? raw : [raw]
    const targets: Element[] = []

    for (const el of containers) {
      if (selector) {
        targets.push(...Array.from(el.querySelectorAll(selector)))
      } else {
        targets.push(el)
      }
    }

    if (!targets.length) return

    if (changing) {
      gsap.to(targets, {
        opacity: 0,
        y: -8,
        duration: 0.25,
        stagger: 0.04,
        ease: 'power2.in',
      })
    } else {
      await nextTick()
      gsap.fromTo(
        targets,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      )
    }
  })
}
