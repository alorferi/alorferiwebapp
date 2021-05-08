<template>
    <div class="form-group">
        <label :for="name" class="text-primary">
            {{ label }}
        </label>
        <div class="input-group">
            <div class="input-group-prepend">
                   <span class="input-group-text" v-if="icon">
                            <i :class="icon"></i>
                    </span>
                <select
                    class="form-control"
                    id="country_code"
                    v-model="countryCode"
                    @change="updateField()"
                >
                    <option value="+880" selected>+880</option>
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                </select>
            </div>

            <input
                type="phone"
                :id="name"
                class="form-control"
                v-model="mobileNumber"
                @blur="onBlurMobileNumber"
                size="13"
                minlength="10"
                maxlength="13"
                pattern="(([0-9]{11})|([1-9]{10}))(#[1-9]{1})?"
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
    name: "MobileNumberField",
    props: ["name", "label", "placeholder", "errors", "data",'icon'],
    mounted() {},
    data: function() {
        return {
            countryCode: "+880",
            mobileNumber: "",

        };
    },
    computed: {

        mobileNumberWithCountryCode(){
            return this.countryCode + this.mobileNumber;
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
            this.$emit("update:field",  this.mobileNumberWithCountryCode);
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
        onBlurMobileNumber(e) {
            console.log("blur", e.target.value);

            if(e.target.value.startsWith("0",0)){
               this.mobileNumber =  e.target.value.substring(1);
               this.updateField()
            }

            // var value = parseInt(e.target.value, 10);
            // if (isNaN(value) == false) {
            //    this.mobileNumber = value;
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
                    this.mobileNumber = newVal;
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
