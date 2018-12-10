<template>
<v-container>

    <v-toolbar color="white" flat class="elevation-1">
        <v-toolbar-title>Responses</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>

    <v-divider class="mx-2" inset></v-divider>

    <v-data-table :loading="loading" :headers="headers" :total-items="totalResponses" :pagination.sync="pagination" :items="responses" class="elevation-5">
        <template slot="items" slot-scope="props">
            <td><router-link :to="`responses/${props.item.id}`">{{ props.item.name }}</router-link></td>
        </template>
    </v-data-table>

</v-container>
</template>

<script>
export default {
    name: "responses",
    data() {
        return {
            loading: "primary",
            responses: [],
            pagination: {},
            totalResponses: 0,
            headers: [

                {
                    text: "From",
                    sortable: true,
                    value: "name"
                }

            ]
        }
    },

    methods: {

        async load() {

            this.loading = true;

            let filter = {
                skip: ((this.pagination.page - 1) * this.pagination.rowsPerPage) || undefined,
                limit: this.pagination.rowsPerPage,
                order: `${this.pagination.sortBy} ${this.pagination.descending ? "DESC" : "ASC"}`
            };

            try {

                let data = await this.$store.dispatch("getObjects", {
                    path: `users?filter=${JSON.stringify(filter)}`
                });

                this.responses = data.rows;

                this.totalResponses = data.count;

                this.loading = false;

            } catch (error) {

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
        }
    }

};
</script>
