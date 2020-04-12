import Dialog from "./Dialog";
export default {
  install: (Vue, options={}) => {
    //创建Dialog构造器
    let DialogConstructor = Vue.extend(Dialog);
    //创建Dialog实例，一个Vue对象
    let instance = new DialogConstructor();
    //创建一个元素并添加到页面中，用于Dialog实例的挂载
    let oDiv = document.createElement("div");
    document.body.appendChild(oDiv);
    //手动挂载Dialog实例
    instance.$mount(oDiv);
    //添加实例方法
    Vue.$dialog = Vue.prototype.$dialog = (opt={}) => {
      // 将全局配置与自定义配置选项进行合并，自定义配置会覆盖全局配置
      // 即有相同属性，opt中的会覆盖options中的
      // 由于选项的值类型没有引用类型，故直接使用assign浅拷贝方法
      opt = Object.assign(options, opt);
      if (opt.title) {instance.title = opt.title;}
      if (opt.message) {instance.message = opt.message;}
      if (opt.alertBtnText) {instance.alertBtnText = opt.alertBtnText;}
      if (opt.type) {instance.type = opt.type;}
      if (opt.duration) {instance.duration = opt.duration;}
      if (opt.textAlign) {instance.textAlign = opt.textAlign;}
      return instance.popupDialog().then((sucMsg) => {
        return Promise.resolve(sucMsg)
      }, errMsg => {
        return Promise.reject(errMsg)
      })
    }
  }
};
