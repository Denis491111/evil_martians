import {useStore} from "vuex";
import EMButton from "@/components/em-button/em-button.vue";
import {computed} from "vue";
import {IUser} from "@/store";
import {AUTH_TOKEN_KEY} from "@/common/const";

export default {
    name: "Header",
    components: {EMButton},
    setup: () => {
        const store = useStore();

        const openPopup = () => {
            store.commit("openLoginPopup");
        }

        const user = computed<IUser>(() => {
            return ((store || {}).state || {}).user;
        });

        const logout = () => {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            window.location.reload();
        }

        return {
            openPopup,
            user,
            logout
        }
    }
}
