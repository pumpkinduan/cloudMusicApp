<template>
  <Header>
    <div class="top_left" slot="left"></div>
    <div class="top_title" slot="title">
      网易云音乐
    </div>
    <div class="top_right" slot="right" @click.stop="$router.push({name: 'Account'})">

    </div>
  </Header>
</template>

<script>
import Header from './Header';
export default {
  components: {
    Header
  }
};
</script>

<style scoped lang="scss">
.top_left {
  width: 100%;
  height: 100%;
  @include bg_image('../assets/images/logo');
}
.top_right {
  width: 100%;
  height: 100%;
  @include bg_image('../assets/images/account');
  background-size: cover;
  a {
    width: 100%;
    height: 100%;
  }
}
</style>
