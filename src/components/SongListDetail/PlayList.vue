<template>
  <div class="play-list" v-if="playlists.length > 0">
    <ScrollView>
      <ul>
        <li>
          <i @click="playAllMusic" class="iconfont iconbofanganniu1"></i>
          <div class="playlists-size">
            播放全部
            <span>(共{{playlists.length}}首)</span>
          </div>
        </li>
        <li @click="playMusic(item.id, index)" v-for="(item, index) in playlists" :key="item.id">
          <span class="order">{{index + 1}}</span>
          <div class="item">
            <h3>{{item.name}}</h3>
            <p>{{item.ar[0].name}} - {{item.al.name}}</p>
          </div>
        </li>
      </ul>
    </ScrollView>
  </div>
</template>

<script>
import ScrollView from '../ScrollView';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  name: 'PlayList',
  components: {
    ScrollView
  },
  props: {
    playlists: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'curIndex', 'songs'])
  },
  methods: {
    ...mapActions([
      'setFSPlayer',
      'setSongDetail',
      'setSongLyric',
      'setPlayState',
      'setCurIndex'
    ]),
    playMusic(id, index) {
      this.setSongDetail([id]);
      this.setSongLyric(id);
      this.setFSPlayer(true);
      this.setPlayState(true);
      this.setCurIndex(0);
    },
    // 播放歌单内的所有歌曲
    playAllMusic() {
      if (this.playlists.length === 0) return;
      this.setPlayState(true);
      this.setFSPlayer(true);
      let ids = this.playlists.map(item => {
        return item.id;
      });
      //获取歌单内的所有歌曲信息
      this.setSongDetail(ids);
      // 默认播放第0首
      this.setCurIndex(0);
      //获取当前播放歌曲的歌词
      this.setSongLyric(ids[this.curIndex]);
    }
  }
};
</script>

<style scoped lang="scss">
.play-list {
  height: calc(100% - 360px);
  ul {
    li:first-child {
      @include bg_color_sub_theme();
      padding: 30px 0 10px 18px;
      display: flex;
      align-items: center;
      i {
        margin-right: 10px;
        @include font_size($font_icon_size1);
      }
      span {
        color: #999;
        margin-left: 10px;
      }
    }
    li:not(:first-child) {
      @include bg_color_sub_theme();
      padding: 15px 0;
      padding-left: 10px;
      .order {
        width: 70px;
        padding-left: 8px;
        color: #999;
        @include font_size($font_medium);
      }
      .item {
        box-sizing: border-box;
        vertical-align: middle;
        display: inline-block;
        width: 80%;
        h3 {
          @include no-wrap();
          @include font_size($font_large);
          color: #333;
        }
        p {
          @include font_size($font_small);
          color: #777;
          margin-top: 10px;
          @include clamp();
        }
      }
    }
    li:last-child {
      // 避免迷你播放器遮挡最后一首歌曲列表目，所以预留部分空间出来
      border: none;
      padding-bottom: $mini_player_height + 40px;
      position: relative;
      &::before {
        position: absolute;
        bottom: $mini_player_height - 20px;
        left: 20px;
        content: '主人，没有更多了噢 !';
        color: #999;
        @include font_size($font_medium_s);
      }
    }
  }
}
</style>
