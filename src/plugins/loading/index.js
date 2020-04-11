import Loading from "./Loading";
export default {
  install: (Vue, options) => {
    //创建Loading构造器
    let LoadingConstructor = Vue.extend(Loading);
    //创建Loading实例，一个Vue对象
    let loadingInstance = new LoadingConstructor();
    //创建一个元素并添加到页面中，用于Loading实例的挂载
    let oDiv = document.createElement("div");
    document.body.appendChild(oDiv);
    //手动挂载Loading实例
    loadingInstance.$mount(oDiv);

    //添加全局方法
    Vue.$hiddenLoading = () => {
      loadingInstance.isShow = false;
    };
    Vue.$showLoading = () => {
      loadingInstance.isShow = true;
    };
    //添加实例方法
    Vue.prototype.$hiddenLoading = () => {
      loadingInstance.isShow = false;
    };
    Vue.prototype.$showLoading = () => {
      loadingInstance.isShow = true;
    };
  }
};
