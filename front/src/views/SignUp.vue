<template>
  <div class="main">
    <section class="vh-100">
      <div class="mask d-flex align-items-center h-50 gradient-custom-3">
        <div class="container h-50">
          <div
            class="row d-flex justify-content-center align-items-center h-100"
          >
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Inscription</h2>

                  <form @submit.prevent="validateForm">
                    <div class="form-floating mb-3">
                      <input
                        type="texte"
                        class="form-control"
                        id="name-input"
                        placeholder="name"
                        v-model="userData.firstName"
                        @focus="this.errorNo.delete(0)"
                      />
                      <label for="name-input">Prénom</label>
                      <alert-comp
                        v-if="errorNo.has(0)"
                        :msg="msg"
                        :msgtext="errorValArray[0]"
                        :class="msg.class"
                      ></alert-comp>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="texte"
                        class="form-control"
                        id="input-prenom"
                        placeholder="name"
                        v-model="userData.lastName"
                        @focus="this.errorNo.delete(1)"
                      />
                      <label for="input-prenom">Nom</label>
                      <alert-comp
                        v-if="errorNo.has(1)"
                        :msg="msg"
                        :msgtext="errorValArray[1]"
                        :class="msg.class"
                      ></alert-comp>
                    </div>

                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        class="form-control"
                        id="email-input"
                        placeholder="name@example.com"
                        v-model="userData.email"
                        @focus="
                          this.errorNo.delete(2),
                            this.errorNo.delete(7),
                            (this.inscritError = false)
                        "
                      />
                      <label for="email-input">Adresse mail</label>
                      <alert-comp
                        v-if="errorNo.has(2)"
                        :msg="msg"
                        :msgtext="errorValArray[2]"
                        :class="msg.class"
                      ></alert-comp>
                    </div>
                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        class="form-control"
                        id="input-password"
                        placeholder="Password"
                        v-model="userData.password"
                        @focus="this.errorNo.delete(3)"
                      />
                      <label for="input-password">Mot de passe</label>
                      <alert-comp
                        v-if="errorNo.has(3)"
                        :msg="msg"
                        :msgtext="errorValArray[3]"
                        :class="msg.class"
                      ></alert-comp>
                    </div>

                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        class="form-control"
                        id="confirm-pass"
                        placeholder="Password"
                        v-model="userData.confPass"
                        @focus="this.errorNo.delete(4)"
                      />
                      <label for="confirm-pass">Confirmer mot de passe</label>
                      <alert-comp
                        v-if="errorNo.has(4)"
                        :msg="msg"
                        :msgtext="errorValArray[4]"
                        :class="msg.class"
                      ></alert-comp>
                      <alert-comp
                        v-if="errorNo.has(6)"
                        :msg="msg"
                        :msgtext="errorValArray[6]"
                        :class="msg.class"
                      ></alert-comp>
                    </div>

                    <div
                      class="form-check d-flex justify-content-center mb-5 mt-5"
                    >
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        id="accept-input"
                        v-model="conditionsAccept"
                        @focus="this.errorNo.delete(5)"
                      />
                      <label
                        class="form-check-label"
                        @focus="this.errorNo.delete(5)"
                        for="accept-input"
                      >
                        J'accepte toutes les déclarations dans les
                        <a href="#!" class="text-body"
                          ><u>conditions d'utilisation</u></a
                        >
                      </label>
                    </div>
                    <alert-comp
                      v-if="errorNo.has(5)"
                      :msg="msg"
                      :msgtext="errorValArray[5]"
                      :class="msg.class"
                    ></alert-comp>
                    <alert-comp
                      v-if="inscritError"
                      :msg="true"
                      :msgtext="errorValArray[7]"
                      class="alert-danger"
                    ></alert-comp>

                    <div class="d-grid gap-2">
                      <button
                        type="submit"
                        class="
                          btn btn-primary btn-block btn-lg
                          gradient-custom-4
                          text-body
                        "
                      >
                        S'inscrire
                      </button>
                    </div>

                    <p class="text-center text-muted mt-5 mb-0">
                      Dejà inscrit?
                      <router-link to="/login" class="fw-bold text-body"
                        ><u>Connectez-vous!</u></router-link
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
    <CompLoading />
  </div>
</template>
 
 
<script>
  import axios from "axios"
  import CompLoading from "../components/CompLoading.vue"
  import AlertComp from "../components/utils/AlertComp.vue"
  export default {
    components: { CompLoading, AlertComp },
    name: "SignUp",
    data() {
      return {
        userData: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confPass: "",
        },
        msg: {
          value: "",
          class: "",
        },
        msgtext: "",
        conditionsAccept: false,
        errorValArray: [
          "Veuillez entrer un prénom.",
          "Veuillez entrer un nom.",
          "Veuillez entrer une adresse email.",
          "Veuillez entrer un mot de passe.",
          "Veuillez confirmer le mot de passe.",
          "Acceptez les conditions d'utilisation",
          "Les mots de passe ne correspondent pas",
          "Vous etes deja inscrit"
        ],
        errorNo: new Set(),
        inscritError: false
      }
    },
    methods: {
      validateForm() {
        // falta nombre
        if (this.userData.firstName === "") {
          this.errorNo.add(0)
          this.msg.class = this.msg.class = "alert-danger"
          this.msg.value = this.errorValArray[0]
          // falta apellido
        }
        if (this.userData.lastName === "") {
          this.errorNo.add(1)
          this.msg.class = this.msg.class = "alert-danger"
          this.msg.value = this.errorValArray[1]
          // falta e-mail
        }
        if (this.userData.email === "") {
          this.errorNo.add(2)
          this.msg.class = this.msg.class = "alert-danger"
          this.msg.value = this.errorValArray[2]
          // password vacío
        }
        if (this.userData.password === "") {
          this.errorNo.add(3)
          this.msg.class = this.msg.class = "alert-danger"
          this.msg.value = this.errorValArray[3]
          // confirmer pass vacío
        }
        if (this.userData.confPass === "") {
          this.errorNo.add(4)
          this.msg.class = this.msg.class = "alert-danger"
          this.msg.value = this.errorValArray[4]
          // aceptas las condiciones de usuario
        }
        if (this.conditionsAccept === false) {
          this.errorNo.add(5)
          this.msg.class = this.msg.class = "alert-danger"
          this.msg.value = this.errorValArray[5]
        }
        if (this.userData.password != this.userData.confPass) {
          this.errorNo.add(6)
          this.msg.class = this.msg.class = "alert-danger"
          this.msg.value = this.errorValArray[6]
        } else {
          this.errorNo.delete(6)
        }

        if (this.errorNo.size == 0) {
          this.signUp()
        }

      },
      signUp() {
        axios
          .post("http://localhost:3000/api/auth/signup", this.userData)
          .then((res) => {
            if (res.status == 201) {
              localStorage.setItem("token", res.data.token)
              this.$router.push("/login")
            }
          })
          .catch((err) => {

            if (err.message === "Request failed with status code 409") {
              this.errorNo.add(7)
              this.msg.class = this.msg.class = "alert-danger"
              this.msg.value = this.errorValArray[7]
              this.inscritError = true
              console.log("error !!! ")

            }
          })
      },
    },
  };
</script>
 
<style scoped>
.alert-danger {
  background-color: #f8d7da38;
}
</style>

