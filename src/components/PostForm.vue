<template>
  <!-- Only show the form if the user is logged in (isUserLoggedIn is true) -->
  <div v-if="isUserLoggedIn">
  </div>
</template>


<script>
import { defineProps, ref } from 'vue';
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

    const props = defineProps(['isUserLoggedIn']);

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