<template>
    <div class="media  p-2">
        <UserPhoto :user="comment.user" size="24" class="mr-3 mt-3"></UserPhoto>

        <div
            class="media-body  border border-left-0 border-right-0 border-top-0"
        >
            <div class="d-flex d-flex justify-content-between">
                <h6>
                    {{ comment.user.first_name }} {{ comment.user.surname }}
                    <small
                        ><i class="text-text-secondary">
                            {{ this.momentFromNow(comment.created_at) }}</i
                        ></small
                    >
                </h6>

                <div>
                    <div class="dropdown show">
                        <a
                            class="dropdown-toggle"
                            role="button"
                            id="dropdownMenuLink"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <!-- <i class="fas fa-ellipsis-v"></i> -->
                        </a>

                        <div
                            class="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                        >
                            <a
                                class="dropdown-item  text-primary"
                                role="button"
                                v-if="isAbleToEditComment"
                                ><i class="far fa-edit"></i> Edit this comment</a
                            >
                            <a
                                class="dropdown-item text-danger"
                                v-if="isAbletoDeleteComment"
                                role="button"
                                @click="deleteComment(comment)"
                                ><i class="far fa-trash-alt"></i> Delete this
                                comment</a
                            >

                        </div>
                    </div>
                </div>
            </div>

            <p>
                {{ comment.body }}
            </p>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto";

export default {
    name: "CommentListItem",
    props: ["comment",'post'],
    components: { UserPhoto },
    data() {
        return {
            body: "",
            bodyState: null
        };
    },
    methods: {

        deleteComment(comment){
            console.log(comment)
        }

    },computed:{
        isMyComment() {

            return this.comment.user.id == this.$store.getters.activeUser.id;
        },
        isAbleToEditComment() {
            return this.comment.user.id == this.$store.getters.activeUser.id;
        },
        isAbletoDeleteComment() {

            return (this.comment.user.id == this.$store.getters.activeUser.id) || (this.post.user.id == this.$store.getters.activeUser.id);
        },
    }
};
</script>
