<template>
  <div class="account">
    <AccountHeader :isActive="isActive" @switchList="switchList" />
    <AccountBottom @clearAllList="clearAllList" :songsData="songsData" />
  </div>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader';
import AccountBottom from '../components/Account/AccountBottom';
import { mapGetters } from 'vuex';
import { removeLocalStorage } from '../tool/index';
import { mapActions } from 'vuex';
export default {
  components: {
    AccountHeader,
    AccountBottom
  },
  data() {
    return {
      isActive: true,
      songsData: [],
      //0 代表我的喜欢  1代表播放历史
      switchNum: 0
    };
  },
  computed: {
    ...mapGetters(['historySongs', 'likeSongs'])
  },
  methods: {
    ...mapActions(['setLikeSongs', 'setHistorySongs']),
    clearAllList() {
      if (this.switchNum === 0) {
        this.$dialog({
          message: '确定清空喜欢列表？',
          type: 'confirm'
        }).then(
          val => {
            if (val) {
              removeLocalStorage('likedList');
              this.setLikeSongs({ empty: true });
              this.songsData = [];
            }
          },
          err => {
          }
        );
      }
      if (this.switchNum === 1) {
        this.$dialog({
          message: '确定清空播放历史？',
          type: 'confirm'
        }).then(
          val => {
            if (val) {
              this.setHistorySongs({ empty: true });
              removeLocalStorage('historyList');
              this.songsData = [];
            }
          },
          err => {
          }
        );
      }
    },
    switchList(num) {
      this.switchNum = num;
      if (this.switchNum === 0) {
        this.isActive = true;
        this.songsData = this.likeSongs;
      } else if (this.switchNum === 1) {
        this.isActive = false;
        this.songsData = this.historySongs;
      }
    }
  },
  created() {
    this.songsData = this.likeSongs;
  }
};
</script>

<style lang="scss" scoped>
.account {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_color_sub_theme();
  z-index: 9;
}
</style>
