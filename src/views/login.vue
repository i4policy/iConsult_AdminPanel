<template>
<v-container fill-height>

    <v-layout row wrap align-center justify-center>

        <img src="@/assets/logo.png" width="375" class="ma-5">

        <v-card width="400">

            <v-card-title primary-title>
                <h1>Login</h1>
            </v-card-title>

            <v-card-text>
                <v-form @submit.prevent="login" id="login-form">
                    <v-text-field v-model="user.email" :error-messages="errors.email" label="Email..." required></v-text-field>
                    <v-text-field type="password" v-model="user.password" :error-messages="errors.password" label="Password..." required></v-text-field>
                    <vue-recaptcha ref="recaptcha" sitekey="6LfQhH0UAAAAAB389xxZzLNhEUfifLPZfQZacvYX" @expired="captchaExpired" @verify="captchaVerified"></vue-recaptcha>
                    <v-btn type="submit" for="login-form" color="primary" block :loading="loading" :disabled="disabled || recaptchaUnverified">Login</v-btn>
                </v-form>
            </v-card-text>

        </v-card>

    </v-layout>

</v-container>
</template>

<script>
import Social from "../social";
import { notLoggedIn } from "../guards";

export default {
    name: "login",
    beforeCreate: notLoggedIn,
    mixins: [
        Social
    ],
    data() {
        return {
            loading: false,
            disabled: true,
            user: {
                email: undefined,
                password: undefined
            },
            errors: {

            }
        }
    },

    methods: {

        async login() {

            this.loading = true;

            try {

                let data = await this.$store.dispatch("login", this.user);

                this.loading = false;

                if (data.userRole.name !== "admin") {

                    this.$refs.recaptcha.reset();

                    this.errors.email = "Only admin users can access the administration panel";

                }

                this.$store.commit("login", data);

                localStorage.setItem("session", JSON.stringify(data))

                this.$router.replace("/dashboard");

            } catch (error) {

                this.$refs.recaptcha.reset();

                if (error.error.code === "LOGIN_FAILED") this.errors.email = "Incorrect email or password!";

                this.loading = false;

                console.error(error);

            }

        }
    },

    watch: {
        user: {

            deep: true,

            handler() {

                let constraints = {

                    email: {
                        presence: true,
                        email: {
                            message: "Invalid email address"
                        }
                    },

                    password: {
                        presence: true,
                        length: {
                            minimum: 8,
                            maximum: 512,
                            message: "Password must be 8 to 512 characters!"
                        }
                    }

                };

                let errors = this.$validate(this.user, constraints);

                this.errors = errors || {};

                this.disabled = errors !== undefined;

            }
        }
    }
}
</script>
