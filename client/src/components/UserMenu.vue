<template>
  <div class="user-menu">
    <div class="user-block">
      <div class="user-info">
        <img src="../assets/img/user-photo.png" alt="avatar">
        <div v-if="user" class="user-info__name">
          <div class="name">{{user.name}} {{user.surname}}</div>
          <div class="role">{{user.poste}}</div>
        </div>
        <button class="btn__user-settings"><img src="../assets/img/logo_settings.svg" alt="logo_settings"></button>
      </div>
      <div class="user-block__menu">
        <a href="#" class="user-menu__item">
          <img class="menu-logo" src="../assets/img/lenta_logo.svg" alt="lenta_logo">
          <div class="menu-title">Лента</div>
          <div class="pointer-notification">1</div>
        </a>
        <a href="#" class="user-menu__item">
          <img class="menu-logo" src="../assets/img/know_logo.svg" alt="know_logo">
          <div class="menu-title">База знаний</div>
          <div class="pointer-notification">1</div>
        </a>
        <a href="#" class="user-menu__item">
          <img class="menu-logo" src="../assets/img/curses_logo.svg" alt="curses_logo">
          <div class="menu-title">Курсы</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserMenu",
  props: [
    'user'
  ],
}
</script>

<style scoped>
@import url(../assets/css/UserMenu.css);

</style>