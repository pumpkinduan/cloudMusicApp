<template>
  <div class="song_list_detail">
    <sub-header :title="songList.name" />
    <Description
      :coverImgUrl="songList.coverImgUrl"
      :name="songList.name"
      :tags="songList.tags"
      :nickname="songList.creator && songList.creator.nickname"
      :avatarUrl="songList.creator && songList.creator.avatarUrl"
    />
    <play-list :playlists="songList.tracks" />
  </div>
</template>

<script>
import { getSongListDetail, getAlbum } from '../api/index';
import SubHeader from '../components/SongListDetail/SubHeader';
import Description from '../components/SongListDetail/Description';
import PlayList from '../components/SongListDetail/PlayList';
export default {
  components: {
    SubHeader,
    Description,
    PlayList
  },
  name: 'SongListDetail',
  data() {
    return {
      songList: {}
    };
  },
  created() {
    if (this.$route.params.type == 'personalize') {
      getSongListDetail(this.$route.params.id).then(data => {
        this.songList = data.playlist;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.song_list_detail {
  box-sizing: border-box;
  padding-top: 90px;
  position: fixed;
  @include bg_color_sub_theme();
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 2;
}
</style>
