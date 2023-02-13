<template>
    <div class="form-group">
        <label :for="name" v-if="label" class="text-primary">{{ label }}</label>

        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" v-if="icon">
                    <i :class="icon"></i>
                </span>
            </div>
            <input
                :type="type"
                :name="name"
                class="form-control"
                v-model="value"
                :placeholder="placeholder"
                :class="errorClassObject()"
                @input="updateField()"
            />
        </div>
        <p class="text-danger" v-text="errorMessage()"></p>
    </div>
</template>

<script>
export default {
    name: "EditTextField",
    props: ["name", "label", "placeholder", "type", "errors", "initval", "icon"],
   async mounted() {},
    data: function() {
        this.updateField()
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
    @apply .border .border-danger .border-top-0 .border-left-0 .border-right-0;
}
</style>
