<template>
  <header @click="changeTheme">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      theme_index: 0
    };
  },
  methods: {
    changeTheme() {
      // 循环切换主题背景
      if (++this.theme_index >= this.themes.length) {
        this.theme_index = 0;
      }
      document.documentElement.setAttribute(
        'data-theme',
        this.themes[this.theme_index]
      );
    }
  }
};
</script>

<style scoped lang='scss'>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  color: #fff;
  font-weight: bold;
  @include bg_color_theme();
  @include font_size($font_large);
  .left {
    width: 80px;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }
  .right {
    text-align: center;
    width: 80px;
    height: 90px;
    line-height: 90px;
  }
}
</style>
