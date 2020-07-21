<template>
    <div class="video-preview">
    <article><div><h1>{{ public_id}}</h1></div></article>
    </div>
</template>

<script>
export default {
  name: 'VideoPreview',
  props: {
    public_id: {
      type: String,
      required: true
    }
  }
}
</script>


<style scoped>
.video-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .video-preview {
    width: 400px;
    margin: 10px;
  }
}

/* .video-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.video-content {
  padding: 10px;
  text-align: center;
}
*/
a:hover .video-content,
a:active .video-content {
  background-color: #ccc;
} 
</style>
