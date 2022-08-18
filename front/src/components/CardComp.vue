<template>
  <div class="card" >
  
  <div :class="cardBody">
    <slot></slot>
  </div>
</div>

</template>

<script>
export default {
    name: "CardComp",
    props: ["cardBody"]

}
</script>

<style>

</style>