<template>
  <div class="card mb-3">
    <img :src="ad.banner" class="card-img-top" alt="Ad Banner">
    <div class="card-body">
      <h5 class="card-title">{{ ad.title }}</h5>
      <p class="card-text">{{ ad.body }}</p>
      <a :href="ad.linkUrl" class="btn btn-primary" target="_blank">Learn More</a>
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
.ad-img {
  max-height: 200px;
  object-fit: contain;

}
</style>
