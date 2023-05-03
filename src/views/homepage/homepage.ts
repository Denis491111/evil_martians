import {computed} from "vue";
import {IUser} from "@/store";
import {useStore} from "vuex";

export default {
    name: "Homepage",
    setup: () => {
        const store = useStore();

        const user = computed<IUser>(() => {
            return ((store || {}).state || {}).user;
        });

        return {user};
    }
}

