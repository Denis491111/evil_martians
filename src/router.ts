import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from "vue-router";
import Homepage from "@/views/homepage/homepage.vue";
import MainLayout from "@/layouts/main-layout.vue";
import Infrastructure from "@/infrastructure";
import {IExtUser} from "@/infrastructure/user/authorize";
import store from "@/store";
import {AUTH_TOKEN_KEY} from "@/common/const";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    beforeEnter: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      const authToken: string | null = localStorage.getItem(AUTH_TOKEN_KEY);
      if(!authToken) {
        next();
      } else {
        (document.querySelector("body") as HTMLElement).classList.add("body-loading");
        Infrastructure.user.getUser(authToken).then((user: IExtUser) => {
          store.commit("setUser", user);
          next();
        }).catch(() => {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          window.location.reload();
        }).finally(() => {
          (document.querySelector("body") as HTMLElement).classList.remove("body-loading");
        })
      }
    },
    component: MainLayout,
    children: [
      {
        path: "/",
        name: 'home',
        component: Homepage
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
