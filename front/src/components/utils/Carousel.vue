<script>
export default {
  name: "Carousel",
  props: {
    imageUrl: {
      type: Array,
      default: [],
    },
    idPostImages: {
      type: String,
      default: "0"
    }
  },
};
</script>

<template>
  <div
    :id="'carouselControls' + idPostImages"
    class="carousel slide carousel-item active"
    data-bs-ride="carousel"
    data-bs-interval="false"
  >
    <div class="carousel-indicators">
      <button
        v-for="(imageUrl, index) in imageUrl.length"
        type="button"
        :data-bs-target="'#carouselControls' + idPostImages"
        :data-bs-slide-to="index"
        :class="index == 0 ? ' active' : ''"
        :aria-current="true"
        :aria-label="'Slide' + index"
        :key="index.id"
      ></button>
    </div>
    <div class="carousel-inner">
      <div v-for="(imageUrl,index) in imageUrl"
        :class="'carousel-item' + (index == 0 ? ' active' : '')"
        :key="index.id">
        <img
          :src="imageUrl"
          class="d-block w-100"
          alt="..."
        />
      </div>
      
    </div>
    <button
    v-if="imageUrl.length > 1"
      class="carousel-control-prev"
      type="button"
      :data-bs-target="'#carouselControls' + idPostImages"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      v-if="imageUrl.length > 1"
      type="button"
      :data-bs-target="'#carouselControls' + idPostImages"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style>
.carousel-indicators {
  bottom: -50px !important;
}

.carousel-indicators button {
  border: 1px solid rgb(241, 165, 165) !important;
  border-radius: 5px !important;
  height: 10px !important;
  width: 10px !important;
}

.carousel-indicators button.active {
  background-color:  rgb(176, 7, 35);
}
</style>