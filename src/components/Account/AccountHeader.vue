<template>
  <div class="wrap">
    <Header>
      <i slot="left" class="iconfont iconarrow-lift" @click.stop="$router.go(-1)"></i>
      <div class="top_title" slot="title">
        <div @click.stop="switchList(0)" :class="{'active': isActive}">我的喜欢</div>
        <span>|</span>
        <div @click.stop="switchList(1)" :class="{'active': !isActive}">播放历史</div>
      </div>
      <i slot="right" class="iconfont iconxiaoyanjing"></i>
    </Header>
  </div>
</template>

<script>
import Header from '../Header';
export default {
  components: {
    Header
  },
  props: {
    isActive: {
      type: Boolean,
      required: true,
      default: () => true
    }
  },
  methods: {
    switchList(num) {
      this.$emit('switchList', num);
    }
  }
};
</script>

<style scoped lang="scss">
.wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  .top_title {
    display: flex;
    @include font_size($font_medium_s);
    align-items: center;
    color: #ccc;
    font-weight: 400;
    div {
      transition: all 0.3s;
      padding: 8px 8px;
      &.active {
        color: #fff;
        font-weight: bolder;
        @include font_size($font_large);
      }
    }
    span {
      padding-bottom: 4px;
    }
  }
}
.iconarrow-lift,
.iconxiaoyanjing {
  @include font_size(20px);
  opacity: 0.8;
}
</style>
