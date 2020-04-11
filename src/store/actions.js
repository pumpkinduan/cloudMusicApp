import {
  SET_FS_PLAYER,
  SET_MINI_PLAYER,
  SET_LIST_PLAYER,
  SET_PlAY_STATE,
  SET_PLAY_MODE,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_CUR_INDEX,
  SET_CUR_TIME,
  SET_TOTAL_TIME,
  SET_Like_SONGS,
  SET_HISTORY_SONGS
} from "./mutation-type";
import {
  checkSongUrl,
  getSongDetails,
  getSongLyrics,
  getSongUrl
} from "../api/index";
export default {
  setFSPlayer({ commit }, bool) {
    commit("SET_FS_PLAYER", bool);
  },
  setMiniPlayer({ commit }, bool) {
    commit("SET_MINI_PLAYER", bool);
  },
  setListPlayer({ commit }, bool) {
    commit("SET_LIST_PLAYER", bool);
  },
  setPlayState({ commit }, bool) {
    commit("SET_PlAY_STATE", bool);
  },
  setPlayMode({ commit }, mode) {
    commit("SET_PLAY_MODE", mode);
  },
  async setSongDetail({ commit }, ids = []) {
    let result = await getSongDetails(ids.join(","));
    let urls = await getSongUrl(ids.join(","));
    let data = [];
    result.songs.forEach((item, index) => {
      let info = {};
      info.id = item.id;
      info.name = item.name;
      info.picUrl = item.al.picUrl;
      info.alias = item.alia;
      // 由于返回的urls不是按照我们给出的id顺序来排列的，所以需要自行作处理
      urls.data.forEach((value, index) => {
        if (value.id === item.id) {
          info.url = value.url;
          return;
        }
      });
      item.ar.forEach((val, index) => {
        if (index === 0) {
          info.singer = val.name;
        } else {
          info.singer += " / " + val.name;
        }
      });
      checkSongUrl(item.id).then(
        suc => {
          info.allowed = suc;
          data.push(info);
        },
        err => {
          info.allowed = err;
          data.push(info);
        }
      );
    });
    commit("SET_SONG_DETAIL", data);
  },
  async setSongLyric({ commit }, id) {
    let lyric = await getSongLyrics(id);
    let handledlyric = lyric.nolyric
      ? { text: "没有歌词噢, 好好享受纯音乐吧", nolyric: true }
      : parseLyric(lyric.lrc.lyric);
    commit("SET_SONG_LYRIC", handledlyric);
  },
  delSong({ commit }, index) {
    commit("DEL_SONG", index);
  },
  setCurIndex({ commit }, index) {
    commit("SET_CUR_INDEX", index);
  },
  setCurTime({ commit }, time) {
    commit("SET_CUR_TIME", time);
  },
  setTotalTime({ commit }, time) {
    commit("SET_TOTAL_TIME", time);
  },
  setLikeSongs({ commit }, { flag, songs, empty }) {
    commit("SET_Like_SONGS", { flag, songs, empty });
  },
  setHistorySongs({ commit }, { songs, empty }) {
    commit("SET_HISTORY_SONGS", { songs, empty });
  }
};
//格式化歌词
function parseLyric(lyrics) {
  let arr = lyrics.split("\n");
  let obj = {};
  // "[01:05.520] 作曲 : 赵登凯", "[00:01.000] 作词 : 高铭谦",
  let reg1 = /\[\d*:\d*\.\d*]/g; // [00:00.000]
  let reg2 = /\[\d*/i; // 提取分钟 [01
  let reg3 = /\d*(?=\.)/i; // 提取秒 05
  arr.forEach(value => {
    let timeStr = value.match(reg1);
    if (!timeStr) return;
    timeStr = timeStr[0];
    let minute = timeStr.match(reg2)[0].substr(1);
    let second = timeStr.match(reg3)[0];
    let totalSec = minute * 60 + Math.floor(second);
    let text = value.replace(reg1, "").trim();
    obj[totalSec] = text;
  });
  return obj;
}
