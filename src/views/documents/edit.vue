<template>
<v-tabs :grow="true" centered dark color="primary" slider-color="secondary">
    <v-tab>{{ this.document.title }}</v-tab>
    <v-tab>Sections</v-tab>
    <v-tab-item>
        <v-card>

            <v-card-text>

                <v-form @submit.prevent="save">

                    <v-switch label="Draft" :error-messages="document.draft" v-model="document.draft" color="primary"></v-switch>

                    <v-text-field type="text" :error-messages="errors.title" v-model="document.title" label="Title"></v-text-field>

                    <quill-editor class="mt-3" v-model="document.content" ref="documentEditor" :options="editorOptions"></quill-editor>

                    <v-btn v-if="editable" color="primary" type="submit" block class="mt-3" :disabled="disabled" :loading="loading">save</v-btn>

                </v-form>

                <v-card-actions>
                    <h3>Updated At: {{ this.document.updatedAt }}</h3>
                </v-card-actions>

            </v-card-text>

        </v-card>
    </v-tab-item>
    <v-tab-item>

        <v-card v-if="!loading">
        
            <sections :documentId="document.id"/>

        </v-card>

    </v-tab-item>

</v-tabs>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import {
    quillEditor
} from "vue-quill-editor";

import Sections from "./sections";

export default {
    name: "edit-document",
    components: {
        quillEditor,
        Sections
    },
    data() {
        return {
            loading: false,
            disabled: true,
            editable: true,
            document: {
                draft: true,
                title: undefined,
                content: undefined
            },
            errors: {},
            editorOptions: {}
        }
    },
    methods: {
        async save() {

            this.loading = true;

            let where = {
                id: this.$route.params.id
            };

            try {

                this.document = await this.$store.dispatch("saveObject", {
                    path: `documents/upsertWithWhere?where=${JSON.stringify(where)}`,
                    data: this.document
                });

                this.editable = this.document.draft;

                this.loading = false;

            } catch (error) {

                this.loading = false;

                console.error(error);

            }

        }
    },

    async created() {

        this.loading = true;

        try {

            this.document = await this.$store.dispatch("getObjects", {
                path: this.$route.path
            });

            this.editable = this.document.draft;

            this.loading = false;

        } catch (error) {

            console.error(error);

        }

    },

    watch: {
        document: {
            deep: true,
            handler() {
                let constraints = {

                    draft: {
                        presence: true,
                        inclusion: [true, false]
                    },

                    title: {
                        presence: true,
                        length: {
                            minimum: 2,
                            maximum: 100,
                            message: "Title must be 2 to 100 characters"
                        }
                    },

                    content: {
                        presence: true,
                        length: {
                            minimum: 2,
                            message: "Content must be more than 2 characters"
                        }
                    }

                };

                let errors = this.$validate(this.document, constraints);

                this.errors = errors || {};

                this.disabled = errors !== undefined;
            }
        }
    }
}
</script>
