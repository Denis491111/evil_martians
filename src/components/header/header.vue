<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__inner-left">
          <router-link to="/" class="header__inner-left-link">
            <img src="/favicon.svg" alt="Evil Martians Authentication Test Page" class="header__inner-left-link-pic">
          </router-link>
        </div>
        <div class="header__inner-right">
          <EMButton @click="openPopup" v-if="!user">Login</EMButton>
          <div class="header__inner-right-user" v-else>
            <span class="header__inner-right-user-initials">{{user.initials}}</span>
            <span class="header__inner-right-user-name">{{user.name}}</span>
            <button class="header__inner-right-user-exit" @click="logout" title="Logout"></button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style src="./header.css"></style>
<script lang="ts" src="./header.ts"></script>
