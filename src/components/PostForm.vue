<template>
  <p>placeholder</p>
</template>


<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { postsService } from '../services/PostsService.js';

export default {
  props: {
    isUserLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  setup() {



    const title = ref('');
    const content = ref('');

    async function handleSubmit() {
      const postData = {
        title: title.value,
        content: content.value,
      };

      try {
        await postsService.createPost(postData);
        resetFormFields();
      } catch (error) {
        Pop.error(error);
      }
    }

    function resetFormFields() {
      title.value = '';
      content.value = '';
    }

    return {
      title,
      content,
      handleSubmit,
    };
  },
};
</script>




<style lang="scss" scoped></style>