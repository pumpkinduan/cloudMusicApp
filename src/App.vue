<template>
  <div id="app">
    <div class="fixd_top">
      <main-header />
      <TabBar />
    </div>
    <transition>
      <!-- <keep-alive> -->
        <router-view />
      <!-- </keep-alive> -->
    </transition>
    <Player />
  </div>
</template>
<script>
import MainHeader from './components/MainHeader';
import TabBar from './components/TabBar';
import Player from './views/Player';
export default {
  name: 'Home',
  components: {
    MainHeader,
    TabBar,
    Player
  }
};
</script>
<style scoped lang="scss">
#app {
  @include bg_color_sub_theme();
  position: relative;
  .fixd_top {
    height: 180px;
    position: relative;
    z-index: 1;
  }
}
</style>
