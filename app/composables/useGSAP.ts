import gsap from "gsap";

// Lazy-loaded plugins — only loaded on demand, not bundled in main chunk
const pluginMap = {
    ScrollTrigger: () => import("gsap/ScrollTrigger"),

} as const;

type PluginMap = typeof pluginMap;
type Plugins = keyof PluginMap;

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
