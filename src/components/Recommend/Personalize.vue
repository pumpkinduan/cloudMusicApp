<template>
  <div class="remd_songs">
    <h2 class="title">{{title}}</h2>
    <ul class="remd_ul">
      <li v-for="item in remd_songs" :key="item.id">
        <router-link :to="{name: 'SongListDetail', params: {id: item.id, type: type}}">
          <div class="remd_img">
            <img class="border-radius" v-lazy="item.picUrl" alt />
          </div>
          <p>{{item.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Personalize',
  props: {
    title: {
      type: String,
      default: () => '',
      required: true
    },
    remd_songs: {
      type: Array,
      required: true,
      default: () => []
    },
    type: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.remd_songs {
  .remd_ul {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      width: 30%;
      padding-bottom: 10px;
      a {
        width: 100%;
        .remd_img {
          position: relative;
          padding-bottom: 100%;
          img {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
          }
        }
        p {
          @include clamp(2);
          @include font_size($font_medium_s);
          padding-top: 10px;
          line-height: 36px;
        }
      }
    }
  }
}
</style>
