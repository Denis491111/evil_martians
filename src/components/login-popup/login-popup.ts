import {onBeforeMount, onBeforeUnmount, ref} from "vue";
import EMInput from "@/components/em-input/em-input.vue";
import EMButton from "@/components/em-button/em-button.vue";
import Infrastructure from "../../infrastructure";
import {IAuthorizeResponse} from "@/infrastructure/user/authorize";
import {useStore} from "vuex";

export default {
    name: "LoginPopup",
    components: {EMInput, EMButton},
    setup: (props: any, context: any) => {
        onBeforeMount(() => {
            (document.querySelector("body") as HTMLElement).classList.add(
                "popup-opened"
            );
            document.addEventListener("keydown", handleKeyPressEscOnDocument);
        });
        onBeforeUnmount(() => {
            (document.querySelector("body") as HTMLElement).classList.remove(
                "popup-opened"
            );
        });
        const store = useStore();

        const handleKeyPressEscOnDocument = (event: KeyboardEvent) => {
            if (event.key === "Escape" || event.key === "Esc" || event.key === "27") {
                context.emit("close");
            }
        }

        const errors = ref<any>({
            email: "",
            password: "",
            common: ""
        });

        const errorsRecovery = ref<any>({
            email: "",
            common: ""
        });

        const formData = ref<any>({
            email: "",
            password: ""
        });

        const formDataRecovery = ref<any>({
            email: ""
        });

        const componentInterface = ref<any>({
            isLoadingAuth: false,
            isRecoveryMode: false,
            isLoadingRecovery: false
        });

        const getIsValidForm = () => {
            const isValidEmail: boolean = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.value.email);
            if(!isValidEmail) {
                errors.value.email = "Please, enter the correct email"
            }
            const isValidPassword: boolean = !!formData.value.password;
            if(!isValidPassword) {
                errors.value.password = "Please, enter the correct password"
            }

            return isValidEmail && isValidPassword;
        }

        const getIsValidFormRecovery = () => {
            const isValidEmail: boolean = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formDataRecovery.value.email);
            if(!isValidEmail) {
                errorsRecovery.value.email = "Please, enter the correct email"
            }

            return isValidEmail;
        }

        const onInput = (fieldName: string, value: string) => {
            formData.value[fieldName] = value;
            errors.value[fieldName] = false;
            errors.value.common = false;
        }

        const onInputRecovery = (fieldName: string, value: string) => {
            formDataRecovery.value[fieldName] = value;
            errorsRecovery.value[fieldName] = false;
            errorsRecovery.value.common = false;
        }

        const auth = () => {
            if(componentInterface.value.isLoadingAuth) {
                return;
            }
            Object.keys(errors.value).forEach((item: string) => {
                errors.value[item] = false;
            })
            if(getIsValidForm()) {
                componentInterface.value.isLoadingAuth = true;
                Infrastructure.user.authorize({
                    email: formData.value.email,
                    password: formData.value.password
                }).then((response: IAuthorizeResponse | any) => {
                    store.commit("setUser", response.user);
                    localStorage.setItem("emUserToken", response.token);
                    context.emit("close");
                }).catch((err) => {
                    errors.value.common = err.error;
                }).finally(() => {
                    componentInterface.value.isLoadingAuth = false;
                })
            }
        }

        const recover = () => {
            if(componentInterface.value.isLoadingRecovery) {
                return;
            }
            Object.keys(errorsRecovery.value).forEach((item: string) => {
                errorsRecovery.value[item] = false;
            })
            if(getIsValidFormRecovery()) {
                componentInterface.value.isLoadingRecovery = true;
                Infrastructure.user.recoveryPassword({
                    email: formDataRecovery.value.email
                }).then((response: boolean) => {
                    if(response) {
                        store.commit("notify", `An instructions list was sent to your email address ${formDataRecovery.value.email}`)
                        context.emit("close");
                    }
                }).catch(() => {
                    errorsRecovery.value.common = "An error occured. Please, try again later";
                }).finally(() => {
                    componentInterface.value.isLoadingRecovery = false;
                })
            }
        }

        return {
            errors,
            formData,
            auth,
            componentInterface,
            onInput,
            formDataRecovery,
            onInputRecovery,
            errorsRecovery,
            recover
        }
    }
}
