<template>
    <div class>
        <div
            class="border border-light  rounded-circle d-flex justify-content-center align-items-center bg-primary text-white"
            style="width: 50px; height: 50px;"
        >
            <span class=" justify-content-center">
                {{ shortName }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: "NameCircle",
    props: ["name"],
    computed: {
        shortName: function() {
            // var matches = this.name.match(/[A-Z]/g);
            // var matches = this.name.match(/\b(\w)/g); // ['J','S','O','N']
            var matches = this.name.split(" ").map(function(item) {
                return item[0];
            });

            if (matches == null) {
                return "";
            } else {
                return matches.slice(0, 2).join("");
            }
        }
    },
    mounted() {
        console.log("Component mounted.");
    }
};
</script>
