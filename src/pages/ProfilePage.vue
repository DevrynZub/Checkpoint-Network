<template>
  <div class="container-fluid" v-if="profile">
    <div class="row justify-content-center">
      <div class="col-md-10 col-12 profileCover">
        <!-- <img :src="profile.coverImg" alt="Cover Image"> -->
      </div>
      <div class="col-md-10 col-12 profileInfo">
        <div>





          <img class="profileImg" :src="profile.picture" alt="">
        </div>
        <div class="mx-3">
          <h1>{{ profile.name }}</h1>
          <span> Graduated: {{ profile.graduated }}</span>
          <p>Class: {{ profile.class }}</p>
          <p>{{ profile.bio }}</p>
          <a v-if="profile.github" :href="profile.github"><i class="mdi mdi-github fs-1"></i></a>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-3 col-12" v-for="post in profilePosts" :key="post.id">
        <PostCard :post="post" />
      </div>
      <div>
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






export default {

  setup() {
    const route = useRoute();


    async function getProfile() {
      try {
        const profileId = route.params.profileId;
        // logger.log('route', route)
        await profileService.getProfile(profileId);
      }
      catch (error) {
        Pop.error(error.message);
      }
    }
    async function getProfilePosts() {
      try {
        const profileId = route.params.profileId;
        await postsService.getProfilePosts(profileId);
      }
      catch (error) {
        Pop.error(error.message);
      }
    }



    onMounted(() => {
      getProfile();
      getProfilePosts();

    });
    return {
      profile: computed(() => AppState.activeProfile),
      profilePosts: computed(() => AppState.posts),
      coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`),

    };
  },

}

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
</style>