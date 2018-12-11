<template>
<v-card>

    <div ref="document" class="container no-select document">

        <div v-html="document.content"></div>

        <accordion :collapseAll="true" :items="document.sections" :selectors="{id: 'id', title: 'title', content: 'content'}">

            <template slot="title" slot-scope="{ item }">
                <h1>{{ item.title }}</h1>
            </template>

            <template slot="content" slot-scope="{ item }">
                    <div>
                        <div v-html="item.content"></div>
                    </div>
            </template>

        </accordion>

    </div>

</v-card>
</template>

<script>
import annotator from "annotator";
import Accordion from "@profesia/vue-accordion-component";

export default {
    name: "response",
    components: {
        Accordion,
    },
    data() {
        return {
            document: {},
            ann: null
        }
    },

    methods: {

        async load() {

            try {

                let filter = {
                    include: {
                        relation: "sections"
                    }
                };

                filter.include.scope = {
                    include: [{
                            relation: "comments",
                            scope: {
                                where: {
                                    userId: this.$route.params.id
                                }
                            }
                        },
                        {
                            relation: "reviews",
                            scope: {
                                where: {
                                    userId: this.$route.params.id
                                }
                            }
                        }
                    ]
                };

                this.document = await this.$store.dispatch("getObjects", {
                    path: `documents/${this.$route.query.documentId}?filter=${JSON.stringify(filter)}`
                });

                if (!this.$store.getters.loggedIn) return;

                this.ann = new annotator.App();

                this.ann.include(annotator.ui.main, {
                    element: this.$refs.document
                });

                filter = {
                    where: {
                        userId: this.$route.params.id,
                        documentId: this.$route.query.documentId
                    }
                };

                this.ann.include(annotator.storage.http, {
                    prefix: `${process.env.VUE_APP_BASE_URL}`,
                    headers: {
                        "Authorization": this.$store.state.user && this.$store.state.user.auth_token ? this.$store.state.user.auth_token : undefined
                    },
                    urls: {
                        search: `annotations?filter=${JSON.stringify(filter)}`
                    }
                });

                this.ann.start()
                .then(() => {
                    this.ann.annotations.load()
                });

            } catch (error) {

                console.error(error);

            }

        },
    },

    async mounted() {

        this.load();

    }
}
</script>

<style>

.annotator-controls {
    display: none;
}

.no-select {
    user-select: none;
}

.document ul,
.document ol {
    padding: 2rem !important;
}

.document li {
    margin: .5rem 0 !important;
}

.document p {
    margin: 1rem 0 !important;
}
</style>
