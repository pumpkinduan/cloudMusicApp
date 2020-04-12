<template>
  <div class="rank-wrapper">
    <ScrollView ref="scrollView">
      <div class="rank-inner">
        <section v-for="(group, prop, index) in dataList" :key="index">
          <h2 class="title">{{group.title}}</h2>
          <ul class="offical-list-wrap" v-if="group.title === '官方榜'">
            <li
              @click="$router.push({name: 'Detail', params: {id: item.idx, type: 'rank'}})"
              v-for="(item, index) in group.list"
              :key="index"
            >
              <div class="rank-left">
                <img v-lazy="item.rank.coverImgUrl" alt />
                <span class="update-info">{{item.rank.updateFrequency}}</span>
              </div>
              <div class="rank-right" v-if="item.rank.tracks.length > 0">
                <p
                  v-for="(val, index) in item.rank.tracks"
                  :key="index"
                >{{index+1}}.{{val.first}}-{{val.second}}</p>
              </div>
            </li>
          </ul>
          <ul v-else class="other-list-wrap">
            <li v-for="(val, key) in group.list" :key="key">
              <div
                @click="$router.push({name: 'Detail', params: {id: val.idx, type: 'rank'}})"
                class="rank-top"
              >
                <img v-lazy="val.rank.coverImgUrl" alt />
                <span class="update-info">{{val.rank.updateFrequency}}</span>
              </div>
              <p class="rank-bottom">{{val.rank.name}}</p>
            </li>
          </ul>
        </section>
        <transition>
          <router-view />
        </transition>
      </div>
    </ScrollView>
  </div>
</template>

<script>
import ScrollView from '@/components/ScrollView';
import { getAllRanks } from '@/api/index';
export default {
  name: 'Rank',
  components: {
    ScrollView
  },
  data() {
    return {
      dataList: {}
    };
  },
  created() {
    getAllRanks().then(data => {
      this.dataList = data;
    });
  }
};
</script>

<style scoped lang="scss">
@mixin update_info() {
  @include font_size($font_small);
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: #fff;
  z-index: 2;
}
.rank-wrapper {
  @include bg_color_sub_theme();
  position: fixed;
  top: 180px;
  bottom: 0;
  left:0;
  right: 0;
}
.rank-inner {
  section {
    padding: 0 10px;
    &:last-child {
      padding-bottom: $mini_player_height + 30px;
    }
    .offical-list-wrap {
      li {
        display: flex;
        padding-bottom: 15px;
        justify-items: center;
        .rank-left {
          position: relative;
          .update-info {
            @include update_info();
          }
        }
        .rank-right {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;

          p {
            width: 96%;
            @include no-wrap();
            padding: 15px 0;
          }
        }
        img {
          width: 220px;
          height: 220px;
          border-radius: 15px;
        }
      }
    }
    .other-list-wrap {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 220px;
        margin-bottom: 15px;
        .rank-top {
          position: relative;
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            top: 0;
            right: 0;
            z-index: 0;
            border-radius: 15px;
            background-color: rgba(0, 0, 0, 0.22);
          }
          .update-info {
            @include update_info();
          }
        }
        .rank-bottom {
          margin-top: 15px;
          @include font_size($font_small);
          color: #555;
        }
        img {
          width: 220px;
          height: 220px;
          border-radius: 15px;
        }
      }
    }
  }
}
</style>
