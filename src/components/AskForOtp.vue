<template>

<div >

    <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#otpModal">
  Open modal
</button> -->
<div id="otpModal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">One Time Code</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
            <input
               id="otp_code"
               v-model="otp_code"
             class="text-center" type="number" value name="otp_code" placeholder="Type 6-digit code here"   minlength="6" maxlength="6" pattern="[0-9]{6}"
            autofocus
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"/>

        </div>
        <div class="modal-footer">
            <button  type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          <!-- <button id="okOtpButton" type="button"  class="btn btn-primary">Ok</button> -->

              <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            OK
                        </button>

        </div>
      </div>
    </div>
  </div>
  </div>

</template>


<script>
export default {
  name: 'AskForOtp',
  props: {
    // msg: String
  },


}
</script>

<style scoped>

</style>

