<template>
    <div class="about">

        <h1 class="text-center">Pricing</h1>

        <br />

        <table class="table table-bordered">
            <thead>
                <th class="text-center">
                    Features
                </th>

                <th class="text-center">
                    Package 0
                </th>
                <th class="text-center">
                    Package 1
                </th>
                <th class="text-center">
                    Package 2
                </th>
                <th>
                    Package 3
                </th>
            </thead>

            <tbody>
                <tr v-for="item in features" :key="item.name">
                    <td>
                        {{ item.name }}
                    </td>

                    <td
                        class="text-center"
                        :class="item.pac0.color"
                        v-html="item.pac0.text"
                    >

                    </td>
                    <td
                        class="text-center"
                        :class="item.pac1.color"
                        v-html="item.pac1.text"
                    ></td>
                    <td
                        class="text-center"
                        :class="item.pac2.color"
                        v-html="item.pac2.text"
                    ></td>
                    <td
                        class="text-center"
                        :class="item.pac3.color"
                        v-html="item.pac3.text"
                    ></td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <th>
                        {{ price.name }}
                    </th>
                    <th class="text-center text-primary">{{ price.pac0 }}</th>
                    <th class="text-center text-primary">{{ price.pac1 }}</th>
                    <th class="text-center text-primary">{{ price.pac2 }}</th>
                    <th class="text-center text-primary">{{ price.pac3 }}</th>
                </tr>
            </tfoot>
        </table>

    </div>
</template>

<script>

export default {
    name: "Pricing",
    components: {
    },
    mounted: function() {},
    computed: {},
    props: {},
    data() {
        return {
            features: [
                {
                    name: "Books",
                    pac0: { text: "Max: 500", color: "text-success" },
                    pac1: {
                        text: "Min: 501 ~ Max: 1000",
                        color: "text-success"
                    },
                    pac2: {
                        text: "Min: 1001 ~ Max: 2000",
                        color: "text-success"
                    },
                    pac3: {
                        text: "Min: 2001 ~ Max: 3000",
                        color: "text-success"
                    }
                },

                {
                    name: "Members",
                    pac0: { text: "Max: 100", color: "text-success" },
                    pac1: {
                        text: "Min: 101 ~ Max: 200",
                        color: "text-success"
                    },
                    pac2: {
                        text: "Min: 201 ~ Max: 500",
                        color: "text-success"
                    },
                    pac3: {
                        text: "Min: 501 ~ Max: 1000",
                        color: "text-success"
                    }
                },
                {
                    name: "Book QR Code",
                    pac0: {
                        text: this.symbolCross(),
                        color: this.colorDanger()
                    },
                    pac1: {
                        text: this.symbolTick(),
                        color: this.colorSuccess()
                    },
                    pac2: {
                        text: this.symbolTick(),
                        color: this.colorSuccess()
                    },
                    pac3: { text: this.symbolTick(), color: this.colorSuccess() }
                },

                {
                    name: "Member ID Card",
                    pac0: {
                        text: this.symbolCross(),
                        color: this.colorDanger()
                    },
                    pac1: {
                        text: this.symbolTick(),
                        color: this.colorSuccess()
                    },
                    pac2: {
                        text: this.symbolTick(),
                        color: this.colorSuccess()
                    },
                    pac3: { text: this.symbolTick(), color: this.colorSuccess() }
                },
                {
                    name: "Attendance",
                    pac0: {
                        text: this.symbolCross(),
                        color: this.colorDanger()
                    },
                    pac1: {
                        text: this.symbolTick(),
                        color: this.colorSuccess()
                    },
                    pac2: {
                        text: this.symbolTick(),
                        color: this.colorSuccess()
                    },
                    pac3: { text: this.symbolTick(), color: this.colorSuccess() }
                },

                {
                    name: "Accounting",
                    pac0: {
                        text: this.symbolCross(),
                        color: this.colorDanger()
                    },
                    pac1: {
                        text: this.symbolCross(),
                        color: this.colorDanger()
                    },
                    pac2: {
                        text: this.symbolTick(),
                        color: this.colorSuccess()
                    },
                    pac3: { text: this.symbolTick(), color: this.colorSuccess() }
                },
                {
                    name: "Library Branch ",
                    pac0: {
                        text: this.symbolCross(),
                        color: this.colorDanger()
                    },
                    pac1: {
                        text: this.symbolCross(),
                        color: this.colorDanger()
                    },
                    pac2: {
                        text: this.symbolTick(),
                        color: this.colorSuccess()
                    },
                    pac3: { text: this.symbolTick(), color: this.colorSuccess() }
                },


            ],
            price: {
                name: "Price",
                pac0: "BDT 0/Month",
                pac1: "BDT 100/Month",
                pac2: "BDT 500/Month",
                pac3: "BDT 1000/Month"
            }
        };
    },
    methods: {
        symbolTick() {
            return "&#x2713;";
        },
        symbolCross() {
            return "&#215;";
        },

        colorSuccess() {
            return "text-success";
        },
        colorDanger() {
            return "text-danger";
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
