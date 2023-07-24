<template>
  <CreatePost :isUserLoggedIn="isUserLoggedIn" />
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-12" v-for="post in posts" :key="post.id">
        <PostCard :post="post" :isUserLoggedIn="isUserLoggedIn" />
      </div>
    </div>
    <div class="row" v-for="(ad, index) in ads" :key="index">
      <AdCard :ad="ad" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js'
import { AppState } from '../AppState.js';
import CreatePost from '../components/CreatePost.vue';
import AdCard from '../components/AdCard.vue';
import { adsService } from '../services/AdsService.js';
import { logger } from '../utils/Logger.js';

export default {
  components: { CreatePost, AdCard },

  setup() {

    async function getPosts() {
      try {
        await postsService.getPosts();
      }
      catch (error) {
        Pop.error(error);
      }
    }

    async function getAds() {
      try {
        await adsService.getAds()
        logger.log('[GETTING ADS]', adsService.ads)
      } catch (error) {
        Pop.error(error.message)

      }
    }


    onMounted(() => {
      getPosts();
      getAds();
    });
    return {
      posts: computed(() => AppState.posts),
      isUserLoggedIn: false,
      ads: [],
    };
  },
}
</script>

<style scoped lang="scss">
.cover-img {
  width: 50%;
  height: auto;
  object-fit: cover;
}
</style>
