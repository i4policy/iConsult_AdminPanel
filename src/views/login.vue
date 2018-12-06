<template>
<v-container fill-height>

    <v-layout column wrap align-center justify-center>

        <img src="@/assets/logo.png" width="300" class="ma-5">

        <v-card width="400">

            <v-card-title primary-title>
                <h1>Login</h1>
            </v-card-title>

            <v-card-text>
                <v-form id="login-form" v-model="valid">
                    <v-text-field v-model="user.email" :error-messages="errors.email" label="Email..." required></v-text-field>
                    <v-text-field type="password" v-model="user.password" :error-messages="errors.password" label="Password..." required></v-text-field>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" block :loading="loading" :disabled="disabled">Login</v-btn>
            </v-card-actions>

        </v-card>

    </v-layout>

</v-container>
</template>

<script>
export default {
    name: "login",
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
