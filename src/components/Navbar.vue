<template>
  <nav class="navbar navbar-expand-lg px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <p class="mt-3">Wishful MySpace</p>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto ">
        <li>
          <router-link :to="{ name: 'Search' }" class="btn btn-dark text-dark lighten-30 selectable text-uppercase m-3">
            Search
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Account' }" class="btn btn-dark text-dark lighten-30 selectable text-uppercase m-3">
            Account
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import Login from './Login.vue';
export default {
  data() {
    return {
      searchQuery: ''
    }
  },

  methods: {
    performSearch() {
      if (this.searchQuery.trim() !== '') {
        this.$router.push({ name: 'search', params: { query: this.searchQuery } });
        this.searchQuery = '';
      }
    },
  },

  setup() {
    return {}
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
