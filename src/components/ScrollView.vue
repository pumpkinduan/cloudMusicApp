<template>
  <div id="wrapper" ref="wrapper">
    <!--
      slot里的结构
      <ul>
        <li></li>
      </ul>
    -->
    <slot></slot>
  </div>
</template>

<script>
// import IScroll from 'iscroll/build/iscroll-probe';
import BScroll from 'better-scroll';

export default {
  name: 'ScrollView',
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      scrollbars: true,
      click: true,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true,
      //handle Unable to preventDefault inside passive event listener due to target being treated as passive
      preventDefault: false
    });

    // 1.创建一个观察者对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生了变化, 就会执行传入的回调函数
    mutationList: 发生变化的数组
    observer: 观察者对象
    * */
    let observer = new MutationObserver((mutationList, observer) => {
      this.refresh();
    });
    // // 2.告诉观察者对象我们需要观察什么内容
    let config = {
      childList: true, // 观察目标子节点的变化，添加或者删除
      subtree: true, // 默认为 false，设置为 true 可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    };
    // 3.告诉观察者对象, 我们需要观察谁, 需要观察什么内容
    /*
    第一个参数: 告诉观察者对象我们需要观察谁
    第二个参数: 告诉观察者对象我们需要观察什么内容
    * */
    observer.observe(this.$refs.wrapper, config);
  },
  methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling(fn) {
      this.bscroll.on('scroll', function() {
        fn(this.y);
      });
    },
    refresh() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.bscroll.refresh();
        }, 66);
      });
    },
    scrollTo(x, y, time) {
      this.bscroll.scrollTo(x, y, time);
    }
  }
};
</script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  touch-action: none;
}
</style>
