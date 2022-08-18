<script>
  import axios from "axios"
  export default {
    name: "PublicationForm",
    props: {
      userPost: {
        type: Object,
        require: true,
      }
    },

    data() {
      return {
        user: {
          token: "",
        },
        newPost: {
          content: "",
        },
        selectedImage: null,
      }
    },
    created() {
      this.$store.dispatch("getUser", this.user)


    },

    methods: {

      defaultImage(){
        this.$store.state.user.picture = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
      },
      imageUpload(e) {
        console.log("subo fotito")
        this.selectedImage = e.target.files
      },

      createPost() {
        if ([null, undefined, ""].includes(localStorage.getItem("token"))) {
          this.$router.push("/login")
        } else {
          if (!this.selectedImage && this.newPost.content == "") {
            return

          }
          //const formData = new FormData()
          const token = localStorage.getItem("token")
          const userId = localStorage.getItem("userId")
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",

            },
          }
          const userNamePost = `${this.userPost.firstName} ${this.userPost.lastName}`

          let formData = new FormData()

          formData.append("userNamePost", userNamePost)
          formData.append("userId", userId)
          formData.append("content", this.newPost.content)

          if (!this.selectedImage) {
            this.selectedImage = {}
          } else {

            for (let i = 0; i < this.selectedImage.length; i++) {
              formData.append('fileItems', this.selectedImage[i])


            }
          }

          //console.log(this.selectedImage)


          //https://masteringjs.io/tutorials/axios/post-headers
          //axios post the first parameter is the URL, the 2nd parameter is the request body, and the 3rd parameter is the options
          axios
            .post("http://localhost:3000/api/post", formData, config)
            .then((res) => {
              console.log(res.status)
              this.$store.commit("addPost", res.data.message)
              this.newPost.content = ""
              this.selectedImage = null
            })
            .catch((err) => {
              console.log("err:", err)
            })
        }
      },
    },
  };
</script>

<template>
  <div class="image-comments mt-5 bg-white">
    <div v-if="$store.state.user" class="d-flex" id="boutonPublication">
      <img :src="$store.state.user.picture" @error = "defaultImage()" alt="" />
      <div
        class="d-flex flex-column flex-grow-1 justify-content-center me-3 ms-3"
      >
        <div class="form-floating mt-4">
          <input
            contenteditable="true"
            class="form-control py-3"
            v-model="newPost.content"
          />
        </div>

        <div class="btn-group buttonOption">
          <label for="file-input" class="photoBtn btn mt-1">
            <i class="fa-solid fa-images"></i>
            <span class="ms-2 fw-bolder">Photo/Video</span>
          </label>
          <input
            type="file"
            id="file-input"
            @change="imageUpload"
            name="image"
            multiple
          />

          <button
            @click="createPost"
            type="button"
            class="publierBtn btn mt-1 ms-1 fw-bolder"
          >
            Publier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
@media (max-width: 480px) {
  #boutonPublication {
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
  }

  #boutonPublication img {
    border-radius: 1rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  #boutonPublication .newBtn {
    padding: 20px 80px 20px 80px !important;
  }
}

input {
  display: none;
}
.image-comments {
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
}

.fa-images {
  color: #fd2d01;
}

.image-comments img {
  width: 150px;
  border-radius: 1rem 0 0 1rem;
  object-fit: cover;
}

.photoBtn,
.publierBtn {
  border-radius: 10px !important;
  margin-right: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
}



.buttonOption .btn:hover {
  background: rgb(253, 1, 1);
  background: linear-gradient(
    207deg,
    rgba(253, 1, 1, 1) 3%,
    rgba(255, 215, 215, 1) 61%
  );
  border: transparent !important;
}
</style>