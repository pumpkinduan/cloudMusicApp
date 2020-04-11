<template>
  <div class="search">
    <div class="s-box" ref="s_box">
      <i class="iconfont s-icon iconsousuo" @click.stop="searchSuggest"></i>
      <input v-debounce="searchSuggest" v-model="s_words" type="text" placeholder="搜索歌曲、歌手、专辑" />
      <i @click="s_words = ''" class="iconfont s-icon iconshanchu"></i>
    </div>
    <div class="inner-list" v-show="s_words">
      <ScrollView>
        <ul class="s-list" v-if="playlists.length === 0 && sugList.length > 0">
          <li class="s-item s-keyword" @click="searchList(s_words)">搜索{{s_words}}</li>
          <li
            class="s-item"
            @click="searchList(item.keyword)"
            v-for="(item, index) in sugList"
            :key="index"
          >
            <i class="iconfont s-icon iconsousuo"></i>
            <span>{{item.keyword}}</span>
          </li>
        </ul>

        <SongItem v-else :songsData="playlists" />
      </ScrollView>
    </div>
    <div ref="s_hots" class="s-hots" v-show="!s_words">
      <h4>热门搜索</h4>
      <ul class="h-wrap clearfix">
        <li
          @click="searchList(val.first)"
          class="h-item"
          v-for="(val, index) in hotList"
          :key="index"
        >{{val.first}}</li>
      </ul>
    </div>

    <div ref="s_history" class="s-history" v-show="!s_words" v-if="searchHistory.length > 0">
      <div class="clearfix">
        <h4 class="fl">搜索记录 (共{{searchHistory.length}}条)</h4>
        <i class="iconfont s-icon fr iconshanchu1" @click="clearAllHistory"></i>
      </div>
      <ScrollView ref="scrollView">
        <ul class="h-wrap">
          <li
            @click="searchList(val)"
            class="h-item"
            v-for="(val, index) in searchHistory"
            :key="index"
          >
            <i class="iconfont s-icon iconlishijilu"></i>
            <span>{{val}}</span>
            <i @click.stop="delOneHistory(index)" class="iconfont fr s-icon iconshanchu"></i>
          </li>
        </ul>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import {
  checkSongUrl,
  getSearchSuggest,
  getSearchList,
  getHotSearch
} from '../api/index';
import { setLocalStorage, getLocalStorage } from '../tool/index';
import ScrollView from '../components/ScrollView';
import SongItem from '../components/SongItem';
export default {
  components: {
    SongItem,
    ScrollView
  },
  name: 'Search',
  data() {
    return {
      s_words: '',
      sugList: [],
      playlists: [],
      hotList: [],
      searchHistory: []
    };
  },
  watch: {
    hotList() {
      this.$nextTick(() => {
        this.$refs.s_history.style.top =
          this.$refs.s_hots.offsetHeight +
          this.$refs.s_box.offsetHeight +
          40 +
          'px';
      });
    },
    s_words(newVal) {
      this.playlists = [];
      this.sugList = [];
    },
    playlists(newVal) {
      if (this.s_words !== '') {
        this.$nextTick(() => {
          this.$refs.scrollView.refresh();
        });
      }
    },
    searchHistory(newVal) {
      this.$nextTick(() => {
        this.$refs.scrollView.refresh();
      });
      setLocalStorage('searchHistory', this.searchHistory);
    }
  },
  created() {
    this.searchHistory = getLocalStorage('searchHistory') || [];
    getHotSearch().then(
      data => {
        this.hotList = data.result.hots;
      },
      err => {
        // console.log(err);
      }
    );
  },
  methods: {
    delOneHistory(index) {
      this.searchHistory.splice(index, 1);
    },
    clearAllHistory() {
      alert('确定清空所有搜索记录？');
      this.searchHistory = [];
    },
    searchSuggest() {
      if (!this.s_words) return;
      getSearchSuggest(this.s_words).then(
        data => {
          this.sugList = data.result.allMatch;
        },
        err => {
          // console.log(err);
        }
      );
    },
    searchList(keywords) {
      this.s_words = keywords;
      if (!keywords) return;
      // 最多保留15条搜索记录且剔除重复相同记录
      if (!this.searchHistory.includes(keywords)) {
        if (this.searchHistory.length >= 15) {
          this.searchHistory.shift();
        }
        this.searchHistory.push(keywords);
      }
      getSearchList(keywords).then(
        data => {
          data.result.songs.forEach((item, index) => {
            // 检查音乐是否可用
            let resObj = {};
            resObj.id = item.id;
            resObj.name = item.name;
            resObj.albumName = item.album.name;
            resObj.alias = item.alias;
            let singer = '';
            item.artists.forEach((s, i) => {
              singer += s.name;
              // 列出主要三位歌手
              if (i === 3) return;
            });
            resObj.singer = singer;
            checkSongUrl(item.id).then(
              suc => {
                resObj.allowed = suc;
                this.playlists.push(resObj);
              },
              err => {
                resObj.allowed = err;
                this.playlists.push(resObj);
              }
            );
          });
        },
        err => {
          // console.log(err);
        }
      );
    }
  }
};
</script>

<style scoped lang="scss">
.s-icon {
  @include font_color();
  @include font_size($font_large);
  padding: 5px;
}
.search {
  overflow: hidden;
  position: fixed;
  top: 180px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 15px;
  @include bg_color_sub_theme();
  .s-box {
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding: 15px;
    position: relative;
    display: flex;
    align-items: center;
    background: #f4f4f4;
    border-radius: 12px;
    input {
      padding: 0 15px;
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: #f4f4f4;
      outline: none;
    }
  }
  .inner-list {
    height: 100%;
    .s-list {
      border-top: 1px solid #eee;
      padding-top: 22px;
      margin: 0 auto;
      width: 95%;
      box-sizing: border-box;
      .s-item {
        &:last-child {
          padding-bottom: $mini_player_height + 30px;
          border: none;
        }
        .s-from {
          color: #777;
          margin-top: 10px;
          @include font_size($font_medium_s);
        }
        &.s-keyword {
          color: #507daf;
          font-weight: bold;
        }
        padding: 25px 10px;
        border-bottom: 1px solid #eee;
        span {
          margin-left: 12px;
        }
      }
    }
  }
  .s-hots {
    padding-top: 20px;
    h4 {
      margin-bottom: 35px;
    }
    .h-wrap {
      .h-item {
        float: left;
        padding: 12px;
        @include font_size($font_medium);
        color: #444;
        border-radius: 12px;
        margin-right: 12px;
        margin-bottom: 15px;
        border: 1px solid #777;
      }
    }
  }
  .s-history {
    padding: 0 15px;
    position: absolute;
    left: 0;
    right: 0;
    top: 400px;
    bottom: 0;
    overflow: hidden;
    box-sizing: border-box;
    .h-item {
      color: #444;
      border-bottom: 1px solid #e1e1e1;
      padding: 22px 0;
      @include font_size($font_medium);
      &:last-child {
        padding-bottom: $mini_player_height + 25px;
        border: none;
      }
      span {
        margin-left: 19px;
      }
    }
  }
}
</style>
