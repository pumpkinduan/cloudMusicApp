<template>
  <nav class="tab-bar">
    <router-link class="item" tag="span" :to="{ name: 'Recommend' }">推荐</router-link>
    <router-link class="item" tag="span" :to="{ name: 'Singer' }">歌手</router-link>
    <router-link class="item" tag="span" :to="{ name: 'Rank' }">排行</router-link>
    <router-link class="item" tag="span" :to="{ name: 'Search' }">搜索</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// @import '../assets/css/mixin.scss';
// @import '../assets/css/variable.scss';
.tab-bar {
  height: 80px;
  display: flex;
  justify-content: space-around;
  @include bg_color_sub_theme();
  .item {
    font-weight: 700;
    line-height: 80px;
    &.router-link-active {
      border-bottom: solid 4px $theme_bright;
      @include border_color();
      @include font_color();
    }
  }
}
</style>
