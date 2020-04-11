<template>
  <transition @enter="enter" @leave="leave" :css="false">
    <div class="fsplayer-wrap" v-show="this.showFSPlayer">
      <PlayerHeader />
      <PlayerMiddle  />
      <PlayerProgress :audio="audio" />
      <div class="blur_bg" :style="`background-image: url(${curSong.picUrl})`"></div>
      <div class="mask"></div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import PlayerHeader from './PlayerHeader';
import PlayerMiddle from './PlayerMiddle';
import PlayerProgress from './PlayerProgress';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
export default {
  props: ['audio'],
  components: {
    PlayerHeader,
    PlayerMiddle,
    PlayerProgress
  },
  methods: {
    enter(el, done) {
      Velocity(el, 'transition.fadeIn', { duration: 300 }, function() {
        done();
      });
    },
    leave(el, done) {
      Velocity(el, 'transition.fadeOut', { duration: 300 }, function() {
        done();
      });
    }
  },
  computed: {
    ...mapGetters(['showFSPlayer', 'curSong'])
  }
};
</script>

<style scoped lang="scss">
.fsplayer-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .blur_bg {
    @include blur_bgc(60px);
  }
}
</style>
