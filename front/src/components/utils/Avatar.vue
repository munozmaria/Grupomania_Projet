<script>
export default {
  name: "Avatar",
  props: {
    scrImage: { type: String },
  },
};
</script>

<template>
  <img :src="scrImage" class="rounded-circle shadow-4" alt="Avatar" />
</template>

<style scoped>
img {
  width: 30px;
  height: 30px;
}
</style>