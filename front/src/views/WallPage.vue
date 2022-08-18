<script>
import axios from "axios";
import Card from "@/components/Card.vue";
import PublicationForm from "@/components/PublicationForm.vue";
export default {
  name: "WallPage",
  components: { Card, PublicationForm },
  created() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getUser");
  },
  methods: {
    
    
    async imageUpload(formData) {
     this.$store.commit('imageUpload', formData)
    },
  },
};
</script>
<template>
  <div class="container-sm">
    <PublicationForm 
    v-on:image-upload = "imageUpload"
    :user-post="$store.state.user"
    
    ></PublicationForm>

    <div v-if="this.$store.state.user" class="d-flex flex-column align-items-center mt-5">
      <Card
       :owner="post.userId === $store.state.user._id ? true : false "
        v-for="post in $store.state.posts.slice().reverse()"
        :key="post"
        :publication="post"
      ></Card>
    </div>
  </div>
</template>



<style>
</style>
