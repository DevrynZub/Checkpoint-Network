<template>
  <div class="card mb-2 elevation text-center">
    <div class="d-flex align-items-center justify-content-around p-2">
      <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
        <img class="img-fluid profilePicture" :src="post.creator.picture" :alt="post.creator.name"
          :title="post.creator.name">
      </router-link>
    </div>
    <h2>{{ post.creator.name }}</h2>
    <p>{{ post.body }}</p>
    <p>Created: {{ post.getFormattedCreatedAt() }}</p>
    <div class="post-card-footer m-1 ps-1 fs-5">
      <button v-if="!isLikedByUser" @click="likePost">💗</button>
      <button v-else @click="unlikePost">💔</button>
      <span class="m-3">{{ post.likes.length }} {{ post.likes.length === 1 ? 'Like' : 'Likes' }}</span>
    </div>
    <template v-if="post.hasPicture()">
      <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
        <img class="cover-img img-fluid" :src="post.picture" alt="Post Image" />
      </router-link>
    </template>
    <template v-else>
      <router-link :to="{ name: 'Profile', params: { profileId: post.creatorId } }">
        <img class="cover-img img-fluid" :src="post.creator.coverImg" alt="Profile Cover Image" />
      </router-link>
    </template>
    <button v-if="isUserPostCreator" @click="deletePost()" title="Delete this post" type="button">
      <i class="mdi mdi-delete"></i>
    </button>
  </div>
</template>





<script>
import { computed } from 'vue';
import { postsService } from '../services/PostsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';

export default {
  props: {
    post: { type: Object, required: true },
    isUserLoggedIn: { type: Boolean, required: true },
    loggedInUserId: String,
  },

  setup(props) {
    const isUserPostCreator = computed(() => {
      return AppState.user?.id === props.post.creatorId;
    });

    const isLikedByUser = computed(() => {
      return props.isUserLoggedIn && props.post.likeIds.includes(props.loggedInUserId);
    });

    const likesCount = computed(() => {
      return props.post.likes.length;
    });

    async function deletePost() {
      try {
        const wantsToDeletePost = await Pop.confirm(`Are you sure you want to delete your ${props.post.body}`);
        if (!wantsToDeletePost) {
          return;
        }
        const postId = props.post.id;
        logger.log(postId);
        await postsService.deletePost(postId);
      } catch (error) {
        Pop.error('[YOU CANT DELETE THIS, THIS NOT YOUR POST]', error.message);
      }
    }

    async function likePost() {
      try {
        await postsService.likePost(props.post.id);
        isLikedByUser.value = true;
      } catch (error) {
        logger.error('Failed to like the post:', error);
      }
    }

    async function unlikePost() {
      try {
        await postsService.unlikePost(props.post.id);
        isLikedByUser.value = false;
      } catch (error) {
        logger.error('Failed to unlike the post:', error);
      }
    }

    return {
      isLikedByUser,
      deletePost,
      likesCount,
      likePost,
      unlikePost,
      isUserPostCreator,
    };
  },
};
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