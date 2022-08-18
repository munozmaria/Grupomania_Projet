<template>
  <div class="container-circle">
      <div class="circle">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  
  
</template>

<script>
export default {
  name: "CompLoading",
};
</script>

<style>
.container-circle {
  width: 1500px;
  height: 1500px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
}
.circle {
  width: 800px;
  height: 800px;
  border: 3px solid #ffd7d7;
  border-radius: 50%;
  animation: anim 6s infinite;
  transform-style: preserve-3d;
  perspective: 1500px;
}
@keyframes anim {
  100% {
    transform: rotateY(360deg) rotateZ(360deg);
  }
}
.circle > div {
  width: 800px;
  height: 800px;
  border: 5px solid #ffd7d7;
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.circle > div:nth-child(1) {
  transform: rotateY(36deg);
}
.circle > div:nth-child(2) {
  transform: rotateY(72deg);
}
.circle > div:nth-child(3) {
  transform: rotateY(108deg);
}
.circle > div:nth-child(4) {
  transform: rotateY(144deg);
}


@media (max-width: 992px) { 
  .container-circle {

    width: 400px;
    height: 400px;
  }

.circle {
  margin-top: 400px;
  width: 650px;
  height: 650px;
}

.circle > div {
  
  width: 650px;
  height: 650px;
}



.circle > div:nth-child(1) {
  transform: rotateX(36deg);
}
.circle > div:nth-child(2) {
  transform: rotateX(72deg);
}
.circle > div:nth-child(3) {
  transform: rotateX(108deg);
}
.circle > div:nth-child(4) {
  transform: rotateX(144deg);
}
 }

 @media (max-width: 577px) { 
 

.circle {
 display: none;
}


 }

</style>