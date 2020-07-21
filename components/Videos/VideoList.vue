<template>
  <section class="video-list">
    <VideoPreview
      v-for="video in videos" 
      :key="video.public_id" 
      :public_id="video.public_id" 
      :id="video.public_id"
    />
  </section>
</template>

<script>
import VideoPreview from '@/components/Videos/VideoPreview'

export default {
  components: {
    VideoPreview
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: true
    },
    videos: {
      type: Array,
      required: true
    }
  }
}
</script>


<style scoped>
.video-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>

