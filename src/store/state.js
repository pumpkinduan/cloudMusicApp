export default {
  showFSPlayer: false, //全屏播放器
  showMiniPlayer: false, //mini播放器
  showListPlayer: false, //列表全屏播放器
  isPlaying: false, //播放状态
  playMode: "loop", //播放模式，默认是循环播放
  songs: [], //播放过的歌曲信息,非歌单中的全部播放歌曲
  curIndex: "", //当前正在播放的歌曲的索引
  curLyric: {}, //当前点击的歌曲的歌词信息
  curTime: "0", //当前歌曲播放的时长
  totalTime: "0", //当前歌曲的总时长 秒为单位
  likeSongs: [], //收集喜欢的歌曲
  historySongs: [] //播放历史歌曲的收集
};
