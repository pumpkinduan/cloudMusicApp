export default {
  showFSPlayer(state) {
    return state.showFSPlayer;
  },
  showMiniPlayer(state) {
    return state.showMiniPlayer;
  },
  showListPlayer(state) {
    return state.showListPlayer;
  },
  isPlaying(state) {
    return state.isPlaying;
  },
  playMode(state) {
    return state.playMode;
  },
  songs(state) {
    return state.songs;
  },
  curIndex(state) {
    return state.curIndex;
  },
  // 当前点击的歌曲
  curSong(state) {
    let res = {
      name: "",
      singer: "",
      picUrl: "",
      alias: [],
      id: ""
    };
    if (state.songs.length !== 0) {
      res = state.songs[state.curIndex];
    }
    return res;
  },
  curTime(state) {
    return state.curTime;
  },
  totalTime(state) {
    return state.totalTime;
  },
  curLyric(state) {
    return state.curLyric;
  },
  likeSongs(state) {

    return state.likeSongs;
  },
  historySongs(state) {

    return state.historySongs;
  }
};
