<template>
  <div class="main">
    <div class="main__container">
      <UserMenu :user="user"/>
      <div class="lenta-block">
        <div class="lenta-menu">
          <button class="lenta-menu__item">Новое</button>
          <button class="lenta-menu__item">Избранное</button>
          <button class="btn-add_post"><img src="../assets/img/add_post.svg" alt="add_post"></button>
        </div>
        <div class="posts-block">
          <div class="post">
            <div class="post-info">
              <img src="../assets/img/creator-post_photo.png" alt="creator-post_photo" class="creator-avatar">
              <div class="creator-name">Андрей Гордеев</div>
              <div class="create-date">Сегодня</div>
              <div class="right-block">
                <button class="add_favorite"><img src="../assets/img/add_favorite.svg" alt="add_favorite"></button>
                <div class="comments_count">
                  <button class="comments_count_logo"><img src="../assets/img/comments_count.svg" alt="comments_count"></button>
                  <p class="count">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import UserMenu from "@/components/UserMenu";
export default {
  props: [
      'user'
  ],
  components:{
    Header,
    UserMenu
  }
}
</script>

<style scoped>
  .main__container{
    display: flex;
    align-items: flex-start;
  }
  .lenta-block{
    margin-left: 30px;
    width: 1130px;
  }
  .lenta-menu{
    display: flex;
    align-items: center;
    width: 100%;
    height: 70px;
    margin-top: 30px;
    background: #F7F7F5;
    box-shadow: 0px 4px 55px rgba(33, 33, 33, 0.15);
    border-radius: 20px;
  }
  .lenta-menu__item{
    padding-left: 19px;
    padding-right: 19px;
    height: 30px;
    background: #F7F7F5;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    color: #000000;
    border-radius: 10px;
    margin-left: 30px;
  }
  .lenta-menu__item:hover{
    cursor: pointer;
  }
  .lenta-menu__item:focus{
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  .btn-add_post{
    margin-left: auto;
    margin-right: 20px;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }
  .btn-add_post:hover{
    cursor: pointer;
  }
  .posts-block{
    width: 100%;
    height: 10px;
    margin-top: 20px;
  }
  .post{
    width: 100%;
    height: 388px;
    background: #F7F7F5;
    box-shadow: 0px 4px 55px rgba(33, 33, 33, 0.15);
    border-radius: 20px;
    padding-top: 20px;
    padding-left: 40px;
    padding-right: 20px;
  }
  .post-info{
    display: flex;
    align-items: center;
  }
  .creator-name{
    margin-left: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    color: #000000;
  }
  .create-date{
    margin-left: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 100%;
    color: rgba(0, 0, 0, 0.5);
  }
  .right-block{
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  button{
    background: none;
  }
  button:hover{
    cursor: pointer;
  }
  .comments_count{
    margin-left: 10px;
    display: flex;
  }
  .count{
    margin-left: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
  }
</style>