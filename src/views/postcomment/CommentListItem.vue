<template>
          <div class="media p-3">
                    <!-- <img
                        src="img_avatar2.png"
                        alt="Jane Doe"
                        class="mr-3 mt-3 rounded-circle"
                        style="width:45px;"
                    /> -->

                    <UserPhoto
                        :user="comment.user"
                        size="24"
                        class="mr-3 mt-3"
                    ></UserPhoto>

                    <div class="media-body">
                        <!-- <h4>
                            Jane Doe
                            <small><i>Posted on February 20 2016</i></small>
                        </h4> -->

                        <h6>
                            {{ item.user.first_name }} {{ item.user.surname }}
                            <small
                                ><i class="text-text-secondary">
                                    {{ this.momentFromNow(item.created_at) }}</i
                                ></small
                            >
                        </h6>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua.
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
