<template>
    <div class="mb-4">
        <label :for="name" class="text-primary">{{ label }}</label>

        <div class="flex w-full items-stretch mb-4 border">
            <div class="flex">
                <span class="ui-input-addon">
                    <i class="fas fa-venus-mars"></i>
                </span>
            </div>

            <label class="mr-3 inline-flex items-center gap-1 pl-2 pt-2">
                <input
                    type="radio"
                    :name="name"
                    v-model="value"
                    value="m"
                    :placeholder="placeholder"
                    :class="errorClassObject()"
                    @change="updateField()"
                />
                {{ $t("male") }}
            </label>
            <label class="mr-3 inline-flex items-center gap-1 pl-2 pt-2">
                <input
                    type="radio"
                    :name="name"
                    v-model="value"
                    value="f"
                    :placeholder="placeholder"
                    :class="errorClassObject()"
                    @change="updateField()"
                />
                {{ $t("female") }}
            </label>
            <label class="mr-3 inline-flex items-center gap-1 pl-2 pt-2">
                <input
                    type="radio"
                    :name="name"
                    v-model="value"
                    value="o"
                    :placeholder="placeholder"
                    :class="errorClassObject()"
                    @change="updateField()"
                />

                {{ $t("other") }}
            </label>
        </div>

        <p class="text-danger text-sm" v-text="errorMessage()"></p>
    </div>
</template>

<script>
export default {
    name: "GenderInputField",
    props: ["name", "label", "placeholder", "errors", "data","initval"],
  async mounted(){},
    data: function() {
        return {
            value: this.initval
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
    @apply border border-danger border-t-0 border-l-0 border-r-0;
}
</style>
