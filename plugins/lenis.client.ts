import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    })

    // RAF loop — GSAP-friendly
    function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return {
        provide: {
            lenis,
            scrollTo: (selector: string) => lenis.scrollTo(selector, { offset: -80 }),
            scrollToTop: () => lenis.scrollTo(0),
        },
    }
})