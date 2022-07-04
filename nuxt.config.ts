import { defineNuxtConfig } from 'nuxt'
import { transformScript } from "vite-plugin-svg-transform-script";
console.log('当前环境')

export default defineNuxtConfig({
    modules: ["@nuxtjs/proxy"],
    app: {
        head: {
            titleTemplate: 'home',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width,height=device-height,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
                }
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/image/favicon.ico' }],
            script: [
            ]
        },
    },
    css: [],
    build: {
        // loaders: {
        //     sass: {
        //         sassOptions:require('sass')
        //     },
        //     scss: {
        //         sassOptions:require('scss')
        //     },
        //   },
        postcss: {
            postcssOptions: require('./postcss.config.ts')
        },
        transpile: [
            'vant'
        ],
    },
    vite: {
        server: {
            proxy: {
                '/api': {
                    target: 'xxxxxxxxxxx',
                    ws: true,
                    rewrite: (path) => {
                        return path.replace(/^\/api/, '')
                    }
                },
            },
        },
        plugins: [

        ],
        envDir: './env/',
        build: {
            commonjsOptions: {
                ignoreTryCatch: false,
            },
        }, 
        css: {

        }
    },
    plugins: [
        {
            src: '~/plugins/vant.ts', ssr: true
        },

    ],
    server: {
        port: 3000, // 默认3000 也可以改成其它的端口号
        host: '0.0.0.0', // 默认localhost
    },



})
