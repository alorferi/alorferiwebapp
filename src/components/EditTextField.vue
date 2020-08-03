<template>
    <div class="relative pb-4">
        <label
            :for="name"
            class="text-blue-500 pt-2 uppercase text-xs font-bold absolute"
            >{{ label }}</label
        >
        <input
            :type="type"
            :id="name"
            class="pt-8 w-full text-gray-900 border-b pb-2 focus:outline-none focus:border-blue-400"
            v-model="value"
            :placeholder="placeholder"
            :class="errorClassObject()"
            @input="updateField()"
        />
        <p class="text-red-600 text-sm" v-text="errorMessage()"></p>
    </div>
</template>

<script>
export default {
    name: "EditTextField",
    props: ["name", "label", "placeholder", "type", "errors", "data"],
    mounted() {},
    data: function() {
        return {
            value: ""
        };
    },
    computed: {
        hasError: function() {
            return (
                this.errors &&
                this.errors[this.name] &&
                this.errors[this.name].length > 0
            );
        }
    },
    methods: {
        updateField: function() {
            this.clearErrors(this.name);
            this.$emit("update:field", this.value);
        },
        errorMessage: function() {
            if (this.hasError) {
                return this.errors[this.name][0];
            }
        },
        clearErrors: function() {
            if (this.hasError) {
                this.errors[this.name] = null;
            }
        },
        errorClassObject: function() {
            return {
                "error-field": this.hasError
            };
        }
    },

    watch: {
        data: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.value = newVal;
                }
            }
        }
    }
};
</script>

<style scoped>
.error-field {
    @apply .border-red-500 .border-b-2;
}
</style>
