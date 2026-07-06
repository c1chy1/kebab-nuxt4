import gsap from "gsap";

// Lazy-loaded plugins — only loaded on demand, not bundled in main chunk
const pluginMap = {
/*    Draggable: () => import("gsap/Draggable"),
    ScrollToPlugin: () => import("gsap/ScrollToPlugin"),*/
    ScrollTrigger: () => import("gsap/ScrollTrigger"),
/*    TextPlugin: () => import("gsap/TextPlugin"),
    DrawSVGPlugin: () => import("gsap/DrawSVGPlugin"),
    ScrollSmoother: () => import("gsap/ScrollSmoother"),
    SplitText: () => import("gsap/SplitText"),*/
} as const;

type PluginMap = typeof pluginMap;
type Plugins = keyof PluginMap;

// Resolves the module type for a given key, then picks the named export matching the key
// this allows to have the type definitions for autocomplete in your code editor
type PluginModule<K extends Plugins> = Awaited<ReturnType<PluginMap[K]>>;
type PluginExport<K extends Plugins> = PluginModule<K>[K & keyof PluginModule<K>];

export default function() {
    async function lazyLoadPlugin<K extends Plugins>(plugin: K): Promise<PluginExport<K>> {
        const loader = pluginMap[plugin];
        const m = await loader();
        const p = (m as any)[plugin];
        gsap.registerPlugin(p);
        return p;
    }

    return {
        gsap,
        lazyLoadPlugin,
    };
};
