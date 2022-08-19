<script>
import axios from "axios";

import Avatar from "./utils/Avatar.vue";
const {
  getTimeAgo,
  capitalizeFirstLetter,
} = require("../components/utils/timediffs");

export default {
  name: "Comments",
  components: { Avatar },
  props: {
    comment: {
      type: Object,
    },
    publicationId: {
      type: String,
      required: true,
    },
    commentUserId: {
      type: String,
      required: true,
    },
  },

  data() {
    let userDataComment = {
      firstName: "",
      lastName: "",
    };
    this.findIdComment();
    return {
      getTimeAgo,
      capitalizeFirstLetter,
      userDataComment,
    };
  },
  methods: {
    defaultImage() {
      this.userDataComment.picture =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    },

    deleteComment() {
      const idUser = this.comment.userId;
      const dateComment = this.comment.date;

      this.$store.dispatch("deleteComment", {
        idUser,
        dateComment,
        publicationId: this.publicationId,
        idComment: this.comment.idComment,
        commentUserId: this.commentUserId,
      });
    },

    findIdComment() {
      axios
        .post("http://localhost:3000/api/auth/getuserid", {
          id: this.comment.userId,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.user.picture === "") {
              res.data.user.picture =
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
            }

            this.userDataComment = res.data.user;
          }
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    },
  },
  computed: {
    isOwner() {
      if (this.commentUserId === this.$store.state.user._id) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
 
<template>
  <div class="d-flex gap-1">
    <avatar :scrImage="userDataComment.picture" @error="defaultImage()">
    </avatar>
    <div class="d-flex flex-column ms-2 comment-text p-1 ps-3">
      <p>
        <strong>
          {{ `${userDataComment.firstName} ${userDataComment.lastName}` }}
        </strong>
      </p>
      <p>{{ comment.newComment }}</p>
      <small class="text-muted comment-time">{{
        capitalizeFirstLetter(getTimeAgo(comment.date))
      }}</small>

      <button v-if="isOwner || this.$store.state.user.admin" class="btn-delete">
        <i
          @click="deleteComment"
          class="fa-solid fa-trash-can icones_actions"
        ></i>
      </button>
    </div>
  </div>
</template>
 
<style scoped>
.comment-text {
  width: 100%;
  border-radius: 15px;
  background-color: #f8f9fa;
}

.comment-text p {
  margin-bottom: 0;
}

.comment-text p:nth-child(1) {
  font-weight: 500;
}

.card-body > .d-flex {
  margin-bottom: 20px;
}

.comment-time {
  right: 4vw;
  margin-top: 10px;
  font-size: 12px;
}

.btn-delete {
  display: none;
  position: absolute;
  right: 34px;
  border-radius: 20%;
  width: 5%;

  z-index: 0;
  border: none;
  color: rgb(82, 80, 80);
  background-color: transparent;

  cursor: pointer;
  margin-top: 20px;
}

.btn-delete:hover {
  border: transparent !important;
  color: rgb(223, 35, 35);
}

.comment-text:hover .btn-delete {
  display: block;
}
</style>
 



