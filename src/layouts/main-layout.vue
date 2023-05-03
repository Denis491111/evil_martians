<template>
  <Header />
  <router-view />

  <transition name="fade">
    <LoginPopup v-if="isOpenedPopup" @close="closePopup" />
  </transition>

  <transition name="fade">
    <div class="notification" v-if="!!notification">{{notification}}</div>
  </transition>
</template>

<script lang="ts">
import Header from "@/components/header/header.vue";
import LoginPopup from "@/components/login-popup/login-popup.vue";
import { computed } from "vue";
import {useStore} from "vuex";

export default {
  components: {Header, LoginPopup},
  name: "Layout",
  setup: () => {
    const store = useStore();
    const isOpenedPopup = computed<boolean>(() => {
      return ((store || {}).state || {}).isOpenedLoginPopup;
    });
    const notification = computed<string>(() => {
      return ((store || {}).state || {}).notification;
    });

    const closePopup = () => {
      store.commit("closeLoginPopup");
    };

    return {
      isOpenedPopup, closePopup, notification
    }
  }
}
</script>

<style>
.notification {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 100%;
  max-width: 250px;
  padding: 16px;
  border-radius: 4px;
  background-color: var(--secondary);
  font-size: 14px;
  line-height: 1.3;
  color: #fff;
}
</style>
