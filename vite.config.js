import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    plugins: [
        Vue({
            include: [/\.vue$/],
        }),
        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                'vue-i18n',
                '@vueuse/head',
                '@vueuse/core',
            ],
        }),

        // https://github.com/antfu/unplugin-vue-components
        Components({
            // allow auto load markdown components under `./src/components/`
            extensions: ['vue'],

            // allow auto import and register components used in markdown
            include: [/\.vue$/, /\.vue\?vue/],

            // custom resolvers
            resolvers: [
                // auto import icons
                // https://github.com/antfu/unplugin-icons
                IconsResolver({
                    prefix: false,
                    // enabledCollections: ['carbon']
                }),
            ],
        }),

        // https://github.com/antfu/unplugin-icons
        Icons({
            autoInstall: true,
        }),

        // https://github.com/antfu/vite-plugin-pwa
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [
                'favicon.svg',
                'robots.txt',
                'safari-pinned-tab.svg',
            ],
            manifest: {
                name: 'Vitesse',
                short_name: 'Vitesse',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),

        // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
        VueI18n({
            runtimeOnly: true,
            compositionOnly: true,
            include: [path.resolve(__dirname, 'locales/**')],
        }),

        // https://github.com/antfu/vite-plugin-inspect
        Inspect({
            // change this to enable inspect for debugging
            enabled: false,
        }),
    ],

    server: {
        fs: {
            strict: true,
        },
    },

    // https://github.com/antfu/vite-ssg
    ssgOptions: {
        script: 'async',
        formatting: 'minify',
    },

    optimizeDeps: {
        include: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
        exclude: ['vue-demi'],
    },

    // https://github.com/vitest-dev/vitest
    test: {
        include: ['test/**/*.test.js'],
        environment: 'jsdom',
        deps: {
            inline: ['@vue', '@vueuse', 'vue-demi'],
        },
    },
})
