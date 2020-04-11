<template>
  <div class="song_list">
    <slot></slot>
    <div class="wrap_song" v-if="songsData.length > 0">
      <div
        class="song_item"
        @click="playMusic(item.id, index)"
        v-for="(item, index) in songsData"
        :key="item.id"
      >
        <img v-if="item.picUrl" width="150px" class="border-radius" v-lazy="item.picUrl" alt />
        <i
          v-else
          class="iconfont iconbofanganniu1"
        ></i>
        <div class="song_intro">
          <p class="song_title">
            {{item.name}}
            {{item.alias[0]}}
          </p>
          <p class="song_from">
            {{item.singer}} -
            {{item.albumName}}
          </p>
        </div>
      </div>
      <div class="song_item"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  props: {
    songsData: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'curSong', 'songs'])
  },
  methods: {
    ...mapActions([
      'setFSPlayer',
      'getSongDetail',
      'getSongLyric',
      'setPlayState',
      'setCurIndex'
    ]),
    playMusic(id, index) {
      if (this.curSong.id !== id) {
        // 获取歌词相关信息，保存到store中
        this.getSongDetail([id]);
        this.getSongLyric(id);
      }
      this.setFSPlayer(true);
      //点击歌曲就播放
      this.setPlayState(true);
      //设置播放索引为0, 因为第0首为将要播放的歌曲
      this.setCurIndex(0);
    }
  }
};
</script>

<style scoped lang="scss">
.song_list {
  position: relative;
  z-index: 1;
  h2.title {
    color: #444;
    padding: 20px 8px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      display: inline-block;
      width: 4px;
      height: 36px;
      background-color: $theme_bright;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      left: 0;
    }
  }
  .wrap_song {
    .song_item {
      padding: 20px 15px;
      border-bottom: rgb(206, 195, 195) 1px solid;
      i {
        @include font_color();
        @include font_size($font_icon_size1);
      }
      &:last-child {
        border: none;
        padding-bottom: 60%;
        position: relative;
        &::before {
          content: '主人，没有更多了噢 !';
          color: #777;
          @include font_size($font_medium_s);
        }
      }
      display: flex;
      align-items: center;
      .song_intro {
        width: 80%;
        margin-left: 8px;
        .song_title {
          width: 100%;
          @include no-wrap();
          @include font_size($font_large);
        }
        .song_from {
          width: 100%;
          @include no-wrap();
          margin-top: 5px;
          color: #888;
          @include font_size($font_medium_s);
        }
      }
    }
  }
}
</style>
