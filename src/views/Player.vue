<template>
  <div>
    <FullScreenPlayer :audio="audio" />
    <MiniPlayer />
    <ListPlayer ref="listPlayer" />
    <audio :src="curSong.url" autoplay ref="audio"></audio>
  </div>
</template>

<script>
import FullScreenPlayer from '../components/Player/FullScreenPlayer';
import MiniPlayer from '../components/Player/MiniPlayer';
import ListPlayer from '../components/Player/ListPlayer';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import {
  setLocalStorage,
  getLocalStorage,
  createRandomInclusive
} from '../tool/index';
export default {
  components: {
    FullScreenPlayer,
    MiniPlayer,
    ListPlayer
  },
  data() {
    return {
      audio: null
    };
  },
  computed: {
    ...mapGetters([
      'songs',
      'curSong',
      'isPlaying',
      'curIndex',
      'curTime',
      'playMode',
      'historySongs',
      'likeSongs'
    ])
  },
  methods: {
    ...mapActions([
      'setPlayState',
      'setCurIndex',
      'setCurTime',
      'setTotalTime',
      'setSongLyric',
      'setLikeSongs',
      'setHistorySongs'
    ])
  },
  watch: {
    curSong(newVal) {
      if (newVal.id) {
        this.setSongLyric(newVal.id);
      }
    },
    isPlaying(newVal) {
      if (newVal) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    curIndex(newVal) {
      /*
      注意点: 在iOS中系统不会自动加载歌曲, 所以oncanplay不会自动执行
              在PC端和Android端, 系统会自动加载歌曲, 所以oncanplay会自动被执行
      解决方案: 如何监听iOS中Audio的歌曲是否已经准备好了, 通过ondurationchange事件来监听
                ondurationchange事件什么时候执行: 当歌曲加载完成之后执行, 因为只有歌曲加载完成之后才能获取到歌曲的总时长
      * */
      this.$refs.audio.ondurationchange = () => {
        // 切换歌曲时，自动播放该歌曲
        if (this.$refs.audio.paused) {
          this.$refs.audio.play();
        }
        //  切换歌曲时，重新获取总时长
        this.setTotalTime(this.$refs.audio.duration);
        //  切换歌曲时，重新获取当前播放时长
        this.setCurTime(this.$refs.audio.currentTime);
        //  切换歌曲时，重新获取当前播放歌曲的歌词
        this.setSongLyric(this.curSong['id']);
        // 添加歌曲到播放历史列表
        this.setHistorySongs({songs: [this.curSong]});
      };
    },
    likeSongs(newVal) {
      setLocalStorage('likedList', newVal);
    },
    historySongs(newVal) {
      setLocalStorage('historyList', newVal);
    }
  },
  created() {
    let likedList = getLocalStorage('likedList');
    let historyList = getLocalStorage('historyList');
    if (likedList) {
      this.setLikeSongs({ flag: true, songs: likedList });
    }
    if (historyList) {
      this.setHistorySongs({songs: historyList});
    }
  },
  mounted() {
    let audio = (this.audio = this.$refs.audio);
    audio.ontimeupdate = e => {
      this.setCurTime(e.target.currentTime);
    };
    audio.onended = () => {
      this.setPlayState(false);
      if (this.playMode === 'loop' && this.songs.length > 1) {
        this.setCurIndex(this.curIndex + 1);
      } else if (this.playMode === 'single') {
        this.setPlayState(true);
        audio.play();
      } else if (this.playMode === 'random' && this.songs.length > 1) {
        let index = createRandomInclusive(0, this.songs.length - 1);
        this.setCurIndex(index);
      }
    };
  }
};
</script>

<style scoped lang="scss">
</style>
