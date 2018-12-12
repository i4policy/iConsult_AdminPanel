<template>
<v-card class="pa-5">

    <v-form @submit.prevent="save">

        <v-text-field :disabled="!editable" @input="error = null" v-model="section.title" label="Title" :error-messages="errors.title" />

        <quill-editor :disabled="!editable" class="mt-3" v-model="section.content" ref="sectionEditor"/>

        <v-card-actions>

            <v-btn v-if="editable" block type="submit" :disabled="disabled" :loading="loading" color="primary">save</v-btn>

        </v-card-actions>

    </v-form>

</v-card>
</template>

<script>

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import {
    quillEditor
} from "vue-quill-editor";

export default {
    name: "document-section",
    components: {
        quillEditor
    },
    props: {
        section: {
            type: Object,
            required: true
        },
        editable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            loading: false,
            disabled: true,
            errors: {}
        }
    },
    methods: {

        async save() {

            this.loading = true;

            let where = {
                id: this.section.id || ""
            };

            this.section.documentId = this.$route.params.id;

            try {

                this.section = await this.$store.dispatch("saveObject", {
                    path: `sections/upsertWithWhere?where=${JSON.stringify(where)}`,
                    data: this.section
                });

                this.loading = false;

                this.$emit("saved");

            } catch(error) {

                console.error(error);

            }

        }
    },

    watch: {
        section: {
            deep: true,
            handler() {
                let constraints = {

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

                let errors = this.$validate(this.section, constraints);

                this.errors = errors || {};

                this.disabled = errors !== undefined;
            }
        }
    }
};
</script>
