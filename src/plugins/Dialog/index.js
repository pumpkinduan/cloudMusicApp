import Dialog from "./Dialog";
export default {
  install: (Vue, options) => {
    //创建Dialog构造器
    let DialogConstructor = Vue.extend(Dialog);
    //创建Dialog实例，一个Vue对象
    let DialogInstance = new DialogConstructor();
    //创建一个元素并添加到页面中，用于Dialog实例的挂载
    let oDiv = document.createElement("div");
    document.body.appendChild(oDiv);
    //手动挂载Dialog实例
    DialogInstance.$mount(oDiv);
    //添加实例方法
    Vue.$hiddenDialog = Vue.prototype.$hiddenDialog = () => {
      DialogInstance.isShow = false;
    };
    Vue.$showDialog = Vue.prototype.$showDialog = (message, btnText) => {
      if (message) {
        DialogInstance.message = message;
      }
      if (btnText) {
        DialogInstance.btnText = btnText;
      }
      DialogInstance.isShow = true;
    };
  }
};
