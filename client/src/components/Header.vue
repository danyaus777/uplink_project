<template>
    <div class="header">
      <div class="header__container">
        <router-link to="/"><img src="../assets/img/logo.png" alt="Logo" class="header__logo"></router-link>
        <div class="buttons">
          <router-link to="/login" v-if="!user"><button class="btn btn__logout">Войти</button></router-link>
          <a href="/"><button class="btn btn__logout" v-if="user" @click="logout">Выйти</button></a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: [
      'user'
  ],
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  },
  name: "Header"
}
</script>

<style scoped>
@import url(../assets/css/Header.css);
</style>