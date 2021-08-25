<template>
          <div class="media  p-2">

                    <UserPhoto
                        :user="comment.user"
                        size="24"
                        class="mr-3 mt-3"
                    ></UserPhoto>

                    <div class="media-body  border border-left-0 border-right-0 border-top-0">
                        <h6>
                            {{ comment.user.first_name }} {{ comment.user.surname }}
                            <small
                                ><i class="text-text-secondary">
                                    {{ this.momentFromNow(comment.created_at) }}</i
                                ></small
                            >
                        </h6>

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
    props: ["comment"],
    components: { UserPhoto },
    data() {
        return {
            body: "",
            bodyState: null
        };
    },
    methods: {}

}

</script>
