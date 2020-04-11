<template>
  <div class="wrapper">
    <div class="mask"></div>
    <div class="blur_bg" :style="`background-image: url(${coverImgUrl})`"></div>
    <div class="wrap_head">
      <section class="s-list-header">
        <div class="s_bg">
          <img class="border-radius" :src="coverImgUrl" alt />
        </div>
      </section>
      <section class="s-intro">
        <p>{{name}}</p>
        <p v-if="briefDesc" class="briefDesc">{{briefDesc}}</p>
        <p v-if="avatarUrl && nickname">
          <img :src="avatarUrl" alt />
          <span>{{nickname}}</span>
        </p>
        <p class="tag_wrap" v-if="tags.length > 0">
          <span v-for="(value, index) in tags" :key="index">{{value}}</span>
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    coverImgUrl: {
      type: String,
      required: true,
      default: ''
    },
    tags: {
      type: Array,
      default: () => []
    },
    nickname: {
      type: String,
      default: ''
    },
    avatarUrl: {
      type: String,
      default: ''
    },
    briefDesc: {
      type: String,
      default: ''
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 60px 20px;
  position: relative;
  .blur_bg {
    @include blur_bgc();
  }
  .wrap_head {
    display: flex;
    .s-list-header {
      margin-bottom: 20px;
      margin-right: 15px;
      img {
        width: 200px;
      }
    }
    .s-intro {
      @include font_size($font_medium);
      color: #f4f4f4;
      p {
        margin-top: 5px;
        margin-bottom: 20px;
      }
      .briefDesc {
        color: #f1f1f1;
         @include font_size($font_small);
      }
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 5px;
      }
      span {
        @include font_size($font_small);
        opacity: 0.9;
      }
      .tag_wrap {
        span {
          border-radius: 10px;
          display: inline-block;
          background: #666;
          margin-right: 4px;
          padding: 5px 10px;
        }
      }
    }
  }
}
</style>
