<template>
  <div class="main">
    <section class="vh-100 bg-image">
      <div class="mask d-flex align-items-center h-50 gradient-custom-3">
        <div class="container h-50">
          <div
            class="row d-flex justify-content-center align-items-center h-100"
          >
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">
                    Connectez-vous!
                  </h2>

                  <form @submit.prevent>
                    <div class="form-floating mb-3">
                      <input
                        v-model="user.email"
                        type="email"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput">Adresse mail</label>
                    </div>

                    <div class="form-floating mb-3 d-flex">
                      <input
                        v-if="showPassword"
                        type="text"
                        class="input form-control"
                        v-model="user.password"
                        id="floatingPassword"
                        placeholder="Password"
                      />
                      <input
                        v-else
                        type="password"
                        class="input form-control"
                        v-model="user.password"
                        id="floatingPassword"
                        placeholder="Password"
                      />
                      <label for="floatingPassword">Mot de passe</label>
                      <button class="buttonEye" @click="toggleShow">
                        <span class="icon is-small is-right">
                          <i
                            class="fas"
                            :class="{
                              'fa-eye-slash': showPassword,
                              'fa-eye': !showPassword,
                            }"
                          ></i>
                        </span>
                      </button>
                    </div>

                    <div
                      class="form-check d-flex justify-content-left mb-5 mt-3"
                    >
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3cg"
                      />
                      <label class="form-check-label" for="form2Example3g">
                        Se souvenir de moi
                      </label>
                    </div>
                    <AlertComp v-if="msg.show" :msgtext="msgtext" :msg="msg" />
                    <div class="d-grid gap-2">
                      <button
                      @click="logIn()"
                        type="submit"
                        class="
                          btn btn-primary btn-block btn-lg
                          gradient-custom-4
                          text-body
                        "
                      >
                        Se connecter
                      </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Pas de compte?
                      <router-link to="/signup" class="fw-bold text-body"
                        ><u>Rejoignez-nous!</u></router-link
                      >
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <comp-loading></comp-loading>
  </div>
</template>

<script>
import axios from "axios";
import AlertComp from "../components/utils/AlertComp.vue";
import CompLoading from "../components/CompLoading.vue";
export default {
  components: { AlertComp, CompLoading },
  name: "Login",
  data() {
    return {
      msg: {
        show: false,
        class: "",
      },
      msgtext: "",
      user: {
        password: "",
        email: "",
      },

      showPassword: false,
      password: null,
    };
  },

  computed: {
    buttonLabel() {
      return this.showPassword ? "Hide" : "Show";
    },
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    logIn() {
      axios
        .post("http://localhost:3000/api/auth/login", this.user)
        .then((res) => {
          if (res.status == 200) {
            this.$router.push("/");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
          }
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 403") {
            this.msgtext = "Le mot de passe est incorrecte";
            this.msg.show = true;
            this.msg.class = "alert-danger";
          } else {
            this.msgtext = "Vous n'êtes pas encore inscrit!";
            this.msg.show = true;
            this.msg.class = "alert-danger";
          }
        });
    },
  },
};
</script>

<style scoped>
.buttonEye {
  border: none;
  background-color: transparent;
  position: absolute;
  right: 2%;
  top: 30%;
}
</style>