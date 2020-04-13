<template>
  <div class="container" v-show="isShow" :style="{background: maskBgc}">
    <div class="container-inner">
      <div class="loading">
        <span class="loading-dot loading-move-right" :style="{background: loadingDotBgc}"></span>
        <span class="loading-dot loading-scale" :style="{background: loadingDotBgc}"></span>
        <span class="loading-dot loading-move-left" :style="{background: loadingDotBgc}"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      isShow: false,
      maskBgc: 'rgba(0, 0, 0, 0.45)',
      loadingDotBgc: '#eee'
    };
  }
};
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .container-inner {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @include font_size($font_super_large);
    .loading {
      .loading-dot {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 10px;
        animation: 0.2s linear infinite alternate;
      }
      .loading-scale {
        animation-name: fat;
      }
      .loading-move-right {
        animation-name: bounceToRight;
      }
      .loading-move-left {
        animation-name: bounceToLeft;
      }
    }
  }
}

@keyframes fat {
  0% {
    opacity: 1;
    transform: scale(1, 1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1.4, 1.4);
  }
}
@keyframes bounceToRight {
  0% {
    opacity: 0.6;
    transform: translateX(0px);
  }
  100% {
    transform: translateX(20px);
    opacity: 1;
  }
}
@keyframes bounceToLeft {
  0% {
    opacity: 0.6;
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-20px);
    opacity: 1;
  }
}
</style>
