<template>
  <div class="song_list_detail">
    <sub-header :title="songList.name" />
    <Description
      :briefDesc="songList.briefDesc"
      :coverImgUrl="songList.picUrl"
      :name="songList.name"
    />
    <play-list :playlists="songList.tracks" />
  </div>
</template>

<script>
import SubHeader from '@/components/SongListDetail/SubHeader';
import Description from '@/components/SongListDetail/Description';
import PlayList from '@/components/SongListDetail/PlayList';
import { getArtists, getRankDetail } from '@/api/index';
export default {
  name: 'Detail',
  components: {
    SubHeader,
    Description,
    PlayList
  },
  data() {
    return {
      songList: {}
    };
  },
  created() {
    if (this.$route.params.type == 'rank') {
      getRankDetail(this.$route.params.id).then(data => {
        let obj = {};
        obj.tracks = data.playlist.tracks;
        obj.picUrl = data.playlist.coverImgUrl;
        obj.briefDesc = data.playlist.description;
        obj.name = data.playlist.name;
        this.songList = obj;
      });
    } else {
      if (this.$route.params.type == 'singer') {
        getArtists(this.$route.params.id).then(data => {
          let obj = {};
          obj.tracks = data.hotSongs;
          obj.picUrl = data.artist.picUrl;
          obj.name = data.artist.name;
          obj.briefDesc = data.artist.briefDesc;
          this.songList = obj;
        });
      }
    }
  },
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
  bottom: 0;
  z-index: 2;
}
</style>
