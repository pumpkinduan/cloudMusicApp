<template>
  <transition name="fade">
    <div class="container" v-show="isShow">
        <div class="dialog">
          <p class="text">{{message}}</p>
          <p class="btn" @click.stop="hidden">{{btnText}}</p>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dialog',
  data() {
    return {
      isShow: false,
      message: '网络请求超时，请重新刷新页面!',
      btnText: '好的'
    };
  },
  methods: {
    hidden() {
      this.isShow = false;
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
    width: 50%;
    border-radius: 15px;
    background-color: #fff;
    padding: 20px 33px;
    text-align: center;
    animation: appear .2s linear .1s;
    animation-fill-mode: forwards;
    transform: scale(0);
    .text {
      color: #555;
      @include font_size($font_medium_s);
      padding: 30px 0;
      border-bottom: 1px solid #ddd;
    }
    .btn {
      color: #507daf;
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
