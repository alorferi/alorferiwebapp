<template>
    <div>
        <div class="d-flex justify-content-between mt-2">
            <div class="align-self-center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <!--Start: Previous   -->
                        <li
                            class="page-item"
                            :class="{ disabled: meta.current_page == 1 }"
                            v-if="meta.last_page !=  1"
                        >
                            <a
                                class="page-link"
                                role="button"
                                @click="updatePage(meta.current_page - 1)"
                                aria-label="« Previous"
                            >
                                <span aria-hidden="true">‹</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>

                        <!--End: Previous   -->

                        <!-- Start: Firstr Loop -->
                        <li
                            class="page-item"
                            v-for="(page, index) in firstLoop"
                            :key="'first' + index"
                            :class="{ active: page == meta.current_page }"
                        >
                            <a
                                class="page-link"
                                role="button"
                                @click="updatePage(page)"
                                >{{ page }}</a
                            >
                        </li>

                        <!-- End: Firstr Loop -->

                        <!-- Start: First Gap -->
                        <li class="page-item disabled" aria-disabled="true">
                            <span class="page-link" v-if="isMake1stGap"
                                >...</span
                            >
                        </li>

                        <!-- End: First Gap -->

                        <!-- Start: Middle Loop -->
                        <li
                            class="page-item"
                            v-for="(page, index) in middleLoop"
                            :key="'middle' + index"
                            :class="{ active: page == meta.current_page }"
                        >
                            <a
                                class="page-link"
                                role="button"
                                @click="updatePage(page)"
                                >{{ page }}</a
                            >
                        </li>
                        <!-- End: Middle Loop -->

                        <!--Start: Second Gap -->
                        <li class="page-item disabled" aria-disabled="true">
                            <span class="page-link" v-if="isMake2ndGap"
                                >...</span
                            >
                        </li>
                        <!--End: Second Gap -->

                        <!-- Start: Last Loop -->
                        <li
                            class="page-item"
                            v-for="(page, index) in lastLoop"
                            :key="'last' + index"
                            :class="{ active: page == meta.current_page }"
                        >
                            <a
                                class="page-link"
                                role="button"
                                @click="updatePage(page)"
                                >{{ page }}</a
                            >
                        </li>

                        <!-- End: Last Loop -->

                        <!-- Start: Next-->
                        <li
                            class="page-item"
                            aria-label="Next »"
                            :class="{
                                disabled: meta.current_page == meta.last_page
                            }"
                               v-if="meta.last_page != 1"
                        >
                            <a
                                class="page-link"
                                role="button"
                                @click="updatePage(meta.current_page + 1)"
                            >
                                <span aria-hidden="true">›</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>

                        <!-- End: Next-->
                    </ul>
                </nav>
            </div>

            <div class="text-secondary p-2">
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

        firstLoop() {
            var endPage = 0;

            if (this.meta.last_page > this.smallPageLimit) {
                if (this.meta.current_page >= this.firstValueOfTerminatingMiddleLoop()) {
                    endPage = 2;
                } else {
                    endPage = 10;
                }
            } else {
                endPage = this.meta.last_page;
            }

            return this.range(1, endPage);
        },

        middleLoop() {
            var startPage = 0;
            var endPage = 0;
            const  currentPage = this.meta.current_page
            const lastValue = this.lastValueOfTerminatingMiddleLoop()
            if (currentPage >= 8 && currentPage <= lastValue ) {
                startPage = this.meta.current_page - 3;
                endPage = this.meta.current_page + 3;
            }

            return this.range(startPage, endPage);
        },

        lastLoop() {
            var startPage = 0;
            var endPage = 0;

            if (this.meta.last_page > this.smallPageLimit) {
                 const lastValue = this.lastValueOfTerminatingMiddleLoop()
                if ( this.meta.current_page > lastValue) {
                    startPage = this.meta.last_page - 9;
                    endPage = this.meta.last_page;
                } else {
                    startPage = this.meta.last_page - 1;
                    endPage = this.meta.last_page;
                }
            }
            return this.range(startPage, endPage);
        },

        isMake1stGap() {
            return this.meta.current_page >= this.firstValueOfTerminatingMiddleLoop() && this.meta.last_page != this.smallPageLimit;
        },

        isMake2ndGap() {
             const lastValue = this.lastValueOfTerminatingMiddleLoop()
            return this.meta.current_page <= lastValue && this.meta.last_page != this.smallPageLimit
            //|| this.meta.last_page > this.smallPageLimit;
            //  return  this.middleLoop.length>0;
        }
    },
    data() {
        return {
            smallPageLimit:13,
        };
    },

    methods: {
        updatePage: function(page) {
            this.$emit("update:page", page);
        },
        range: function(start, stop) {
            var size = stop - start;
            size = size > 0 ? size + 1 : 0;
            return new Array(size).fill(start).map((n, i) => n + i);
        },
        lastValueOfTerminatingMiddleLoop(){
            return this.meta.last_page - 7;
        },
        firstValueOfTerminatingMiddleLoop(){
            return 8;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
