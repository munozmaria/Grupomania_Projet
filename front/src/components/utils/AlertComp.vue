<template>
  <div class="alert" :class="msg.class" role="alert">
    {{msgtext}}

</div>
</template>

<script>
export default {
    name: "alertComp",
    props: ["msg", "msgtext"]
}

</script>

<style>

</style>