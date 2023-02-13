<template>
    <div>
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                    <div>
                        &nbsp;
                    </div>
                    <h4 class="text-center mt-2">
                        Edit Profile
                    </h4>
                    <router-link
                        class="btn btn-outline-danger"
                        v-if="isItMe(user)"
                        :to="{ name: 'users.me' }"
                    >
                        X
                    </router-link>
                </div>

                <Loading v-if="is_loading" />
                <br />

                <div class="p-2 text-center">
                    <UserPhoto :user="user" size="96" />
                    <br />
                    <a
                        class="text-danger bg-white pl-1 pr-1 rounded"
                        v-if="isItMe(user)"
                        @click="
                            showUploadMyPhotoModal = !showUploadMyPhotoModal
                        "
                    >
                        <i class="fa fa-camera"></i>
                    </a>

                    <UploadMyPhotoModal
                        :show="showUploadMyPhotoModal"
                        @updateVisibleState="showUploadMyPhotoModal = $event"
                    />
                </div>

                <form @submit.prevent="submitForm">
                    <div class="col-md-12">
                        <div class="d-flex">
                            <div class="form-group flex-fill pr-2">
                                <EditTextField
                                    type="text"
                                    name="first_name"
                                    label="First Name"
                                    placeholder="First Name"
                                    :initval="user.first_name"
                                    icon=" "
                                    :errors="errors"
                                    @update:field="userData.first_name = $event"
                                />
                            </div>

                            <div class="form-group flex-fill pl-2">
                                <EditTextField
                                    type="text"
                                    name="surname"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    :initval="user.surname"
                                    icon=" "
                                    :errors="errors"
                                    @update:field="userData.surname = $event"
                                />
                            </div>
                        </div>

                        <div class="form-group">
                            <EditTextField
                                name="mobile"
                                type="phone"
                                label="Mobile"
                                placeholder="Mobile"
                                :initval="user.mobile"
                                icon="fas fa-mobile"
                                :errors="errors"
                                @update:field="userData.mobile = $event"
                            />
                        </div>

                        <div class="form-group">
                            <EditTextField
                                name="email"
                                type="email"
                                label="E-mail"
                                placeholder="E-mail"
                                :initval="user.email"
                                icon="fas fa-at"
                                :errors="errors"
                                @update:field="userData.email = $event"
                            />
                        </div>

                        <!-- {{ this.formatDate(new Date( userData.dob), "YYYY-MM-DD", "en") }} -->

                        <div class="form-group">
                            <EditTextField
                                type="date"
                                name="dob"
                                :initval="
                                    this.formatDate(
                                        new Date(userData.dob),
                                        'YYYY-MM-DD',
                                        'en'
                                    )
                                "
                                label="Date of birth"
                                placeholder="DD/MM/YYYY"
                                icon="fas fa-birthday-cake"
                                :errors="errors"
                                @update:field="userData.dob = $event"
                            />
                        </div>

                        <div>
                            <GenderInputField
                                name="gender"
                                label="Gender"
                                :initval="user.gender"
                                :errors="errors"
                                @update:field="userData.gender = $event"
                            />
                        </div>

                        <div class="form-group">
                            <button
                                type="submit"
                                class="btn btn-primary"
                                style="width:100%"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import EditTextField from "../../components/EditTextField";
import GenderInputField from "../../components/GenderInputField";
import UserPhoto from "@/views/user/UserPhoto";
import Loading from "../../components/Loading";
import UploadMyPhotoModal from "@/views/user/UploadMyPhotoModal.vue";

export default {
    name: "EditMyProfile",
    props: {
        msg: String
    },
    components: {
        EditTextField,
        // MobileNumberField,
        GenderInputField,
        // AskForOtcModal,
        Loading,
        UserPhoto,
        UploadMyPhotoModal
    },
    async mounted() {
        this.userData.first_name = this.user.first_name;
        this.userData.mobile = this.user.mobile;
        this.userData.email = this.user.email;
        this.userData.dob = this.user.dob;
        this.userData.gender = this.user.gender;
        // this.fetchMe();
    },
    computed: {
        user() {
            return this.$store.getters.activeUser;
        }
    },
    data() {
        return {
            userData: {
                first_name: "",
                mobile: "",
                email: "",
                dob: "",
                gender: ""
            },
            errors: null,
            is_loading: false,
            showUploadMyPhotoModal: false
        };
    },
    methods: {
        submitForm: function() {
            const self = this;
            self.is_loading = true;
            var packet = {
                formData: self.userData
            };

            self.$store
                .dispatch("updateMe", packet)
                .then(() => {
                    this.$router.push({ name: "users.me" });
                })
                .catch(errors => {
                    console.log(errors);
                    try {
                        if (errors.response.data.errors) {
                            self.errors = errors.response.data.errors;
                        }
                    } catch (err) {
                        self.errors = err;
                    }
                })
                .finally(() => {
                    self.is_loading = false;
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
