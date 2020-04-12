<template>
  <transition name="fade">
    <div class="container" v-show="visible">
      <div class="dialog" :style="{textAlign: textAlign, animationDuration: duration/1000 + 's'}">
        <p class="title">{{title}}</p>
        <p class="text">{{message}}</p>
        <p v-if="type==='alert'" class="alert-btn" @click="visible = false">{{alertBtnText}}</p>
        <div v-if="type==='confirm'" class="dialog-btns">
          <span @click.stop="clickCancle">取消</span>
          <i class="line">|</i>
          <span @click.stop="clickConfirm">确定</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/**
 * @params
 * type: 弹出框的类型; 'alert'为普通提示框;'confirm'为确认提示框
 * alertBtnText: type为'alert'的提示框下方的按钮文字
 * duration(整数 单位ms): 提示框动画的执行时间
 * title：提示框顶部标题
 * textAlign：提示框文本水平对齐方式=> 'left' 'right' 'center'三个值
 * visible(布尔类型): 提示框的显示与隐藏，true 或 false
 */
export default {
  name: 'Dialog',
  data() {
    return {
      visible: false,
      title: '温馨提示',
      textAlign: 'left',
      alertBtnText: '好的',
      type: 'alert',
      duration: 200,
      resolve: null,
      reject: null
    };
  },
  methods: {
    popupDialog() {
      this.visible = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject
      })
    },
    clickCancle() {
      this.visible = false;
      this.reject('取消');
    },
    clickConfirm() {
       this.visible = false;
       this.resolve('确定');
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .dialog {
    width: 88%;
    box-sizing: border-box;
    border-radius: 15px;
    background-color: #fff;
    padding: 30px 40px;
    animation: appear 0.2s linear 0.1s;
    animation-fill-mode: forwards;
    transform: scale(0);
    .title {
      color: #507daf;
      @include font_size($font_small);
    }
     .text {
      color: #555;
      @include font_size($font_medium);
      padding: 30px 0;
      border-bottom: 1px solid #ddd;
    }
    .dialog-btns {
      padding-top: 22px;
      text-align: right;
      span {
        @include font_color();
        font-weight: bold;
        padding: 5px;
      }
      .line {
        visibility: hidden;
        display: inline-block;
        margin: 0 30px;
      }
    }

    .alert-btn {
      @include font_color();
      padding: 12px 0;
      font-weight: bold;
      @include font_size($font_medium);
    }
  }
}
@keyframes appear {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
