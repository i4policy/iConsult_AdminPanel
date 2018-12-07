<template>
<v-card flat>

    <v-card-title primary-title>
        <h1>New Document</h1>
    </v-card-title>

    <v-card-text>

        <v-form @submit.prevent="saveDocument">

            <v-text-field type="text" :error-messages="errors.title" v-model="document.title" label="Title"></v-text-field>

            <quill-editor class="mt-3" v-model="document.content" ref="documentEditor" :options="editorOptions"></quill-editor>

            <v-btn color="primary" block class="mt-3" :disabled="disabled" :loading="loading">save</v-btn>

        </v-form>

    </v-card-text>

</v-card>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

import {
    quillEditor
} from "vue-quill-editor";

export default {
    name: "add-document",
    components: {
        quillEditor
    },
    data() {
        return {
            loading: false,
            disabled: true,
            document: {
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

            try {

                this.document = await this.$store.dispatch("saveObject", {
                    path: "documents",
                    data: this.document
                });

                this.loading = false;

            } catch(error) {

                console.error(error);

            }

        }
    },

    watch: {
        document: {
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

                let errors = this.$validate(this.document, constraints);

                this.errors = errors || {};

                this.disabled = errors !== undefined;
            }
        }
    }
}
</script>
