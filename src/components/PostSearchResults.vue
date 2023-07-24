<template>
  <h2 class="mb-3">Page {{ page }} of {{ totalPages }}</h2>
  <div class="d-flex justify-content-between">

    <button :disabled="page <= 1" class="btn btn-primary" @click="getNewPageOfPosts(page - 1)">Previous
      Page</button>
    <button :disabled="page == totalPages" class="btn btn-primary" @click="getNewPageOfPosts(page + 1)">Next
      Page</button>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';

export default {
  setup() {
    return {
      page: computed(() => AppState.page),
      totalPages: computed(() => AppState.totalPages),
      async getNewPageOfPosts(pageNumber) {
        try {
          const query = AppState.query

          if (!query) {
            await postsService.getNewPageOfPosts(pageNumber);
          }

          else {
            await postsService.getPostsByQueryWithPageNumber(query, pageNumber)
          }


        }
        catch (error) {
          Pop.error(error);
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>
