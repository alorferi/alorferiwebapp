<template>
    <div>
        <div class="card">
            <div class="card-body d-flex  align-items-center">
                <UserPhoto :user="activeUser" size="40"> </UserPhoto>

                 <!-- <b-button class="ml-3 form-control" variant="outline-secondary"

                   v-b-modal.createPostModal

                 >Write something...</b-button> -->

                 <button type="button" class="ml-3 form-control btn btn-outline-info"  v-b-modal.createPostModal>Write something...</button>

            </div>

            <b-modal
                id="createPostModal"
                ref="modal"
                title="Write something"
                @show="resetModal"
                @hidden="resetModal"
                ok-title="Post"
                @ok="handleOk"
                hide-backdrop
                content-class="shadow"

            >
                <div class="d-flex align-items-center m-2">
                    <UserPhoto :user="activeUser" size="16"></UserPhoto>

                    <div class="ml-2">
                        {{ activeUser.first_name }} {{ activeUser.surname }}
                        {{ activeUser.nickname }}
                    </div>
                </div>
                <form ref="form" @submit.stop.prevent="handleSubmit">


                        <b-form-textarea
                            id="textarea"
                            v-model="body"
                            placeholder="Enter something here..."
                            rows="3s"
                            max-rows="6"
                            :state="bodyState"
                            required
                        >
                        </b-form-textarea>
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
            body: '',
            bodyState: null,
        }
    },    methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.bodyState = valid
        return valid
      },
      resetModal() {
        this.body = ''
        this.bodyState = null
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
        // Subit data to backend server



        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('createPostModal')
        })
      }
    }
};
</script>
