<template>
  <div class="player-middle" @click="showLyric">
    <section :class="[!hidden?'hidden': '', 'base-area']">
      <div :class="['wrap-cd', isPlaying ? 'active': '']">
        <img :src="curSong.picUrl" alt />
      </div>
      <div class="song-info">
        <b>{{curSong.name}}</b>
        <p v-for="(val,index) in curSong.alia" :key="index">{{val}}</p>
      </div>
    </section>
    <div v-show="hidden" class="show-complete-lyric" @click.stop="showLyric">点击查看完整歌词 》</div>

    <section ref="wrap_lyric" :class="[hidden?'hidden': '' ,'wrap-lyric']">
      <p v-if="curLyric.nolyric" class="nolyric">{{curLyric.text}}</p>
      <ScrollView ref="scrollView" v-else>
        <div class="lyric" ref="lyric">
          <p
            :class="{'active': lineNum === prop}"
            v-for="(value, prop, index) in curLyric"
            :key="index"
          >{{value}}</p>
        </div>
      </ScrollView>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ScrollView from '../ScrollView';
export default {
  components: {
    ScrollView
  },
  data() {
    return {
      hidden: true,
      lineNum: '0', // 高亮歌词的部分
      vh_lyric: 0 // 歌词的可视区高度
    };
  },
  computed: {
    ...mapGetters(['isPlaying', 'curSong', 'curLyric', 'curTime'])
  },
  watch: {
    curTime(newVal) {
      if (this.curLyric.nolyric) return;
      // 同步高亮歌词
      let num = Math.floor(newVal);
      // 若是当前播放歌曲的时间对应有歌词，则让当前歌词进行高亮
      this.lineNum = this.getActiveLineNum(num);
      this.autoScroll();
    },
    curLyric(newVal) {
       if (this.curLyric.nolyric) return;
      // 切换歌曲时，歌词变动，将歌词界面重新回滚到顶部
      this.$refs.scrollView.scrollTo(0, 0, 200);
      for (let key in newVal) {
        // 为每首歌词的初始高亮部分对应的秒数不同而作处理
        this.lineNum = key;
        return;
      }
    }
  },
  methods: {
    autoScroll() {
      //歌词播放到中间部分，歌词自动滚动,否则不滚动
      let active = document.querySelector('.lyric p.active');
      let curLyricTop = active && active.offsetTop;
      let vh_lyric = Math.floor(this.$refs.wrap_lyric.offsetHeight);
      let scrollY = Math.floor(Math.abs(this.$refs.scrollView.iScroll.y));
      let maxScrollY = Math.floor(
        Math.abs(this.$refs.scrollView.iScroll.maxScrollY)
      );
      if (curLyricTop > vh_lyric / 2 && maxScrollY > scrollY) {
        this.$refs.scrollView.scrollTo(0, vh_lyric / 2 - curLyricTop, 200);
      }

    },
    showLyric() {
      this.hidden = !this.hidden;
    },
    getActiveLineNum(num) {
      //若是当前播放到的时长没有对应的歌词，则递归找到上一句对应的歌词，并高亮它
      if (num < 0) return this.lineNum + '';
      let lyric = this.curLyric[num + ''];
      if (lyric) {
        return num + '';
      } else {
        num--;
        return this.getActiveLineNum(num);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.player-middle {
  margin-top: 40px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 150px;
  section {
    width: 100%;
    height: 90%;
    transition: all 0.3s;
    position: absolute;
    left: 0;
    right: 0;
    transform: translate3d(0%, 0, 0);
  }
  .hidden {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .base-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .wrap-cd {
      width: 450px;
      height: 450px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      padding: 15px;
      animation: rotateCD linear 20s infinite;
      animation-play-state: paused;
      &.active {
        animation-play-state: running;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .song-info {
      padding-top: 30px;
      width: 75%;
      @include no-wrap();
      b {
        font-weight: normal;
        @include font_size($font_super_large);
      }
      span {
        @include font_size($font_medium_s);
        margin-left: 10px;
      }
      p {
        margin-top: 10px;
        opacity: 0.8;
      }
    }
  }
  .show-complete-lyric {
    padding: 10px;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    @include font_size($font_large);
  }
  .wrap-lyric {
    .nolyric {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      @include font_size($font_large);
    }
    .lyric {
      p {
        padding: 15px 0;
        color: rgba(255, 255, 255, 0.66);
        transition: font-size 0.3s;
        &.active {
          color: #fff;
          @include font_size($font_large);
        }
        &:last-child {
          padding-bottom: 20px;
        }
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
