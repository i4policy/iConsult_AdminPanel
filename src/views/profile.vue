<template>
<v-card class="pa-5">

    <v-card-text>

        <v-text-field @input="error = null" v-model="$store.state.user.name" prepend-icon="person" label="Name" disabled />

        <v-text-field @input="error = null" v-model="$store.state.user.email" prepend-icon="email" label="Email" disabled />

        <h1>Change Password</h1>

        <v-form @submit.native.prevent="changePassword" >

            <v-text-field @input="error = null" type="password" :error-messages="errors.oldPassword" prepend-icon="lock" v-model="passwordForm.oldPassword" label="Old Password" />

            <v-text-field @input="error = null" type="password" :error-messages="errors.newPassword" prepend-icon="lock" v-model="passwordForm.newPassword" label="New Password" />

            <v-card-actions>

                <v-btn block ripple type="submit" :disabled="disabled" :loading="loading" color="primary">change password</v-btn>

            </v-card-actions>

        </v-form>

    </v-card-text>

</v-card>
</template>

<script>
export default {
    name: "profile",
    data() {
        return {
            loading: false,
            disabled: true,
            passwordForm: {
                oldPassword: undefined,
                newPassword: undefined
            },
            errors: {}
        }
    },
    methods: {
        async changePassword() {

            this.loading = true;

            try {

                await this.$store.dispatch("changePassword", this.passwordForm);

                this.loading = false;

                this.disabled = true;

            } catch(error) {

                console.error(error);

                if (error.error.code === "INVALID_PASSWORD") this.errors.oldPassword = "Invalid old password!";

                this.loading = false;

            }

        }
    },

    watch: {
        passwordForm: {
            deep: true,
            handler() {

                let constraints = {

                    oldPassword: {
                        presence: true,
                        length: {
                            minimum: 8,
                            maximum: 512,
                            message: "Password must be 8 to 512 characters!"
                        }
                    },

                    newPassword: {
                        presence: true,
                        length: {
                            minimum: 8,
                            maximum: 512,
                            message: "Password must be 8 to 512 characters!"
                        }
                    }

                };

                let errors = this.$validate(this.passwordForm, constraints);

                this.errors = errors || {};

                this.disabled = errors !== undefined;

            }
        }
    }
}
</script>
