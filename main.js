import App from './App'
import UniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"
import UniSwiperDot from "@/uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.vue"
import UniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
import uniTransition from '@/uni_modules/uni-transition/components/uni-transition/uni-transition.vue'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component("uni-icons", UniIcons);
  app.component("uni-swiper-dot", UniSwiperDot)
  app.component("uni-popup", UniPopup)
  app.component("uni-transition", uniTransition)
  return {
    app
  }
}
// #endif