import Loading from "./Loading";
export default {
  install: (Vue, options) => {
    //创建Loading构造器
    let LoadingConstructor = Vue.extend(Loading);
    //创建Loading实例，一个Vue对象
    let instance = new LoadingConstructor();
    //创建一个元素并添加到页面中，用于Loading实例的挂载
    let oDiv = document.createElement("div");
    document.body.appendChild(oDiv);
    if (options.maskBgc) {
      instance.maskBgc = options.maskBgc;
    }
    if (options.loadingDotBgc) {
      instance.loadingDotBgc = options.loadingDotBgc;
    }
    //手动挂载Loading实例
    instance.$mount(oDiv);
    Vue.$hiddenLoading = Vue.prototype.$hiddenLoading = () => {
      instance.isShow = false;
    };
    Vue.$showLoading = Vue.prototype.$showLoading = () => {
      instance.isShow = true;
    };
  }
};
