<script>
import axios from "axios";
import CardComp from "@/components/CardComp.vue";
export default {
  name: "ProfilPage",
  components: {
    CardComp,
  },

  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      icons: [
        {
          id: 1,
          font: "fab fa-facebook",
          link: "",
        },
        {
          id: 2,
          font: "fab fa-twitter",
          link: "",
        },
        {
          id: 3,
          font: "fa fa-phone",
          link: "",
        },
        {
          id: 4,
          font: "fab fa-skype",
          link: "",
        },
      ],
      selectedPhotoProfil: null,
    };
  },
  created() {
    this.$store.dispatch("getUser", this.user);
  },
  methods: {
    defaultImage() {
        this.$store.state.user.picture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
      },

    imageUploadProfil(e) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      //console.log(e.target.files);
      this.selectedPhotoProfil = e.target.files;
      console.log(this.selectedPhotoProfil);
      let formData = new FormData();
      formData.append("userId", userId);
      //formData.append('image', this.selectedPhotoProfil)

      for (let i = 0; i < this.selectedPhotoProfil.length; i++) {
        formData.append("image", this.selectedPhotoProfil[i]);
      }

      axios
        .post(
          `http://localhost:3000/api/post/file/profileImage`,
          formData,
          config
        )

        .then((resp) => {
          this.$store.dispatch("getUser", this.user);
          e.target.value = ""
        });
    },
  },
};
</script>

<template>
  <card-comp cardBody="" class="card card-profile mb-4">
    <div class="card-header" style="background-color: #ffd7d7"></div>
    <div class="card-body text-center">
       <img class="card-profile-img" :src="$store.state.user.picture" @error="defaultImage()" alt="" />
      <h3 class="mb-3">
        {{ `${$store.state.user.firstName} ${$store.state.user.lastName}` }}
      </h3>
      <button class="btn btn-outline-primary btn-sm">S'abonner</button>
      <div class="flex-grow-1 ps-3 socialIcons">
        <ul class="social-links list-inline mb-0 mt-2">
          <li v-for="icono in icons" :key="icono.id" class="list-inline-item">
            <a href="#"><i :class="icono.font"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </card-comp>
  <div class="card-header text-center">
    <label class="form-label fw-bolder" for="customFile">Photo de profil</label>
    <input
      type="file"
      class="form-control btn btn-outline-primary"
      id="customFile"
      @change="imageUploadProfil"
    />
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .card {
    width: 100% !important;
  }
}
.card-profile {
  z-index: 1;
}

.card-header:first-child {
  border-radius: calc(1rem - 1px) calc(1rem - 1px) 0 0;
  background: rgb(255, 215, 215);
  background: linear-gradient(
    132deg,
    rgba(255, 215, 215, 1) 3%,
    rgba(238, 124, 124, 1) 75%
  );
}
.card-header {
  position: relative;
  margin-top: 10px;
  padding: 2rem 2rem;
  border-bottom: none;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%);
  z-index: 2;
}
.card {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}
.bg-gray-100 {
  background-color: #f8f9fa !important;
}
body {
  font-family: "Poppins" !important;
}
.text-primary {
  color: #4650dd !important;
}

h3,
.h3 {
  line-height: 1.2;
}
.text-muted {
  color: #6c757d !important;
}

h3,
.h3 {
  font-size: 1.575rem;
}

a {
  color: #fd2d01 !important;
  text-decoration: underline !important;
  cursor: pointer;
}

.socialIcons {
  margin-top: 20px;
}

.card-profile-img {
  position: relative;
  max-width: 165px;
  height: 145px;
  object-fit: cover;
  margin-top: -6rem;
  margin-bottom: 1rem;
  border: transparent;
  border-radius: 100%;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  z-index: 2;
}
img,
svg {
  vertical-align: middle;
}

.card-profile .card-header {
  height: 9rem;
  background-position: center center;
  background-size: cover;
}

.social-links li:hover {
  transform: scale(1.15);
  transition: ease 0.2s;
}
</style>
