<template>
  <div v-if="post" class="card mb-2 elevation text-center">
    <div class="d-flex align-items-center justify-content-around p-2">
      <h2><router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
          <img class="img-fluid profilePicture" :src="post.creator.picture" :alt="post.creator.name"
            :title="post.creator.name">
        </router-link> {{ post.creator.name }}</h2>
    </div>
    <p>{{ post.body }}</p>
    <p>Created: {{ post.getFormattedCreatedAt() }}</p>
    <img class="cover-img img-fluid" :src="post.creator.coverImg" alt="">

    <button @click="deletePost()" title="Delete this post" type="button">
      <i class="mdi mdi-delete"></i>
    </button>

  </div>
</template>


<script>

import { computed } from 'vue';
import { Post } from '../models/Post.js';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {

  props: {
    post: { type: Post, required: true },
  },


  setup(props) {

    return {

      account: computed(() => AppState.account),

      async deletePost() {
        try {
          const wantsToDeletePost = await Pop.confirm(`Are you sure you want to delete your ${props.post.body}`)
          if (!wantsToDeletePost) {
            return
          }
          const postId = props.post.id
          logger.log(postId)
          await postsService.deletePost(postId)
        } catch (error) {
          Pop.error(error.message)
        }
      },

      setPostToEdit() {
        const postToEdit = props.postProp

        postsService.setPostToEdit(postToEdit)

      },

      setActivePost() {

        postsService.setActivePost(props.post)
      },
    }
  },


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