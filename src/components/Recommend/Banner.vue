<template>
  <swiper class="banner" :options="swiperOptions" v-if="banners.length > 0">
    <swiper-slide class="banner-item" v-for="item in banners" :key="item.bannerId">
      <img class="border-radius" :src="item.pic" alt width="93%" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  name: 'Banner',
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        autoplay: {
          delay: 3000, //切换间隔时间
          stopOnLastSlide: false, //播放到最后一张时，自动切换
          disableOnInteraction: false //用户操作swiper时, 不禁止autoplay
        },
        loop: false,
        speed: 200,
        pagination: {
          el: '.swiper-pagination',
          clickable: true //点击切换
        }
      }
    };
  }
};
</script>

<style lang="scss">
.banner {
  padding-top: 15px;
}
.banner-item {
  text-align: center;
}
.banner .swiper-pagination .swiper-pagination-bullet {
  background: #fff;
  width: 16px;
  height: 16px;
  opacity: .8;
}
.banner .swiper-pagination .swiper-pagination-bullet-active {
  @include bg_color_theme();
}
</style>
