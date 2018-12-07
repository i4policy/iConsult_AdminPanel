<template>
<v-container>

    <v-toolbar color="white" flat>
        
        <v-spacer></v-spacer>

        <v-dialog max-width="1200" v-model="sectionDialog" transition="dialog-transition">
            
            <v-btn @click.native="section = {};" slot="activator" color="primary">new section</v-btn>

            <document-section @saved="load()" :section="section"/>

        </v-dialog>

    </v-toolbar>

    <v-data-table :total-items="totalSections" :loading="loading" :headers="headers" :pagination.sync="pagination" :items="sections">
        <template slot="items" slot-scope="props">
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.createdAt }}</td>
            <td>{{ props.item.updatedAt }}</td>
            <td>
                <v-icon @click="_deleteSection(props.item.id)" small class="mr-4">delete</v-icon>
                <v-icon @click="editSection(props.item)" small class="mr-4">edit</v-icon>
            </td>
        </template>
    </v-data-table>

    <v-snackbar v-model="snackbar">
        Are you sure you want to remove this section?
        <v-btn flat color="primary" @click.native="deleteSection(); snackbar = false">Yes</v-btn>
        <v-btn flat color="primary" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>

</v-container>
</template>

<script>

import DocumentSection from "./section";

export default {
    name: "sections",
    components: {
        DocumentSection
    },
    props: {
        documentId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loading: "primary",
            sections: [],
            snackbar: false,
            pagination: {},
            section: {},
            sectionDialog: false,
            sectionId: null,
            totalSections: 0,
            headers: [

                {
                    text: "Title",
                    sortable: true,
                    value: "title"
                },

                {
                    text: "Created At",
                    sortable: true,
                    value: "createdAt"
                },

                {
                    text: "Updated At",
                    sortable: true,
                    value: "updatedAt"
                },

                {
                    text: "Actions",
                    sortable: false
                }

            ]
        }
    },

    methods: {

        _deleteSection(id) {

            this.sectionId = id;

            this.snackbar = true;

        },

        editSection(section) {

            this.section = section;

            this.sectionDialog = true;

        },

        async load() {

            this.loading = true;

            let filter = {
                skip: ((this.pagination.page - 1) * this.pagination.rowsPerPage) || undefined,
                limit: this.pagination.rowsPerPage,
                where: {
                    documentId: this.documentId
                }
            };

            try {

                let data = await this.$store.dispatch("getObjects", {
                    path: `sections?filter=${JSON.stringify(filter)}`
                });

                this.sections = data.rows;

                this.totalSections = data.count;

                this.loading = false;

            } catch (error) {

                console.error(error);

            }

        },

        async deleteSection() {

            try {

                this.loading = true;

                await this.$store.dispatch("deleteObject", {
                    path: `sections/${this.sectionId}`
                });

                this.load();

            } catch (error) {

                console.error(error);

            }

        },

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
