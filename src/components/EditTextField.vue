<template>
    <div class="mb-4">
        <label :for="name" v-if="label" class="text-primary">{{ displayLabel }}</label>

        <div class="flex w-full items-stretch">
            <div class="flex">
                <span class="ui-input-addon" v-if="icon">
                    <i :class="icon"></i>
                </span>
            </div>
            <input
                :type="type"
                :name="name"
                class="ui-field"
                :id="name"
                :required="required"
                :maxlength="maxlength"
                :aria-describedby="hasError ? name + '-error' : undefined"
                :aria-invalid="hasError ? 'true' : undefined"
                v-model="value"
                :placeholder="displayLabel || placeholder"
                :class="errorClassObject()"
                @input="updateField()"
            />
        </div>
        <p v-if="hasError" :id="name + '-error'" class="text-danger" v-text="errorMessage()"></p>
    </div>
</template>

<script>
export default {
  emits: ["update:field"],
  name: "EditTextField",
  props: {
    name: String,
    label: String,
    placeholder: String,
    type: String,
    errors: Object,
    initval: [String, Number],
    icon: String,
    data: [String, Number],
    required: Boolean,
    maxlength: Number
  },
  async mounted() {},
  data: function () {
    // this.updateField()
    return {
      value: this.data != null ? this.data : this.initval
    };
  },
  computed: {
    displayLabel() {
      const key = {
        name: "libraryName",
        address: "address",
        email: "email",
        mobile: "mobile",
        founded_at: "foundedAt",
        post_code: "postCode",
        first_name: "firstName",
        surname: "lastName",
        dob: "dob"
      }[this.name];
      return key ? this.$t("social." + key) : this.label;
    },
    hasError: function () {
      return this.errors && this.errors[this.name] && this.errors[this.name].length > 0;
    }
  },
  methods: {
    updateField: function () {
      this.clearErrors(this.name);
      this.$emit("update:field", this.value);
    },
    errorMessage: function () {
      if (this.hasError) {
        return this.errors[this.name][0];
      }
    },
    clearErrors: function () {
      if (this.hasError) {
        this.errors[this.name] = null;
      }
    },
    errorClassObject: function () {
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
@reference "@/styles/tailwind.css";

.error-field {
    @apply border-danger;
}
</style>
