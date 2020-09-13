<template>
    <div class="form-group pb-1">
        <label
            :for="name"
            class="text-primary pt-2 uppercase text-xs font-bold absolute"
            >{{ label }}</label
        >

        <div class="input-group mb-3">
            <input
                type="radio"
                :name="name"
                class="form-control pt-2 w-full text-gray-900 border-b pb-2 focus:outline-none"
                v-model="value"
                value="m"
                :placeholder="placeholder"
                :class="errorClassObject()"
                @input="updateField()"
            />
            Male

            <input
                type="radio"
                :name="name"
                class="form-control pt-2 w-full text-gray-900 border-b pb-2 focus:outline-none"
                v-model="value"
                value="f"
                :placeholder="placeholder"
                :class="errorClassObject()"
                @input="updateField()"
            />
            Female
        </div>

        <p class="text-danger text-sm" v-text="errorMessage()"></p>
    </div>
</template>

<script>
export default {
    name: "GenderInputField",
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
    @apply .border .border-danger .border-top-0 .border-left-0 .border-right-0;
}
</style>
