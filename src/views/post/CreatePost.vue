<template>
    <div>
        <div class="card">
            <!-- <div class="card-header">Create post</div> -->
            <div class="card-body d-flex  align-items-center">
                <UserPhoto :user="activeUser" size="40"></UserPhoto>

                <input
                    class="form-control ml-3"
                    rows="1"
                    id="comment"
                    name="body"
                    placeholder="Write something..."
                    readonly
                    v-b-modal.modal-prevent-closing
                />
            </div>
            <!-- <div class="card-footer justify-content-end d-flex">
                <button class="btn btn-primary ml-auto">Post</button>
            </div> -->

            <b-modal
                id="modal-prevent-closing"
                ref="modal"
                title="Write something"
                @show="resetModal"
                @hidden="resetModal"
                 ok-title="Post"
                @ok="handleOk"
            >
                <div class="d-flex align-items-center m-2">
                    <UserPhoto :user="activeUser" size="16"></UserPhoto>

                    <div class="ml-2">
                        {{ activeUser.first_name }} {{ activeUser.surname }}
                        {{ activeUser.nickname }}
                    </div>
                </div>
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group
                        label-for="name-input"
                        invalid-feedback="Name is required"
                        :state="bodyTextState"
                    >
                        <!-- <b-form-input
            id="name-input"
            v-model="name"
            :state="bodyTextState"
            required
          ></b-form-input> -->

                        <b-form-textarea
                            id="textarea"
                            v-model="bodyText"
                            placeholder="Enter something here..."
                            rows="3"
                            max-rows="6"
                            :state="bodyTextState"
                            required
                        ></b-form-textarea>
                    </b-form-group>
                </form>
            </b-modal>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";

export default {
    name: "CreatePost",
    components: {
        UserPhoto
    },
    computed: {
        activeUser() {
            return this.$store.getters.user;
        }
    },
    data() {
        return {
            bodyText: null,
             bodyTextState: null,
        }
    },    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.bodyTextState = valid
        return valid
      },
      resetModal() {
        this.bodyText = ''
        this.bodyTextState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.bodyText)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
};
</script>
