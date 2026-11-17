<template>
    <div class="flex items-start p-2">
        <UserPhoto :user="comment.user" size="24" class="mr-4 mt-4"></UserPhoto>

        <div class="min-w-0 flex-1 border border-l-0 border-r-0 border-t-0">
            <div class="flex justify-between">
                <h6>
                    {{ comment.user.first_name }} {{ comment.user.surname }}
                    <small
                        ><i class="text-secondary"> {{ this.momentFromNow(comment.created_at) }}</i></small
                    >
                </h6>

                <div>
                    <div class="relative">
                        <UiDropdown trigger-id="dropdownMenuLink" trigger-class="" label="Actions"
                            ><template #trigger>
                                <!-- <i class="fas fa-ellipsis-v"></i> -->
                            </template>
                            <a class="ui-menu-item text-primary" role="button" v-if="isAbleToEditComment"
                                ><i class="far fa-edit"></i> Edit this comment</a
                            >
                            <a
                                class="ui-menu-item text-danger"
                                v-if="isAbletoDeleteComment"
                                role="button"
                                @click="deleteComment(comment)"
                                ><i class="far fa-trash-alt"></i> Delete this comment</a
                            >
                        </UiDropdown>
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

            const packet = {
                overhead:{
                    post:this.post,
                    comment:comment
                }
            }

               this.$store
                .dispatch("deletePostComment", packet)
                .then(() => {
                })
                .catch(() => {
                })
                .finally();

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
