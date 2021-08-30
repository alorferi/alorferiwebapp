<template>
    <div>
        <div class="card">
            <div class="card-body d-flex  align-items-center">

                       <router-link
                :to="{
                    name: 'users.show',
                    params: { user_id: this.activeUser.id }
                }"
            >
                <UserPhoto :user="activeUser" size="32"> </UserPhoto>
                       </router-link>

                <button
                    type="button"
                    class="ml-3 form-control btn btn-outline-info"
                    v-b-modal.createPostModal
                >
                    Start a discussion
                </button>
            </div>

    <CreaUserPostModel :show="showCreaUserPostModel" @updateVisibleState="showCreaUserPostModel = $event"/>

        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";
import CreaUserPostModel from "./CreateUserPostModel.vue";
// import ImageUploader from "vue-image-upload-resize";
// import ImageAutoResize from "../../components/ImageAutoResize";

export default {
    name: "CreatePost",
    components: {
        UserPhoto,
        // ImageAutoResize
        // ImageUploader,
        CreaUserPostModel
    },
    computed: {
        activeUser() {
            return this.$store.getters.activeUser;
        }
    },
    data() {
        return {
            title: "",
            body: "",
            bodyState: null,
            imgUrl: null,
            imgFile: null,
            hasImage: false,
            showCreaUserPostModel:false,
            // image: null
        };
    },
    methods: {

    }
};
</script>

<style scoped>
#fileInput {
    display: none;
}
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.my-8 {
    margin-top: 4rem;
    margin-bottom: 4rem;
}
</style>
