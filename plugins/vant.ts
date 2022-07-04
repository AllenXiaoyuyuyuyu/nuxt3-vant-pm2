import { defineNuxtPlugin } from '#app';
import vant from 'vant';
import 'vant/lib/index.css';

export default defineNuxtPlugin(nuxtApp => {
    // Doing something with nuxtApp
    nuxtApp.vueApp.use(vant)
  })