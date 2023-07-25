<template>
  <CreatePost :isUserLoggedIn="isUserLoggedIn" />
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 col-12">
        <div v-for="post in posts" :key="post.id">
          <PostCard :post="post" :isUserLoggedIn="isUserLoggedIn" />
        </div>
      </div>

      <div class="col-md-4 col-12">
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

export default {
  components: { CreatePost, AdCard },


  setup() {
    const isUserLoggedIn = computed(() => !!AppState.user);

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
        const ads = await adsService.getAds();
        AppState.ads = ads
        // logger.log('[GETTING ADS]', ads);
      } catch (error) {
        Pop.error(error.message);
      }
    }


    onMounted(() => {
      getPosts();
      getAds();
    });
    return {
      posts: computed(() => AppState.posts),
      isUserLoggedIn,
      ads: computed(() => AppState.ads),

    };
  },
}

</script>

<style scoped lang="scss">
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
