<template>
    <div>
        <div class="media border p-3 mt-3">
            <!-- <img
                src="@/assets/ic_user_male.png"
                alt="John Doe"
                class="mr-3 mt-3 rounded-circle"
                style="width:40px;height:40px"
            /> -->

            <UserPhoto :user="post.user" size="40"></UserPhoto>

            <div class="media-body pl-3">
                <h5>
                    {{post.user.first_name}} <small><i class="text-text-secondary"> {{ post.posted_at }}</i></small>
                </h5>
                <p>
                   {{post.body}}
                </p>


                <div v-if="post.image">

                    <img :src="post.image" alt="Posted image" class="w-100">

                </div>

                <!-- 4:3 aspect ratio -->
                <div v-if="getYouTubeEmbedUrl" class="embed-responsive embed-responsive-16by9">
                    <iframe
                        class="embed-responsive-item"
                        :src="getYouTubeEmbedUrl"
                    ></iframe>
                </div>

                <div class="d-flex justify-content-between">
                    <div class="p-2">
                        <i class="far fa-thumbs-up"></i> Iqbal and 137 others
                    </div>

                    <div class="p-2">
                        123 comments
                    </div>
                </div>

                <div
                    class="d-flex justify-content-between border border-left-0 border-right-0 border-bottom-0"
                >
                    <div>
                        <a href="#" class="btn btn-light">
                            <i class="far fa-thumbs-up"></i> Like</a
                        >
                    </div>

                    <a href="#" class="btn btn-light">  <i class="far fa-comment-dots"></i> Comment</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "../user/UserPhoto"
export default {
    name: "PostListItem",
    props: ['post'],
    components: {UserPhoto},
    data() {
        return {


        };
    },
    computed: {


        getYouTubeEmbedUrl: function() {

          var url = this.extractUrl(this.post.body)


        if(url){
          url = "https://www.youtube.com/embed/" +
                this.extractYouTubeVideoId(url)
        }



            return (
               url
            );
        }
    }
};
</script>
