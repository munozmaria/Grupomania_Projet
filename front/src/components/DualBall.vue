<template>
  <div class="loader-yuhu">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "dualBall",
};
</script>

<style>
.loader-yuhu {

  position: absolute;
  z-index: 2;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
  animation: disparaitre 400ms 2s ease-in-out forwards;
  
  
}

.loader-yuhu div {
  position: absolute;
  width: 48px;
  height: 49px;
  border-radius: 50%;
  top: 11px;
  
  opacity: 0.7;
}

.loader-yuhu div:nth-child(1) {
  background: #fd2d01;
  animation: loading 1s linear infinite;
  animation-delay: -0.5s;
}

.loader-yuhu div:nth-child(2) {
  background: #4e5166;
  animation: loading 1s linear infinite;
  animation-delay: 0s;
}
.loader-yuhu div:nth-child(3) {
  background: #ffd7d7;
  opacity: 0.1;
  animation: loading-o 1s linear infinite;
  animation-delay: 0s;
}

@keyframes loading {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes loading-o {
  0% {
    opacity: 0.1;
    transform: translate(0, 0);
  }
  49.99% {
    opacity: 0.8;
    transform: translate(20px, 0);
  }
  50% {
    opacity: 0;
    transform: translate(20px, 0);
  }

  100% {
    opacity: 0;
    transform: translate(0, 0);
  }
}

@keyframes disparaitre {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    z-index: 0;
  }
}


</style>