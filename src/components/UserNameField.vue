<template>
    <div class="form-group">
        <label :for="name" v-if="label" class="text-primary">
            {{ label }}
        </label>
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text" v-if="icon">
                    <i class="fas fa-at"></i>&nbsp;/&nbsp;<i
                        class="fas fa-mobile-alt"
                    ></i>
                </span>
            </div>

            <input
                type="text"
                :id="name"
                class="form-control"
                v-model="username"
                @blur="onBlurUserName"
                size="30"
                maxlength="330"
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
    name: "UserNameField",
    props: ["name", "label", "placeholder", "errors", "data", "icon"],
    async mounted() {},
    data: function() {
        return {
            countryCode: "+880",
            username: ""
        };
    },
    computed: {
        getFormattedUserName() {
            if (this.isNumber(this.username,"-"," ",",","+")) {
                 return this.formatBdMobileNumber(this.username);
            } else if (this.isValidEmail(this.username)) {
                return this.username;
            } else {
                return this.username;
            }
        },
        usernameWithCountryCode() {
            return this.countryCode + this.username;
        },

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
            this.$emit("update:field", this.getFormattedUserName);
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
        },
        onBlurUserName(e) {
            // console.log("blur", e.target.value);

            console.log("Mobile", this.formatBdMobileNumber(e.target.value));

            // if (e.target.value.startsWith("0", 0)) {
            //     this.username = e.target.value.substring(1);
            //     this.updateField();
            // }

            // var value = parseInt(e.target.value, 10);
            // if (isNaN(value) == false) {
            //    this.username = value;
            //    this.updateField()
            // }
        }

    },

    watch: {
        data: {
            // the callback will be called immediately after the start of the observation
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal != oldVal) {
                    this.username = newVal;
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
