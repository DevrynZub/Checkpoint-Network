<template>
  <div class="card mb-2 elevation text-center">
    <div class="d-flex align-items-center justify-content-around p-2">
      <h2><router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
          <img class="img-fluid profilePicture" :src="post.creator.picture" :alt="post.creator.name"
            :title="post.creator.name">
        </router-link> {{ post.creator.name }}</h2>
    </div>
    <p>{{ post.body }}</p>

    <img class="cover-img img-fluid" :src="post.creator.coverImg" alt="">

  </div>
</template>


<script>
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';

export default {

  props: {
    post: { type: Post, required: true }
  },

  setup(props) {
    return {
      setActivePost() {

        postsService.setActivePost(props.post)
      }
    }
  }

}
</script>


<style lang="scss" scoped>
.profilePicture {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>