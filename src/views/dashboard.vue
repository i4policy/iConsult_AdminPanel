<template>
<v-card>

    <v-card-title>
        <v-select v-model="documentId" :items="documents" label="Document" item-text="title" item-value="id"></v-select>
    </v-card-title>

    <v-card-text v-if="stats">
        <h1>Reviews And Comments Per Section</h1>

        <v-layout row wrap>

            <v-flex xs3 v-for="(stat, title) in stats" :key="stat.title">

                <v-card class="ma-2">
                    <v-card-title primary>

                        <h4>{{ title }}</h4>

                    </v-card-title>

                    <v-card-text>

                        <v-layout row wrap>

                            <v-flex xs6>
                                {{ stat.reviews }} Reviews
                            </v-flex>

                            <v-flex xs6>
                                {{ stat.comments }} Comments
                            </v-flex>

                        </v-layout>

                    </v-card-text>

                </v-card>

            </v-flex>

        </v-layout>

    </v-card-text>
</v-card>
</template>

<script>
export default {
    name: "dashboard",
    data() {
        return {
            stats: null,
            documentId: null,
            documents: []
        }
    },
    async created() {

        let documents = await this.$store.dispatch("getObjects", {
            path: "documents"
        });

        this.documents = documents.rows;

    },

    watch: {
        async documentId() {

            this.stats = await this.$store.dispatch("getObjects", {
                path: `documents/stats?documentId=${this.documentId}`
            });

        }
    }
}
</script>
