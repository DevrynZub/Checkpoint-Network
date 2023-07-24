<template>
  <CreatePost :isUserLoggedIn="isUserLoggedIn" />
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-12" v-for="post in posts" :key="post.id">
        <PostCard :post="post" :isUserLoggedIn="isUserLoggedIn" />
      </div>
    </div>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState.js';
import CreatePost from '../components/CreatePost.vue';

export default {

  setup() {
    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    onMounted(() => {
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts),
      isUserLoggedIn: false,
    };
  },
  components: { CreatePost }
}
</script>

<style scoped lang="scss">
.cover-img {
  width: 50%;
  height: auto;
  object-fit: cover;
}
</style>
