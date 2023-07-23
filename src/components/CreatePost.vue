<template>
  <div class="text-center p-2">
    <h1>Create Post</h1>
    <div v-if="isUserLoggedIn">
      <img class="userProfileImg" :src="loggedInUser.picture" :alt="loggedInUser.name" />
      <p>{{ loggedInUser.name }}</p>
    </div>

    <form @submit.prevent="submitForm">
      <div>
        <label for="comment">Comment:</label>
        <textarea id="comment" v-model="comment" rows="4" cols="50" placeholder="Share your updates here!"
          required></textarea>
      </div>
      <div>
        <label class="mdi mdi-movie" for="mediaUrl">Video or Picture URL:</label>
        <input type="text" id="mediaUrl" v-model="mediaUrl" placeholder="Enter the URL for video or picture" />
      </div>
      <div class="p-2">
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { postsService } from '../services/PostsService.js';
import Pop from '../utils/Pop.js';

export default {
  data() {
    return {
      comment: '',
      mediaUrl: '',
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
  props: {
    isUserLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    submitForm() {
      const postData = {
        body: this.comment,
        mediaUrl: this.mediaUrl,
      };

      this.createPost(postData);
    },
    async createPost(postData) {
      try {
        // Call your postsService to create a new post using the postData
        await postsService.createPost(postData);

        // Reset the form fields after successful submission
        this.comment = '';
        this.mediaUrl = '';
      } catch (error) {
        Pop.error(error)
      }
    },
  },
};
</script>

<style></style>
