<template>
  <div class="container-fluid" v-if="profile">
    <div class="row justify-content-center">
      <div class="col-md-8 col-12">
        <div class="card">
          <div class="card-body profileCover">
            <!-- <img :src="profile.coverImg" alt="Cover Image"> -->
          </div>
          <div class=" card-body col-md-10 col-12 profileInfo">
            <div>
              <img class="profileImg" :src="profile.picture" alt="">
            </div>
            <div class="mx-3">
              <h1>{{ profile.name }}</h1>
              <p>Graduated: {{ profile.graduated }}</p>
              <p>Class: {{ profile.class }}</p>
              <p>Bio: {{ profile.bio }}</p>
              <p>Email: {{ profile.email }}</p>
              <a v-if="profile.github" :href="profile.github"><i class="mdi mdi-github fs-1"></i></a>
              <a v-if="profile.linkedin" :href="profile.linkedin"><i class="mdi mdi-linkedin fs-1"></i></a>
              <a v-if="profile.resume" :href="profile.resume"><i class="mdi mdi-file fs-1"></i></a>
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-md-3 col-12" v-for="post in profilePosts" :key="post.id">
            <PostCard :post="post" :isUserLoggedIn="isUserLoggedIn" />
          </div>
        </div>
        <div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';
import { profileService } from '../services/ProfileService.js';
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { adsService } from '../services/AdsService.js';
import { logger } from '../utils/Logger.js';
// import { logger } from '../utils/Logger.js';

export default {
  setup() {
    const route = useRoute();

    // Compute isUserLoggedIn from AppState.user
    const isUserLoggedIn = computed(() => !!AppState.user);

    // Fetch the profile posts using the profileId
    async function getProfilePosts(profileId) {
      try {
        const res = await postsService.getProfilePosts(profileId);
        AppState.posts.push(...res); // Append new profile posts to the existing array
      } catch (error) {
        logger.log(error);
      }
    }

    async function getProfile() {
      try {
        const profileId = route.params.profileId;
        await profileService.getProfile(profileId);
      } catch (error) {
        Pop.error(error.message);
      }
    }

    async function getAds() {
      try {
        const ads = await adsService.getAds();
        AppState.ads = ads;
      } catch (error) {
        Pop.error(error.message);
      }
    }

    onMounted(() => {
      getProfile();
      getProfilePosts(route.params.profileId);
      getAds();
    });

    return {
      profile: computed(() => AppState.activeProfile),
      profilePosts: computed(() => AppState.posts),
      coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),
      ads: computed(() => AppState.ads),
      isUserLoggedIn,
    };
  },
};
</script>


<style lang="scss" scoped>
.profileImg {
  height: 20vh;
  width: 20vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

.profileInfo {
  width: 60%;
  display: flex;
}

.profileCover {
  height: 30vh;
  background-image: v-bind(coverImg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}


#ads-container {
  padding-left: 5px;
}

#ads-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 250px;
  overflow-y: auto;
  margin-top: 65px;
}

#ads-container {
  background-color: black;
  border-left: 1px srgb(2, 2, 2)dd;
  color: white;
}

.card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}
</style>