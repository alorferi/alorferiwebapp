<template>
    <div class="form-group pb-1">
        <label
            :for="name"
            class="text-primary pt-2 uppercase text-xs font-bold absolute"
            >{{ label }}</label
        >
        <div class="input-group mb-3">
            <div class="input-group-prepend">

            <select class="form-control" id="country_code" v-model="country_code">
              <option value="+880" selected>+880</option>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
            </select>
          </div>

                  <input
            :type="type"
            :id="name"
            class="form-control pt-2 w-full text-gray-900 border-b pb-2 focus:outline-none focus:border-blue-400"
            v-model="value"
            :placeholder="placeholder"
            :class="errorClassObject()"
            @input="updateField()"
        />

        </div>

        <p class="text-danger text-sm" v-text="errorMessage()"></p>
    </div>
</template>

<script>
export default {
    name: "MobileInputField",
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
