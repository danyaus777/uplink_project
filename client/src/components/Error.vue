<template>
  <div class="wrong_login">
    {{error}}
  </div>
</template>

<script>
export default {
  name: "Error",
  props:[
      'error'
  ]
}
</script>

<style scoped>

</style>