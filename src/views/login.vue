<template>

<v-container>

    <v-card>

        <v-card-title primary-title>
            <h1>Login</h1>
        </v-card-title>
        
        <v-card-text>
            <v-form id="login-form" v-model="valid">
                <v-text-field v-model="user.email" :error="errors.email" label="Email..." required></v-text-field>
                <v-text-field v-model="user.password" :error="errors.password" label="Password..." required></v-text-field>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-btn color="primary" block :loading="loading" :disabled="disabled">Login</v-btn>
        </v-card-actions>
    </v-card>

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
    }
}
</script>
