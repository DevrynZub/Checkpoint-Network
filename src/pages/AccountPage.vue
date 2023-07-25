<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-8 card">
        <h1>Update Account Information</h1>
        <form @submit.prevent="updateAccount">
          <label for="name">Name</label>
          <input v-model="formData.name" id="name" type="text" required>

          <label for="picture">Profile Picture URL</label>
          <input v-model="formData.picture" id="picture" type="text" required>

          <label for="bio">Bio</label>
          <textarea v-model="formData.bio" id="bio" rows="4"></textarea>

          <label for="coverImg">Cover Image URL</label>
          <input v-model="formData.coverImg" id="coverImg" type="text" required>

          <label for="github">GitHub URL</label>
          <input v-model="formData.github" id="github" type="text">

          <label for="github">Linkedin URL</label>
          <input v-model="formData.linkedin" id="linkedin" type="text">

          <label for="github">Resume</label>
          <input v-model="formData.Resume" id="resume" type="text">

          <label for="email">Email</label>
          <input v-model="formData.email" id="email" type="email" required>

          <label for="graduated">Graduated</label>
          <input v-model="formData.graduated" id="graduated" type="checkbox">

          <label for="class">Class</label>
          <input v-model="formData.class" id="class" type="text">

          <button @click="updateAccount" type="submit">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, popScopeId, reactive, ref } from 'vue';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const isGraduated = ref(false);

    const isChecked = computed({
      get: () => isGraduated.value,
      set: (newValue) => (isGraduated.value = newValue),
    });

    function convertToBoolean(value) {
      return value === 'true';
    }

    async function updateAccountInfo() {
      try {
        const graduated = convertToBoolean(isChecked.value);

        await updateAccount({ graduated });

      } catch (error) {
        Pop.error(error)
      }
    }


    const formData = reactive({
      name: '',
      picture: '',
      bio: '',
      coverImg: '',
      github: '',
      email: '',
      graduated: '',
      class: '',
    });


    async function updateAccount() {
      try {
        await accountService.updateAccountInfo(formData);
        logger.log('[GETTING ACCOUNT]', formData)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    return {
      formData,
      updateAccount,
      isGraduated,
      isChecked,
      updateAccountInfo,
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.account-form {
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 16px;
  margin-bottom: 10px;
}

input,
textarea {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
