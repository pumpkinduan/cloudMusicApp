<template>
  <div class="accountBottom">
    <ScrollView>
      <SongItem :songsData="songsData">
        <h3 class="title">
          <i
            @click="playAllMusic"
            class="iconfont iconbofanganniu1"
          ></i>
          <div class="playlists-size">
            播放全部
            <span>(共{{songsData.length}}首)</span>
          </div>
        </h3>
      </SongItem>
    </ScrollView>
  </div>
</template>

<script>
import SongItem from '../SongItem';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import ScrollView from '../ScrollView';
export default {
  components: {
    SongItem,
    ScrollView
  },
  data() {
    return {
      play: false
    };
  },
  props: {
    songsData: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'curIndex'])
  },
  methods: {
    ...mapActions([
      'setFSPlayer',
      'getSongLyric',
      'setPlayState',
      'setCurIndex'
    ]),
    // 播放歌单内的所有歌曲
    playAllMusic() {
      if (this.songsData.length === 0) return
      this.setCurIndex(0); //重置索引为0，从第0首开始播放
      this.setPlayState(true);
      let ids = this.songsData.map(item => {
        return item.id;
      });
      this.setFSPlayer(true);
      //从缓存中直接提取数据，获取歌单内的所有歌曲信息，而不用通过Auction进行数据请求
      this.$store.commit('GET_SONG_DETAIL', this.songsData);
      // this.getSongDetail(ids);
      // 默认播放第0首
      this.setCurIndex(0);
      //获取当前播放歌曲的歌词
      this.getSongLyric(ids[this.curIndex]);
    }
  }
};
</script>

<style scoped lang="scss">
.accountBottom {
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_color_sub_theme();
  .title {
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
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
}
</style>
