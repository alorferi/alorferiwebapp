<template>
    <div class="form-group">

        <label :for="name" v-if="label" class="text-primary">
            {{ label }}
        </label>
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" v-if="icon">
                    <i class="fas fa-key"></i>
                </span>
            </div>

            <input
                type="text"
                :id="name"
                class="form-control"
                v-model="password"
                size="30"
                maxlength="330"
                :placeholder="placeholder"
                :class="errorClassObject()"
                @input="updateField()"
                v-if="showPassword"
            />
            <input
                type="password"
                :id="name"
                class="form-control"
                v-model="password"
                size="30"
                maxlength="330"
                :placeholder="placeholder"
                :class="errorClassObject()"
                @input="updateField()"
                v-else
            />


            <div class="input-group-prepend"  @click="toggleShowPassword">

                <span class="input-group-text"  v-if="showPassword">
                    <i class="fas fa-eye-slash"></i>
                </span>

                <div class="input-group-text" v-else>
                    <i class="fas fa-eye"></i>
                </div>

            </div>
        </div>
        <p class="text-danger" v-text="errorMessage()"></p>
    </div>
</template>

<script>
export default {
    name: "PasswordField",
    props: ["name", "label", "placeholder", "errors", "data", "icon"],
    async mounted() {},
    data: function() {
        return {
            password: "",
            showPassword: false
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
            this.$emit("update:field", this.password);
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
        toggleShowPassword() {
            this.showPassword = !this.showPassword;
        },
        errorClassObject: function() {
            return {
                "error-field": this.hasError
            };
        },
    },

    watch: {
        data: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.password = newVal;
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
