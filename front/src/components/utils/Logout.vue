<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btnIcon btn btn-primary my-1"
      data-bs-toggle="modal"
      data-bs-target="#logOutModal"
    >
      <i class="fa fa-sign-out" aria-hidden="true"></i>
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="logOutModal"
      tabindex="-1"
      aria-labelledby="logOutModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Déconnexion</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            Souhaitez-vous vraiment vous déconnecter?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-deconnexionAnnuler"
              data-bs-dismiss="modal"
            >
              Annuler
            </button>
            <button
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-primary btn-deconnexion"
              @click="logOut"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
  export default {
    name: "logout",
    methods: {
      logOut() {
        this.$router.go("/login")
        this.$store.commit("setUser", null)
        localStorage.clear()
        this.$store.commit("setUser", null)
      }
    }

  }
</script>

<style scoped>
.btnIcon {
  width: 5%;
  top: 15px;
  position: absolute;
  right: 0;
  color:brown;
}
a {
  color: rgb(77, 76, 76);
  text-decoration: none;
}

a:hover {
  color: rgb(29, 27, 27);
}

.btn-deconnexion {
  width: 35%;
    margin-right: 20px;
  color:brown;
  
}

.btn-deconnexionAnnuler {
  width: 35%;
    margin-right: 20px;
}

.modal-body,
.modal-title {
  color: black;
}

@media (max-width: 992px) {
  .btnIcon {
    position: initial;
    min-width: 3rem;
    top: 10px;
  };

}
</style>