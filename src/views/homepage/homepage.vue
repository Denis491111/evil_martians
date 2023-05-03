<template>
  <div class="homepage">
    <div class="container">
      <div class="homepage__inner">
        <div class="homepage__inner-center" v-if="!user">
          <img src="/icon-512.png" alt="Evil Martians Login" class="homepage__inner-center-pic">
          <p class="homepage__inner-center-text">Please, push the Login button</p>
        </div>
        <div class="homepage__inner-center" v-else>
          <img src="@/assets/img/user-authorized.svg" alt="Evil Martians Login" class="homepage__inner-center-pic">
          <p class="homepage__inner-center-text">Welcome, {{user.name}} {{user.surname}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./homepage.ts"></script>
<style src="./homepage.css"></style>
