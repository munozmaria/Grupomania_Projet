<template>
  <div class="container-fluid">
    <NavComp />
    <router-view />
  </div>
</template>

<script>
  import axios from "axios"
  import NavComp from "@/components/NavComp.vue"
  export default {
    components: {
      NavComp,
    },
    created() {
      {

        if (localStorage.getItem("token") === undefined || !localStorage.getItem("token")) {
          this.$router.push("/login")
          this.$store.commit("setUser", null)
        }
        else {
          const token = localStorage.getItem('token')
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
         
          axios.post('http://localhost:3000/api/auth/getuser', {}, config)
            .then(res => {
              console.log(res.status)
            })
            .catch(err => {
              this.$router.push("/login")
              this.$store.commit("setUser", null)
              console.log(err)
            })
        }
      }
    },
  };
</script>

<style>
.form-check-input {
  display: block;
}

.container-fluid {
  font-family: "Lato" !important;
}
</style>



