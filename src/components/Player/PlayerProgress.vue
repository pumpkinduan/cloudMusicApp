<template>
  <div class="plaryer-progress">
    <div class="top">
      <div class="start-time">{{startTime}}</div>
      <div class="progress" ref="progress" @click="speedPlay">
        <div class="progress-bar" ref="progressBar">
          <div class="progress-btn"></div>
        </div>
      </div>
      <div class="end-time">{{endTime}}</div>
    </div>
    <div class="bottom">
      <div class="mode" @click="changePlayMode">
        <i
          :class="{'iconfont': true,  'iconxunhuanbofang': playMode === 'loop', 'icondanquxunhuan': playMode === 'single', 'iconsuijibofang': playMode === 'random'}"
        ></i>
      </div>
      <div class="prev" @click="prev">
        <i class="iconfont iconshangyishoushangyige"></i>
      </div>
      <div class="play-btn" @click="setPlayState(!isPlaying)">
        <i :class="['iconfont', isPlaying?'iconzanting_huaban':'iconbofanganniu1']"></i>
      </div>
      <div class="next" @click="next">
        <i class="iconfont iconxiayigexiayishou"></i>
      </div>
      <div class="like" @click="addLike">
        <i :class="['iconfont', isLiked ? 'iconxihuan2' : 'iconxihuan1']"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { formateTime } from '@/tool/index';
export default {
  props: ['audio'],
  data() {
    return {
      modes: ['loop', 'single', 'random'],
      index: 0
    };
  },
  computed: {
    ...mapGetters([
      'curSong',
      'isPlaying',
      'playMode',
      'curIndex',
      'curTime',
      'totalTime',
      'likeSongs'
    ]),
    isLiked: {
      // 判断当前播放歌曲是否被like了
      get() {
        return this.likeSongs.find(v => v.id === this.curSong.id);
      },
      set() {}
    },
    startTime() {
      return formateTime(this.curTime);
    },
    endTime() {
      return formateTime(this.totalTime);
    }
  },
  watch: {
    curTime(newVal) {
      let k = (newVal / this.totalTime) * 100;
      this.$refs.progressBar.style.width = k + '%';
    }
  },
  methods: {
    ...mapActions([
      'setPlayState',
      'setPlayMode',
      'setCurIndex',
      'setCurTime',
      'setLikeSongs'
    ]),
    speedPlay(e) {
      let distance = this.$refs.progress.offsetLeft;
      let target = e.pageX - distance;
      let curTime = (target / this.$refs.progress.offsetWidth) * this.totalTime;
      this.audio.currentTime = curTime;
      this.setCurTime(curTime);
    },
    changePlayMode() {
      this.index = ++this.index % this.modes.length;
      this.setPlayMode(this.modes[this.index]);
    },
    prev() {
      this.setCurIndex(this.curIndex - 1);
    },
    next() {
      this.setCurIndex(this.curIndex + 1);
    },
    addLike() {
      if (!this.isLiked) {
        // 若是已经喜欢了该歌曲，再次点击则取消喜欢
        let i = this.likeSongs.findIndex(item => {
          return item.id === this.curSong.id;
        });
        if (i === -1) {//避免重复添加同一首歌曲
          this.setLikeSongs({
            songs: [this.curSong],
            liked: true
          });
        }
      } else {
        this.setLikeSongs({
          songs: [this.curSong],
          liked: false
        });
      }
      this.isLiked = !this.isLiked;
    }
  }
};
</script>
<style lang="scss" scoped>
.plaryer-progress {
  height: 150px;
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  color: #f5f5f5;
  .top {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .progress {
      margin: 0 20px;
      width: 100%;
      background: #fff;
      height: 10px;
      border-radius: 10px;
      .progress-bar {
        width: 0%;
        background: #ccc;
        height: 10px;
        border-radius: 10px;
        position: relative;
        .progress-btn {
          position: absolute;
          left: 100%;
          width: 20px;
          height: 20px;
          transform: translate3d(-50%, -25%, 0);
          border-radius: 50%;
          background: #fff;
        }
      }
    }
  }
  .bottom {
    width: 90%;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    i {
      @include font_size($font_icon_size1);
      color: rgba(255, 255, 255, 0.45);
    }
    .play-btn i {
      color: rgba(255, 255, 255, 0.65);
      @include font_size($font_icon_size4);
    }
    .like i.iconxihuan2 {
      color: rgb(207, 69, 19);
    }
  }
}
</style>
