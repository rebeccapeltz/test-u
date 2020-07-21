<template>
  <div class="home-page">
    <section class="intro">
      <h1>Video</h1>
    </section>

    <!-- <PostList :posts="loadedPosts" /> -->
    <!-- <PostList  /> -->
    <VideoList :videos="upLoadedVideos" />
  </div>
</template>

<script>
import VideoList from '@/components/Videos/VideoList'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    VideoList
  },
  middleware: 'log',
  computed: {
    // ...mapState({
    //   token: state => state.token,
    //   uploadedVideos: state=> state.uploadedVideos
    // }),
    // ...mapGetters({
    //   getUploadedVideos: 'uploadedVideos',
    // }),
    upLoadedVideos() {
      const videoArray = this.$store.getters.getUploadedVideos
      debugger
      const data = [
        {
          public_id: 'gnqerxbalb3n0edwuxtp',
          version: 1595275488,
          format: 'mp4',
          width: 1080,
          height: 1920,
          type: 'upload',
          created_at: '2020-07-20T20:04:48Z',
          tags: ['u-tube']
        }
      ]
      return this.$store.getters.getUploadedVideos || data
    }
  }
}
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 19, 121, 1) 12%,
    rgba(0, 212, 255, 1) 100%
  );
  background-position: center;
  background-size: cover;
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}

.featured-posts {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
