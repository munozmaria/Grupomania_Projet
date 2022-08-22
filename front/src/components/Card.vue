
 <script>
const {
  getTimeAgo,
  capitalizeFirstLetter,
} = require("../components/utils/timediffs");
import axios from "axios";
import Comments from "./Comments.vue";
import Avatar from "@/components/utils/Avatar.vue";
import Carousel from "@/components/utils/Carousel.vue";
export default {
  name: "Card",
  methods: {
    defaultImage() {
      this.userInfo.picture =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    },

    likeClick() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(
          `http://localhost:3000/api/post/${this.publication._id}/like`,
          { userId, like: !this.iLikeIt },
          config
        )
        .then((res) => {
          console.log(res);
          this.iLikeIt = res.data.usersLiked.includes(userId);
          this.totalLikes = res.data.likes;
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },

    deletePost() {
      this.$store.dispatch("deletePost", this.publication);
    },

    addComment() {
      if (this.currentComment === "") {
        this.showComm = false;
      } else {
        const id = this.publication._id;
        const comment = this.currentComment;

        this.$store.dispatch("addComment", { idPost: id, newComment: comment });
        this.currentComment = "";
        this.showComm = false;
      }
    },
    getUserInfo() {
      axios
        .post("http://localhost:3000/api/auth/getuserid", {
          id: this.publication.userId,
        })
        .then((res) => {
          if (res.status == 200) {
            // console.log(res.data.user)
            if (res.data.user.picture === "") {
              res.data.user.picture =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
            }
            this.userInfo = res.data.user;
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    },
    saveNewText() {
      if ([null, undefined, ""].includes(localStorage.getItem("token"))) {
        this.$router.push("/login");
      } else {
        if (this.newText == "") {
          return;
        }
        //const formData = new FormData()
        const token = localStorage.getItem("token");
   
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .put(`http://localhost:3000/api/post/${this.publication._id}/${this.publication.userId}/${this.newText}/userId/${this.$store.state.user._id}`, {}, config)
          .then((res) => {
            console.log( res);
            this.publication.content = res.data.content
            this.modifyText = !this.modifyText
           
          })
          .catch((err) => {
          alert("vous n'êtes pas autorisé à modifier ce post")
					window.location.reload()
          });
      }
    },
    resetText(){
      this.newText = this.publication.content
      this.modifyText = !this.modifyText
    }
  },

  components: { Comments, Avatar, Carousel },
  props: ["publication", "owner"],

  data() {
    this.getUserInfo();
    let totalLikes = this.publication.likes;
    const currentUser = localStorage.getItem("userId");
    let iLikeIt = this.publication.usersLiked.includes(currentUser);
    return {
      modifyText: false,
      getTimeAgo,
      capitalizeFirstLetter,
      currentComment: "",
      iLikeIt,
      totalLikes,
      showComm: false,
      userInfo: {},
      newText: this.publication.content,
    };
  },
};
</script>
<template>
  <div class="card mb-3 mt-3">
    <div class="card-header fw-bolder d-flex align-items-center">
      <avatar
        :src="userInfo.picture"
        class="image_avatar"
        @error="defaultImage()"
      >
      </avatar>

      <div class="nameUser">
        {{ publication.userNamePost }}
      </div>
      <i
        v-if="owner||this.$store.state.user.admin"
        @click="deletePost"
        class="fa-solid fa-xmark icones_actions"
      ></i>
    </div>

    <Carousel
      :imageUrl="publication.imageUrl"
      :idPostImages="publication._id"
    ></Carousel>

    <div class="card-body">
      <div class="d-flex">
        <div class="icones_actions" @click="likeClick">
          <i class="far fa-heart heartempty"></i>
          <i
            class="fas fa-heart heartfull"
            :class="iLikeIt ? 'iLikeIcon' : ''"
          ></i>
        </div>
        <div class="icones_actions ms-2">
          <i
            @click="showComm = !showComm"
            class="far fa-comment commentEmpty"
          ></i>
        </div>
        <div class="icones_actions ms-2">
          <i class="far fa-paper-plane shareIcon"></i>
        </div>
      </div>
      <p
        class="card-text mt-5 fw-bolder"
        :class="totalLikes > 0 ? 'showLikes' : 'hideLikes'"
      >
        {{ totalLikes }} J'aime
      </p>
      <div class="namePublication">
        <div class="user fw-bolder">{{ publication.userNamePost }}</div>
        <div class="newIcon d-flex">




        <p class="card-text ms-2 mt-2 mb-3" v-if="!modifyText">
          {{ publication.content }}
        </p>
        <i
          v-if="owner || this.$store.state.user.admin && !modifyText"
          @click="modifyText = !modifyText"
          class="fas fa-light fa-pencil"
        ></i>

        </div>
        <div v-if="modifyText"  class="d-flex modifyText  ">

          <input v-model="newText" type="text" class="newText ps-3" />
          <i @click="saveNewText" class="fas fa-light fa-floppy-disk"></i>
          <i
            @click="resetText"
            class="fas fa-light fa-rectangle-xmark"
          ></i>
        </div>
        <p class="card-text mb-3">
          <small class="text-muted">{{
            capitalizeFirstLetter(getTimeAgo(publication.date))
          }}</small>
        </p>
      </div>
      <Comments
        v-for="comment in publication.comments"
        :key="comment.id"
        :comment="comment"
        :publicationId="publication._id"
        :commentUserId="comment.userId"
      ></Comments>

      <div v-if="showComm" class="d-flex align-items-center gap-2">
        <avatar :scrImage="this.$store.state.user.picture"> </avatar>
        <input
          type="text"
          class="form-control"
          placeholder="Comments"
          aria-label="comments"
          v-model.trim="currentComment"
        />
        <button
          type="button"
          class="btn text-primary ms-auto"
          @click="addComment"
        >
          Publier
        </button>
      </div>
    </div>
  </div>
</template>
 
<style scoped>
@media (min-width: 1400px) {
  .card {
    max-width: 60% !important;
    min-width: 60% !important;
  }
  

  
}

@media (max-width: 992px) {
  .card {
    width: 100% !important;
  }
  




}

@media (max-width: 768px){
.fa-floppy-disk {
  
  right:13% !important;


}
.fa-rectangle-xmark{
  right:6% !important;
  margin-right: 5px;

}
}

.card-body {
  padding: 2rem 1rem !important;
}
.card {
  border: none;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  border-radius: 1rem;
  width: 80%;
}

.card-header {
  background: none !important;
}

.icones_actions {
  margin-right: 30px;
  cursor: pointer;
}
.heartempty,
.commentEmpty,
.shareIcon {
  font-size: 23px;
  position: absolute;
}
.heartfull {
  font-size: 23px;
  position: absolute;
  color: transparent;
  background: linear-gradient(to top left, #fd2d01, #ffd7d7);
  background-clip: text;
  -webkit-background-clip: text;
  opacity: 0;
  transition: all 200ms;
}
.icones_actions:hover .heartfull,
.icones_actions:hover .commentFull {
  opacity: 1;
  transform: scale(1.3);
}

.iLikeIcon {
  opacity: 1 !important;
}

.commentEmpty:hover {
  color: #fd2d01;
  font-size: 27px;
}

.shareIcon:hover {
  color: #fd2d01;
  font-size: 27px;
}

.text-primary {
  color: #911f03 !important;
  background-color: #ffd7d7;
}

.nameUser {
  width: 100%;
}

.fa-xmark {
  margin-right: 5px;
}

.fa-xmark:hover,
.fa-pencil:hover,
.fa-floppy-disk:hover,
.fa-rectangle-xmark:hover {
  transform: scale(1.3);
  color: #fd2d01;
}

.showLikes {
  visibility: visible;
}

.hideLikes {
  visibility: hidden;
  height: 1px;
}

.image_avatar {
  border-radius: 50%;
  width: 50px;
  height: 45px;
  margin-right: 10px;
}

.fa-pencil {
display: none;
  cursor: pointer;
 

}

.newIcon{
      align-items: center;
    justify-content: space-between;
    margin-right: 10px;
}

.newIcon:hover .fa-pencil {
  display: block;
}

.newText {
  
  width: 105%;
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  border:1px solid #f1c5db;
  border-radius: 15px;
}

.newText:focus{
  outline: 1px solid #f1c5db;
}

input {
  display: block;
}

.fa-floppy-disk {
   position: absolute;
  right: 8%;
  cursor: pointer;
  color: rgb(176, 7, 35);
}

.fa-rectangle-xmark {
  position: absolute;
  right:5%;
  color: rgb(176, 7, 35);
  cursor: pointer;
}

.modifyText{
   align-items: center;
     margin: 10px 2px;
   
}
</style>
 
