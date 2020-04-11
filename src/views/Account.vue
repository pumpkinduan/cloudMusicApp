<template>
  <div class="account">
    <AccountHeader :isActive="isActive" @switchList="switchList" />
    <AccountBottom :songsData="songsData" />
  </div>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader';
import AccountBottom from '../components/Account/AccountBottom';
import { mapGetters } from 'vuex';
export default {
  components: {
    AccountHeader,
    AccountBottom
  },
  data() {
    return {
      isActive: true,
      songsData: []
    };
  },
  computed: {
    ...mapGetters(['historySongs', 'likeSongs'])
  },
  methods: {
    switchList(flag) {
      this.isActive = flag;
      if (this.isActive) {
        this.songsData = this.likeSongs;
      } else {
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
