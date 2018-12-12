<template>
<v-card>

    <v-card-title>
        <v-select v-model="documentId" :items="documents" label="Document" item-text="title" item-value="id"></v-select>
    </v-card-title>

    <v-card-text>

        <h2 class="center">TOTAL NUMBER OF ANNOTATIONS</h2>

        <h1 class="center large">{{ stats.totalAnnotations }}</h1>

        <h2 class="center">REVIEWS AND COMMENTS PER SECTION</h2>

        <v-layout row wrap>

            <v-flex xs3 v-for="(stat, title) in stats.sections" :key="stat.title">

                <v-card class="ma-2">
                    <v-card-title primary>

                        <h4 class="center">{{ title }}</h4>

                    </v-card-title>

                    <v-card-text>

                        <v-layout class="center" row wrap>

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

        <v-layout justify-center class="pa-4">
            <v-card class="pa-4">
                <v-card-title>
                    <div style="text-align: center; width: 100%;">
                        <img src="@/assets/logo.png" width="100">
                    </div>
                </v-card-title>
                <v-card-text>
                    <canvas width="600" height="300" ref="canvas"></canvas>
                </v-card-text>
                <v-card-title>
                    <h4 style="text-align: center; width: 100%;">Engagement report</h4>
                </v-card-title>
            </v-card>
        </v-layout>

    </v-card-text>

</v-card>
</template>

<script>
import Chart from "chart.js";

export default {
    name: "dashboard",
    data() {
        return {
            stats: {},
            documentId: null,
            documents: []
        }
    },
    async created() {

        let documents = await this.$store.dispatch("getObjects", {
            path: "documents"
        });

        this.documents = documents.rows;

        this.documentId = this.documents[0].id;

    },

    methods: {
        async load() {

            this.stats = await this.$store.dispatch("getObjects", {
                path: `documents/stats?documentId=${this.documentId}`
            });

            console.log(this.$refs.canvas);

            new Chart(this.$refs.canvas, {
                type: "bar",
                data: this.barData,
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                },
                scales: {
                    yAxis: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Users'
                        }
                    }]
                }
            });
        }
    },

    computed: {
        barData() {

            let data = {
                labels: [],
                datasets: [{
                    label: "Engagement Report",
                    backgroundColor: "#009688",
                    data: []
                }]
            };

            for (let t in this.stats.sections) {
                let s = this.stats.sections[t];
                data.labels.push(t);
                data.datasets[0].data.push(s.totalEngagement);
            }

            return data;

        }
    },

    watch: {
        documentId() {
            this.load();
        }
    }
}
</script>

<style>
.center {
    text-align: center;
    padding: 1rem;
    width: 100%;
}

.large {
    font-size: 5rem;
    padding: 0;
    font-weight: 900;
}
</style>
