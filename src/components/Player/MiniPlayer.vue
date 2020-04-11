<template>
  <div class="mini-player" v-show="showMiniPlayer">
    <div class="mini-wrapper">
      <div class="left" @click="backToFSPlayer">
        <img :class="[isPlaying?'active' : '']" :src="curSong.picUrl" alt />
        <div class="desc">
          <span>{{curSong.name}}</span>
          <p>{{curSong.singer}}</p>
        </div>
      </div>
      <div class="right">
        <i
          @click="setPlayState(!isPlaying)"
          :class="['iconfont', isPlaying?'iconzanting_huaban':'iconbofanganniu1']"
        ></i>
        <i class="iconfont iconliebiao" @click.stop="showListPlayer"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['showMiniPlayer', 'isPlaying', 'curSong'])
  },
  methods: {
    ...mapActions(['setFSPlayer', 'setListPlayer', 'setPlayState']),
    showListPlayer() {
      this.setListPlayer(true);
    },
    backToFSPlayer() {
      this.setFSPlayer(true);
    }
  }
};
</script>

<style scoped lang="scss">
.mini-player {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  height: $mini_player_height;
  overflow: hidden;
  z-index: 9;
  padding: 20px 10px;
  color: #555;
  border-top: 1px solid #ddd;
  background-color: #fff;
  .mini-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: inline-flex;
      align-items: center;
      img {
        margin-right: 20px;
        width: 110px;
        height: 110px;
        border-radius: 50%;
        animation: rotateCD linear 20s infinite;
        animation-play-state: paused;
        &.active {
          animation-play-state: running;
        }
      }
      .desc {
        span {
          @include font_size($font_large);
        }
        p {
          margin-top: 8px;
          @include font_size($font_medium_s);
          color: #999;
        }
      }
    }
    .right {
      i {
        margin-right: 20px;
        @include font_size($font_icon_size3);
      }
    }
  }
}
@keyframes rotateCD {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
