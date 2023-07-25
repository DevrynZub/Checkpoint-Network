<template>
  <div class="container-fluid p-2 text-center">
    <div class="row">
      <div class="col-md-8">
        <h1>Create Post</h1>
        <form @submit.prevent="submitForm">
          <div>
            <label for="comment"></label>
            <textarea id="comment" v-model="comment" rows="4" cols="50" placeholder="Share your updates here!"
              required></textarea>
          </div>
          <div>
            <label class="mdi mdi-movie" for="mediaUrl"></label>
            <input type="text" id="mediaUrl" v-model="postImageUrl" placeholder="Picture or Video" />
          </div>
          <div class="p-2">
            <button class="btn btn-success" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { postsService } from '../services/PostsService.js';
// import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';

export default {

  props: {
    isUserLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const comment = ref('');
    const postImageUrl = ref('');
    return {
      comment,
      postImageUrl,
    };
  },
  computed: {
    loggedInUser() {

      return this.isUserLoggedIn
        ? {
          name: '',
          picture: ''
        }
        : null;
    },
  },

  methods: {
    async submitForm() {
      const postData = {
        body: this.comment,
        imgUrl: this.postImageUrl,
      };

      this.createPost(postData);
    },
    async createPost(postData) {
      try {
        await postsService.createPost(postData);
        this.comment = '';
        this.postImageUrl = '';
      } catch (error) {
        logger.log('[Error while creating post]', error);
      }
    },
  },
}
</script>

<style></style>