<template>
  <div class="player-header">
    <header>
      <div>
        <i slot="left" class="iconfont iconarrow-lift" @click="back"></i>
      </div>
      <div class="top_title">
        <b>{{curSong.name}}</b>
        <p>{{curSong.singer}}</p>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions(['setMiniPlayer']),
    back() {
      this.setMiniPlayer(true);    }
  },
  computed: {
    ...mapGetters(['curSong'])
  }
};
</script>

<style scoped lang="scss">
header {
  position: relative;
  z-index: 99;
  display: flex;
  align-items: center;
  height: 90px;
  color: #f1f1f1;
  font-weight: bold;
  padding-top: 15px;
  @include font_size($font_large);
  .top_title {
    padding-left: 30px;
    font-weight: normal;
    max-width: 400px;
    @include no-wrap();
    p {
      margin-top: 10px;
      @include font_size($font_medium);
      opacity: 0.8;
    }
  }
}
.iconarrow-lift {
  @include font_size(20px);
  opacity: 0.8;
}
</style>
