<template>
  <div class="singer">
    <nav ref="nav">
      <div
        @touchstart.prevent="touchstart"
        @touchmove.stop.prevent="touchmove"
        :data-index="index"
        :class="['letter', curIndex === index ? 'active': '']"
        v-for="(val, index) in dataKeys"
        :key="index"
      >{{val}}</div>
    </nav>
    <ScrollView ref="scrollView">
      <ul class="singer-wrap">
        <li
          ref="singer_group"
          class="singer-group"
          v-for="(group, index) in dataLists"
          :key="index"
        >
          <h3 class="title">{{dataKeys[index]}}</h3>
          <section>
            <div class="singer-item" v-for="item in group" :key="item.id">
              <router-link :to="{name: 'Detail', params: {id: item.id, type: 'singer'}}">
                <img v-lazy="item.picUrl" alt />
                <span>{{item.name}}</span>
              </router-link>
            </div>
          </section>
        </li>
      </ul>
    </ScrollView>
    <div ref="fixedTitle" class="fixed-title" v-show="fixedTitle !== ''">{{fixedTitle}}</div>
    <transition appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllCatSingers } from '@/api/index';
import ScrollView from '@/components/ScrollView';
export default {
  name: 'Singer',
  components: {
    ScrollView
  },
  created() {
    getAllCatSingers().then(data => {
      this.dataLists = data.results;
      this.dataKeys = data.letters;
    });
  },
  data() {
    return {
      dataLists: [],
      dataKeys: [],
      curIndex: 0,
      offsetTops: [],
      startOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0
    };
  },
  computed: {
    fixedTitle() {
      //向上滚动时，分组歌手标题不变
      if (this.scrollY >= 0) {
        return '';
      } else {
        return this.dataKeys[this.curIndex];
      }
    }
  },
  mounted() {
    this.$refs.scrollView.scrolling(offsetY => {
      this.scrollY = offsetY; // 小于0向下，大于0向上滚动
      for (let i = 0; i < this.offsetTops.length; i++) {
        if (i === 0) {
          // 处理第一个区域 热门歌手
          this.curIndex = 0;
        } else {
          // 处理中间区域 A B C...
          if (this.offsetTops[i] + offsetY < 10) {
            this.curIndex = i;
          }
        }
      }
    });
  },
  methods: {
    _handlScroll(index) {
      this.curIndex = index;
      this.$refs.scrollView.scrollTo(0, -this.offsetTops[index], 300);
    },
    touchstart(e) {
      this.startPageY = e.touches[0].pageY;
      let index = parseInt(e.target.dataset.index);
      this._handlScroll(index);
    },
    touchmove(e) {
      this.moveOffsetY = parseInt(e.touches[0].pageY);
      if (
        this.moveOffsetY < this.minOffsetY ||
        this.moveOffsetY > this.maxOffsetY
      ) {
        return;
      }

      let distanceY = this.moveOffsetY - this.startOffsetY;
      let index = this.curIndex;
      if (distanceY < 0) {
        index = index < 0 ? 0 : index - 1;
      } else {
        index =
          index > this.dataKeys.length - 1
            ? this.dataKeys.length - 1
            : index + 1;
      }
      if (Math.abs(distanceY) >= e.target.offsetHeight) {
        this._handlScroll(index);
        this.startOffsetY = this.moveOffsetY;
      }
    }
  },
  watch: {
    dataLists(newVal) {
      // 获取每一组歌手距离顶部的距离，用于快捷导航
      this.$nextTick(() => {
        this.minOffsetY = this.$refs.nav.offsetTop + 30;
        this.maxOffsetY = this.minOffsetY + this.$refs.nav.offsetHeight + 30;
        this.$refs.singer_group.forEach(val => {
          this.offsetTops.push(val.offsetTop);
        });
      });
    },
    scrollY(newVal) {
      if (newVal >= 0) {
        return;
      }
      this.$nextTick(() => {
        // 获取吸顶标题的高度
        let fixedTitleH = this.$refs.fixedTitle.offsetHeight;
        // 获取即将成为吸顶标题的top值
        let nextTitleTop = this.offsetTops[this.curIndex + 1];
        let diff = nextTitleTop + newVal;
        let resultY = 0;
        // console.log(diff, fixedTitleH, diff - fixedTitleH);
        if (diff <= fixedTitleH && diff >= 0) {
          resultY = diff - fixedTitleH;
        } else {
          resultY = 0;
        }
        this.$refs.fixedTitle.style = `transform: translateY(${resultY}px);`;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.singer {
  position: fixed;
  top: 180px;
  padding-right: 90px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  @include bg_color_sub_theme();
  .fixed-title {
    position: absolute;
    top: 0;
    right: 100px;
    @include font_size($font_super_large);
    font-weight: bold;
    padding: 20px;
    left: 10px;
    @include bg_color_sub_theme();
    z-index: 0;
    &::before {
      content: '';
      position: absolute;
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      @include bg_color_theme();
      top: 50%;
      transform: translate3d(0, -50%, 0);
      left: 0;
    }
  }
  nav {
    position: fixed;
    top: 15%;
    right: 20px;
    z-index: 0;
    .letter {
      transition: all 0.3s;
      text-align: center;
      padding: 4px 0;
      color: #777;
      @include font_size($font_medium);
      &.active {
        @include font_color();
        @include font_size($font_super_large);
        font-weight: bold;
      }
    }
  }
  .singer-wrap {
    padding: 0 10px;
    .singer-group {
      .title {
        padding: 20px;
        position: relative;
        @include font_size($font_super_large);
        font-weight: bold;
        &::before {
          content: '';
          position: absolute;
          display: inline-block;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          @include bg_color_theme();
          top: 50%;
          transform: translate3d(0, -50%, 0);
          left: 0;
        }
      }
      section {
        .singer-item {
          padding: 15px 0;
          border-bottom: 1px solid #ddd;
          &:last-child {
            border-bottom: none;
          }
          img {
            margin-right: 20px;
            width: 120px;
            vertical-align: middle;
            height: 120px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
