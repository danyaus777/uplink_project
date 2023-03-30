<template>
    <Header :user="user"/>
    <router-view :user="user"/>
    <Footer/>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";

export default {
  data() {
    return {
      user: null
    }
  },
  async created() {
    if(localStorage.getItem('token')){
    const response = await axios.get('auth/user');
    console.log(response)
    this.user = response.data
    }
  },
  components:{
    Header,
    Footer
  }
}
</script>

<style>
@import url(./assets/css/reset.css);
@import url(./assets/css/App.css);
</style>
