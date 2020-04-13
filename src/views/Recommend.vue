<template>
  <div class="recommend">
    <div class="remd-wrap">
      <ScrollView ref="scrollView">
        <div>
          <Banner :banners="banners" />
          <Personalize :remd_songs="remd_songs" title="推荐歌单" type="personalize" />
          <newest-song :newestSongs="newestSongs" />
        </div>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import Banner from '../components/Recommend/Banner';
import Personalize from '../components/Recommend/Personalize';
import NewestSong from '../components/Recommend/NewestSong';
import ScrollView from '../components/ScrollView';

import { getBanner, getRemdSongList, getNewestSong } from '../api/index';
export default {
  name: 'Recommend',
  components: {
    Banner,
    Personalize,
    NewestSong,
    ScrollView
  },
  data() {
    return {
      banners: [],
      remd_songs: [],
      newestSongs: []
    };
  },
  created() {
    getBanner()
      .then(data => {
        this.banners = data.banners;
      })
      getRemdSongList()
        .then(data => {
          this.remd_songs = data.result;
        })
      getNewestSong()
        .then(data => {
          data.result.forEach((item, index) => {
            let resObj = {};
            resObj.id = item.id;
            resObj.name = item.name;
            resObj.albumName = item.song.album.name;
            resObj.picUrl = item.picUrl;
            resObj.alias = item.song.alias;
            let singer = '';
            item.song.artists.forEach((s, i) => {
              singer += s.name;
              // 列出主要三位歌手
              if (i === 3) return;
            });
            resObj.singer = singer;
            this.newestSongs.push(resObj);
          });
        })
  }
};
</script>

<style scpoed lang="scss">
.recommend {
  position: fixed;
  top: 180px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_color_sub_theme();
  z-index: 0;
  .remd-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
