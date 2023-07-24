<template>
  <div class=" mb-3 ad-card">
    <img :src="ad.banner" class="card-img-top ad-img" alt="Ad Banner">
    <div class="card-body">
      <h5 class="card-title">{{ ad.title }}</h5>
      <p class="card-text">{{ ad.body }}</p>

    </div>
  </div>
</template>
<script>

export default {
  props: {
    ad: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.ad-card {
  max-width: 600px;
  margin: 20px;

}

.ad-img {
  max-height: 200px;
  object-fit: contain;
}
</style>
