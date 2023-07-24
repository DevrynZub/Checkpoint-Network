<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-4">
        <h1>Search</h1>
        <form @submit.prevent="getPostsByQuery()">
          <label for="searchBar">Search Posts</label>
          <input v-model="editable.query" id="searchBar" type="text" required minlength="2" class="w-50">
          <button class="btn btn-info" type="submit">
            <i class="mdi mdi-magnify"></i>
          </button>
        </form>
        <div v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
      </div>
      <div class="col-12">
        <PostSearchResults />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import PostSearchResults from '../components/PostSearchResults.vue';

export default {
  setup() {
    const editable = ref({});
    onMounted(() => {
      postsService.clearPosts();
    });
    onUnmounted(() => {
      postsService.clearPosts();
    });
    return {
      editable,
      posts: computed(() => AppState.posts),
      async getPostsByQuery() {
        try {
          logger.log(editable.value);
          const queryObject = editable.value;
          await postsService.getPostsByQuery(queryObject);
        }
        catch (error) {
          Pop.error(error);
        }
      }
    };
  },
  components: { PostSearchResults }
};
</script>

<style lang="scss" scoped></style>
