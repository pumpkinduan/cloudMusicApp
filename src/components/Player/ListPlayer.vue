<template>
  <transition @enter="enter" @leave="leave" :css="false">
    <div class="list-player" @click.self="hidden" v-show="showListPlayer">
      <div class="inner" ref="inner">
        <div class="top-control">
          <div class="left" @click="changePlayMode">
            <i
              :class="{'iconfont': true,  'iconxunhuanbofang': playMode === 'loop', 'icondanquxunhuan': playMode === 'single', 'iconsuijibofang': playMode === 'random'}"
            ></i>
            <span v-if="songs.length > 0">({{songs.length}}首)</span>
          </div>
          <div class="right" @click="clearSongList">
            <i class="iconfont iconshanchu1"></i>
          </div>
        </div>
        <div style="height: 100%;">
          <ScrollView ref="scrollView">
            <ul>
              <li v-for="(item, index) in songs" :key="index" @click="playMS(index, item.id)">
                <div class="left" @click.stop="setPlayState(!isPlaying)">
                  <i
                    :class="['iconfont', curIndex === index ? (isPlaying ? 'iconzanting_huaban':'iconbofanganniu1'): '']"
                  ></i>
                  <span>{{item.name}}</span>
                </div>
                <div class="right" @click.stop="clearOneSong(index)">
                  <i class="iconfont iconshanchu"></i>
                </div>
              </li>
              <li></li>
            </ul>
          </ScrollView>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import ScrollView from '../ScrollView';
import Velocity from 'velocity-animate';
import 'velocity-animate/velocity.ui';
export default {
  components: {
    ScrollView
  },
  data() {
    return {
      modes: ['loop', 'single', 'random'],
      index: 0
    };
  },
  computed: {
    ...mapGetters([
      'showListPlayer',
      'isPlaying',
      'playMode',
      'songs',
      'curIndex',
      'curSong'
    ])
  },
  watch: {
    // 默认下， 列表播放器的display为none，所以即使数据更新了，scrollView重新计算了滚动范围，也无效
    // 必须等到列表播放器在页面中显示后在重新计算
    showListPlayer(newVal) {
      if (newVal) {
        this.$refs.scrollView.refresh();
      }
    }
  },
  methods: {
    enter(el, done) {
      Velocity(el, 'transition.slideUpBigIn', { duration: 300 }, function() {
        done();
      });
    },
    leave(el, done) {
      Velocity(el, 'transition.slideDownBigOut', { duration: 300 }, function() {
        done();
      });
    },
    ...mapActions([
      'setListPlayer',
      'setPlayState',
      'setPlayMode',
      'delSong',
      'setCurIndex',
      'getSongLyric'
    ]),
    changePlayMode() {
      this.index = ++this.index % this.modes.length;
      this.setPlayMode(this.modes[this.index]);
    },
    hidden(e) {
      this.setListPlayer(false);
    },
    clearOneSong(index) {
      this.delSong(index);
    },
    clearSongList() {
      this.delSong();
    },
    playMS(index, id) {
      this.setCurIndex(index);
      this.setPlayState(true);
      this.getSongLyric(id);
    }
  }
};
</script>

<style scoped lang="scss">
.list-player {
  width: 100%;
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  z-index: 99;
  @include font_color();
  background: rgba(0, 0, 0, 0.24);
  @include font_size($font_large);
  .inner {
    height: 600px;
    overflow: hidden;
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    .top-control {
      padding: 15px 20px;
      border-bottom: 1px solid #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #fff;
      position: relative;
      z-index: 999;
      .left {
        display: inline-flex;
        align-items: center;
        span {
          margin-left: 10px;
          color: #555;
        }
      }
    }
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        .left {
          display: inline-flex;
          align-items: center;
         flex: 1;
          span {
            margin-left: 20px;
            color: #433;
          }
        }
        &:last-child {
          border: none;
          padding-bottom: 55%;
          position: relative;
          left: 2%;
          &::before {
            content: '主人，没有更多了噢 !';
            color: #999;
            @include font_size($font_medium_s);
          }
        }
      }
    }
    i {
      @include font_size($font_icon_size2);
    }
  }
}
</style>
