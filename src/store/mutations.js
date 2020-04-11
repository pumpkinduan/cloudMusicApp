import {
  SET_FS_PLAYER,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_PlAY_STATE,
  SET_PLAY_MODE,
  GET_SONG_DETAIL,
  GET_SONG_LYRIC,
  DEL_SONG,
  SET_CUR_INDEX,
  SET_CUR_TIME,
  SET_TOTAL_TIME,
  SET_Like_SONGS,
  SET_HISTORY_SONGS
} from "./mutation-type";
export default {
  // 设置全屏播放器的显示
  [SET_FS_PLAYER](state, bool) {
    state.showFSPlayer = bool;
    if (bool) {
      state.showMiniPlayer = false;
      state.showListPlayer = false;
    }
  },
  [SET_MINI_PLAYER](state, bool) {
    state.showMiniPlayer = bool;
    if (bool) {
      state.showFSPlayer = false;
    }
  },
  [SET_LIST_PLAYER](state, bool) {
    state.showListPlayer = bool;
    if (bool) {
      state.showFSPlayer = false;
    }
  },
  [SET_PlAY_STATE](state, bool) {
    state.isPlaying = bool;
  },
  [SET_PLAY_MODE](state, mode) {
    state.playMode = mode;
  },
  [GET_SONG_DETAIL](state, data) {
    state.songs = data;
  },
  [GET_SONG_LYRIC](state, data) {
    state.curLyric = data;
  },
  [DEL_SONG](state, index) {
    // 当删除正在播放歌曲前面的歌曲时的逻辑
    if (index < state.curIndex) {
      state.curIndex--;
    }
    if (index !== undefined) {
      state.songs.splice(index, 1);
    } else {
      state.songs = [];
    }
    if (state.songs.length === 0) {
      state.showListPlayer = false;
      state.showMiniPlayer = false;
      state.isPlaying = false;
    }
  },
  [SET_CUR_INDEX](state, index) {
    if (index < 0) {
      //播放上一首的界限
      index = state.songs.length - 1;
    } else if (index !== 0) {
      index %= state.songs.length;
    }
    state.isPlaying = true;
    state.curIndex = index;
  },
  [SET_CUR_TIME](state, time) {
    state.curTime = time;
  },
  [SET_TOTAL_TIME](state, time) {
    state.totalTime = time;
  },
  [SET_Like_SONGS](state, { flag, songs }) {
    if (flag) {
      state.likeSongs.push(...songs);
    } else {
      if (songs.length === 0) return;
      let firSong = songs[0]; //点击爱心收藏歌曲时，songs数组只有一首歌曲
      let delIndex = state.likeSongs.findIndex(item => {
        //删除一首喜欢的歌曲
        return item.id === firSong.id;
      });
      if (delIndex !== -1) {
        state.likeSongs.splice(delIndex, 1);
      }
    }
  },
  [SET_HISTORY_SONGS](state, songs) {
    // 播放一首歌曲往历史列表中添加一首，所以songs长度为1
    // 若是从缓存中取出数据，则songs的长度大于1
    if (songs.length > 1) {
      state.historySongs.push(...songs);
      return;
    }
    // 避免重复添加相同歌曲
    let flag = state.historySongs.find(val => {
      return val.id === songs[0].id;
    });
    if (!flag) {
      // 历史列表容量为66，大于则删除一首后进行添加
      if (state.historySongs.length > 66) {
        state.historySongs.splice(0, 1);
      }
      state.historySongs.push(...songs);
    }
  }
};
