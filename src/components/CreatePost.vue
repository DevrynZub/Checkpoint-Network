<template>
  <div class="text-center p-2">
    <h1>Create Post</h1>
    <div v-if="isUserLoggedIn">
      <img class="userProfileImg" :src="loggedInUser.picture" :alt="loggedInUser.name" />
      <p>{{ loggedInUser.name }}</p>
    </div>

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
</template>

<script>
import { ref } from 'vue';
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {

  props: {
    isUserLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    // Define comment and postImageUrl using ref
    const comment = ref('');
    const postImageUrl = ref('');
    return {
      comment,
      postImageUrl,
    };
  },
  computed: {
    loggedInUser() {
      // Simulate retrieving the logged-in user data (replace this with your actual logic)
      return this.isUserLoggedIn
        ? {
          name: 'John Doe',
          picture: 'path/to/user_picture.jpg',
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
        Pop.error(error)
      }
    },
  },
}
</script>

<style></style>