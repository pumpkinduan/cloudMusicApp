import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/base.scss";
import VueLazyLoad from "vue-lazyload";
import Loading from "./plugins/loading/index.js";
import Dialog from "./plugins/dialog/index.js";
Vue.directive("debounce", {
  inserted: (el, binding) => {
    let timer = null;
    el.addEventListener(
      "input",
      () => {
        timer && clearTimeout(timer); //用户每次触发事件时都clear之前的setTimeout
        timer = setTimeout(() => {
          //一般防抖都是对DOM事件进行的，所以应该把this指向触发该事件的那个DOM元素
          //arguments中保存了事件对象
          binding.value();
        }, 200);
      },
      false
    );
  }
});
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: require("./assets/images/error.jpg"),
  loading: require("./assets/images/loading.gif")
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
