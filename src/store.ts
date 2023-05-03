import { createStore } from "vuex";
import {IExtUser} from "@/infrastructure/user/authorize";

export interface IUser {
  name: string;
  surname: string;
  initials: string;
}

function userAdapter(user: IExtUser): IUser {
  return {
    name: user.name,
    surname: user.surname,
    initials: [user.name[0], user.surname[0]].filter(item => !!item).join("").toLocaleUpperCase()
  }
}

interface State {
  isOpenedLoginPopup: boolean;
  user: IUser | null;
  notification: string;
}

export default createStore<State>({
  state: {
    isOpenedLoginPopup: false,
    user: null,
    notification: ""
  },
  getters: {},
  mutations: {
    openLoginPopup(state: State) {
      state.isOpenedLoginPopup = true;
    },
    closeLoginPopup(state: State) {
      state.isOpenedLoginPopup = false;
    },
    toggleLoginPopup(state: State) {
      state.isOpenedLoginPopup = !state.isOpenedLoginPopup;
    },
    setUser(state: State, user: IExtUser) {
      state.user = userAdapter(user);
    },
    notify(state: State, notificationText: string) {
      state.notification = notificationText;
      setTimeout(() => {
        state.notification = "";
      }, 4000);
    }
  },
  actions: {},
  modules: {},
});
