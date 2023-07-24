<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 col-12">
        <PostSearchResults />
      </div>
      <div class="col-8 text-center">
        <h1>Search</h1>
        <form @submit.prevent="getPostsByQuery()">
          <label class="m-3" for="searchBar">Search Posts</label>
          <input v-model="editable.query" id="searchBar" type="text" required minlength="2" class="w-50">
          <button class="btn btn-info" type="submit">
            <i class="mdi mdi-magnify"></i>
          </button>
        </form>
        <div v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </div>
      </div>
    </div>
    <div class="card col-md-4 col-12" id="ads-container">
      <div v-for="(ad, index) in ads" :key="index">
        <AdCard :ad="ad" />
      </div>
      <div v-for="(ad, index) in ads" :key="index">
        <AdCard :ad="ad" />
      </div>
      <div v-for="(ad, index) in ads" :key="index">
        <AdCard :ad="ad" />
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
import { adsService } from '../services/AdsService.js';

export default {
  setup() {

    async function getAds() {
      try {
        const ads = await adsService.getAds();
        AppState.ads = ads
        // logger.log('[GETTING ADS]', ads);
      } catch (error) {
        Pop.error(error.message);
      }
    }


    const editable = ref({});
    onMounted(() => {
      postsService.clearPosts();
      getAds()
    });
    onUnmounted(() => {
      postsService.clearPosts();
    });
    return {
      editable,
      posts: computed(() => AppState.posts),
      ads: computed(() => AppState.ads),

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

<style lang="scss" scoped>
#ads-container {
  padding-left: 5px;
}

#ads-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  overflow-y: auto;
  margin-top: 65px;
}

#ads-container {
  background-color: black;
  border-left: 1px srgb(2, 2, 2)dd;
  color: white;
}
</style>
