<script>
  import DualBall from "@/components/DualBall.vue"
  import Logout from "@/components/utils/Logout.vue"
  import Avatar from "./utils/Avatar.vue"
  export default {
    name: "NavComp",
    components: { DualBall, Logout, Avatar },
    methods: {
      checkLogIn() {
        if (localStorage.getItem("token") === undefined
          || !localStorage.getItem("token")
          || !this.$store.state.user) {
          this.$router.push("/login")
        }
      }
    },
    created() {
      this.checkLogIn()
    }
  }
</script>

<template>
  <div>
      <dualBall class="loadingBall"></dualBall>
    <nav class="navbar navbar-expand-lg navbar-light bg-light text-warning">
      <div class="container-fluid">
        <router-link
          :to="$store.state.user ? '/' : '/login'"
          class="navbar-brand d-flex"
        >
          <img class="image-cropper" src="../assets/ball2.png" />
          <div class="texte_loader">Groupomania</div>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li v-if="$store.state.user" class="nav-item">
              <router-link to="/" class="nav-link active" aria-current="page"
                >Accueil</router-link
              >
            </li>
            <li class="nav-item" v-if="$store.state.user">
              <router-link to="/ProfilePage" class="nav-link profilBtn"
                >Profil</router-link
              >
            </li>
            <li class="nav-item" v-if="!this.$store.state.user">
              <router-link to="/signup" class="nav-link"
                >S'inscrire</router-link
              >
            </li>
            <li class="nav-item" v-if="!this.$store.state.user">
              <router-link to="/login" class="nav-link seConnecter"
                >Se connecter</router-link
              >
            </li>
            <li v-if="$store.state.user" class="nav-item">
              <router-link to="/ProfilePage">
              <img class="avatarcito" :src="this.$store.state.user.picture"  />
              </router-link>
            </li>
            <li v-if="$store.state.user" class="nav-item userAvatarBtn">
              <router-link class="userAvatar" to="/ProfilePage">{{
                `${$store.state.user.firstName} ${$store.state.user.lastName}`
              }}</router-link>
            </li>
          </ul>
          <logout v-if="$store.state.user"></logout>
        </div>
      </div>
    </nav>
  </div>
</template>


<style scoped>


.container-fluid {
  background: white !important;
}

.image-cropper {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.nav-link:hover,
.avatarcito:hover {
  transform: scale(1.15);
  transition: ease 0.2s;
}

.texte_loader {
  position: relative;
  font-weight: bold;
  color: #fd2d01;
  margin-top: 5px;
  font-size: 25px;
  margin-left: 10px;
  font-family: sans-serif;
  animation: flotter 2s ease-in-out both;
}

.userAvatar {
  font-family: Lato;
  position: absolute;
  text-decoration: none;
  right: 4rem;
  margin-top: 7px;
  margin-left: 5px;
  margin-right: 7px;
  border: none;
  background: transparent;

  color: rgb(54, 4, 38);
}

.userAvatar:hover {
  font-weight: bold;
  color: lightcoral;
  transform: scale(1);
  transition: ease 0.2s;
}

.avatarcito {
  position: absolute;
  right: 11rem;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

@media (min-width: 1199px) {
  .userAvatar {
    margin-right: 40px;
  }

  .avatarcito {
    margin-right: 35px;
  }
}

@media (max-width: 992px) {
  .seConnecter {
    margin-bottom: 10px;
  }

  .profilBtn{
     margin-bottom: 10px;
     display: none;
  }
  .userAvatarBtn{
    margin-top: 10px;
  }

  .userAvatar {
    position: initial;
    min-width: 2rem;
    margin-left: 0;
 
  }
  .avatarcito {
    display: none;
  }

  .nav-link:hover,
  .avatarcito:hover {
    transform: none;
    transition: none;
    font-size: 15px;
  }
  ul {
    padding-bottom: 15px;
  }
}


</style>