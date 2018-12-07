<template>
<v-container>

    <v-toolbar color="white" flat class="elevation-1">
        <v-toolbar-title>Users</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog max-width="500px" v-model="addUserDialog" transition="dialog-transition">
            <v-btn slot="activator" color="primary">new admin user</v-btn>

            <v-card class="pa-5">

                <v-form @submit.native.prevent="addUser" v-model="valid">

                    <v-text-field @input="error = null" v-model="user.name" prepend-icon="person" label="Name" :error-messages="errors.name" required />

                    <v-text-field @input="error = null" v-model="user.email" :error-messages="errors.email" prepend-icon="email" label="Email" required />

                    <v-text-field @input="error = null" type="password" :error-messages="errors.password" prepend-icon="lock" v-model="user.password" label="Password" required />

                    <v-card-actions>

                        <v-btn block ripple type="submit" :disabled="!valid" :loading="loading" color="primary">add</v-btn>

                    </v-card-actions>

                </v-form>

            </v-card>

        </v-dialog>
    </v-toolbar>

    <v-divider class="mx-2" inset></v-divider>

    <v-data-table :loading="loading" :headers="headers" :pagination.sync="pagination" :items="users" class="elevation-5">
        <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.userRole.name === "admin" }}</td>
            <td>{{ props.item.banned }}</td>
            <td v-if="$store.state.user.id !== props.item.id">
                <v-icon @click="_deleteUser(props.item.id)" small class="mr-4">delete</v-icon>
            </td>
        </template>
    </v-data-table>

    <v-snackbar v-model="snackbar">
        Are you sure you want to remove this user?
        <v-btn flat color="primary" @click.native="deleteUser(); snackbar = false">Yes</v-btn>
        <v-btn flat color="primary" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

</v-container>
</template>

<script>
export default {
    name: "users",
    data() {
        return {
            loading: "primary",
            users: [],
            snackbar: false,
            pagination: {},
            userId: null,
            addUserDialog: false,
            totalUsers: 0,
            user: {},
            valid: true,
            errors: {

            },
            user: {
                name: null,
                email: null,
                password: null
            },
            headers: [

                {
                    text: "Name",
                    sortable: true,
                    value: "name"
                },

                {
                    text: "Email",
                    sortable: true,
                    value: "email"
                },

                {
                    text: "Admin",
                    sortable: false
                },

                {
                    text: "Banned",
                    sortable: false,
                    value: "banned"
                },

                {
                    text: "Actions",
                    sortable: false
                }

            ]
        }
    },

    methods: {

        _deleteUser(id) {

            this.userId = id;

            this.snackbar = true;

        },

        async load() {

            this.loading = true;

            let filter = {
                skip: ((this.pagination.page - 1) * this.pagination.rowsPerPage) || undefined,
                limit: this.pagination.rowsPerPage,
                include: "userRole"
            };

            try {

                let data = await this.$store.dispatch("getObjects", {
                    path: `users?filter=${JSON.stringify(filter)}`
                });

                this.users = data.rows;

                this.totalUsers = data.count;

                this.loading = false;

            } catch (error) {

                console.error(error);

            }

        },

        async deleteUser() {

            try {

                this.loading = true;

                await this.$store.dispatch("deleteObject", {
                    path: `users/${this.userId}`
                });

                this.load();

            } catch (error) {

                console.error(error);

            }

        },

        async addUser() {

            this.loading = true;

            try {

                await this.$store.dispatch("register", this.user);

                this.loading = false;

                this.addUserDialog = false;

                this.load();

            } catch (error) {

                if (error.error.statusCode === 422) this.errors.email = "A user with this email already exists";

                this.loading = false;

                console.error(error);

            }

        }

    },

    async mounted() {

        this.load();

    },

    watch: {
        pagination: {
            deep: true,
            handler() {
                this.load();
            }
        },

        user: {

            deep: true,

            handler() {

                let constraints = {

                    name: {
                        presence: true,
                        length: {
                            minimum: 2,
                            maximum: 100,
                            message: "Name must be 2 to 100 characters"
                        }
                    },

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

};
</script>
