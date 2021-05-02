<template>
    <div>
        <div class="d-flex justify-content-between mt-2">
            <div class="align-self-center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li
                            class="page-item"
                            :class="{ disabled: meta.current_page == 1 }"
                        >
                            <a
                                class="page-link"
                                href="#"
                                @click="updatePage(meta.current_page - 1)"
                                aria-label="« Previous"
                            >
                                <span aria-hidden="true">‹</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>

                        <li
                            class="page-item"
                            v-for="(page, index) in nOfFirstLoop"
                            :key="index"
                            :class="{ active: page == meta.current_page }"
                        >
                            <a
                                class="page-link"
                                href="#"
                                @click="updatePage(page)"
                                >{{ page }}</a
                            >
                        </li>

                        <li class="page-item disabled" aria-disabled="true"><span class="page-link" v-if="isLongPaging">...</span></li>

                        <li
                            class="page-item"
                            aria-label="Next »"
                            :class="{
                                disabled: meta.current_page == meta.last_page
                            }"
                        >
                            <a
                                class="page-link"
                                href="#"
                                @click="updatePage(meta.current_page + 1)"

                            >
                                <span aria-hidden="true">›</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div class="text-primary p-2">
                Items: {{ this.currentTotalItems }} of {{ meta.total }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Paginator",
    props: ["meta"],
    mounted() {},
    computed: {
        currentTotalItems: function() {
            var currentTotalItems = this.meta.current_page * this.meta.per_page;

            if (currentTotalItems > this.meta.total) {
                currentTotalItems = this.meta.total;
            }
            return currentTotalItems;
        },
        nOfFirstLoop() {
            return this.meta.last_page > 15 ? 10 : this.meta.last_page;
        },

        isLongPaging(){
            return this.meta.last_page > 15
        }
    },
    data() {
        return {};
    },

    methods: {
        updatePage: function(page) {
            this.$emit("update:page", page);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
