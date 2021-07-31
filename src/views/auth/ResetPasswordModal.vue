<template>
    <div>
        <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="One Time Code"
            @show="initModal"
            @hidden="resetModal"
            :ok-title="okTitleText"
            v-model="showOtcModal"
            :hide-header="hideHeader"
            @ok="handleOk"
            centered
        >
            <div class="modal-header">
                <h5 class="modal-title">Reset Password</h5>
            </div>

            <form ref="form" @submit.stop.prevent="handleSubmit" class="pt-4">
                <b-form-group
                    label=""
                    label-for="ot-code-input"
                    invalid-feedback="One Time Code is required"
                    :state="otCodeState"
                >
                    <div class="d-flex  justify-content-center">
                        <b-form-input
                            id="ot-code-input"
                            v-model="ot_code"
                            :state="otCodeState"
                            placeholder="Type 6-digit code here"
                            maxlength="6"
                            size="6"
                            pattern="\d*"
                            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                            type="number"
                            required
                        />
                    </div>

                    <div class="text-center text-danger">
                        {{ message }}
                    </div>
                </b-form-group>
            </form>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "ResetPasswordModal",
    props: ["showOtcModal"],
    computed: {},
    mounted: function() {},
    data() {
        return {
            ot_code: "",
            otCodeState: null,
            message: "",
            oldSetInterval: null,
            okTitleText: "OK",
            hideHeader: true
        };
    }
};
</script>

<style></style>
