<template>
  <div class="wrap">
    <Header>
      <i slot="left" class="iconfont iconarrow-lift" @click.stop="$router.go(-1)"></i>
      <div class="top_title" slot="title">
        {{title}}
      </div>
      <i slot="right" class="iconfont iconxiaoyanjing"></i>
    </Header>
  </div>
</template>

<script>
import Header from '../Header';
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    }
  },
  components: {
    Header
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
    opacity: 0.9;
    max-width: 350px;
    @include no-wrap();
  }
}
.iconarrow-lift,
.iconxiaoyanjing {
  @include font_size(20px);
  opacity: 0.8;
}
</style>
