<template>
  <div class="song_list">
    <SongItem :songsData="newestSongs">
      <h2 class="title">最新音乐</h2>
    </SongItem>
  </div>
</template>

<script>
import SongItem from '../SongItem'
export default {
  components: {
    SongItem
  },
  props: {
    newestSongs: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<style scoped lang="scss">

</style>
