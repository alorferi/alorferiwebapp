<template>
    <div class="container-fluid h-100" style="overflow-y: scroll">
        <div class="fb-profile">
            <img
                align="left"
                class="fb-image-lg"
                src="https://wallpaperaccess.com/full/632200.jpg"
                alt="Profile image example"
            />
            <img
                align="left"
                class="fb-image-profile rounded-circle"
                src="https://lh3.googleusercontent.com/5ylhx9Mwx1HbCArBj8spYIhSsGtrmxFAJnqJfeXdV8GdCE7FANZa0PolHmkxkREFkOdBbxSMeUZVGaxeV2bg1KQQaTJN-DkVBoSRGaCjcIFYXa1kN1FCb72At-oOro9So9N3bfTM"
                alt="Profile image example"
            />
            <div class="fb-profile-text">
                <h1>{{ user.first_name }}</h1>
                <p>{{ user.motto }}</p>
            </div>
        </div>

        <div>
            <ul class="nav nav-tabs nav-justified">
                <li class="nav-item">
                    <a class="nav-link active" href="#">Timeline</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="#">Reading</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">About</a>
                </li>
            </ul>
        </div>

        <div>
            <p v-if="is_loading_posts">Loading posts</p>
            <Post
                v-else
                v-for="post in posts"
                v-bind:key="post.id"
                :post="post"
            />

            <div
                v-if="!is_loading_posts && posts.length < 1"
                class="alert alert-secondary text-center m-5"
            >
               No post found.
            </div>

            <br />
        </div>
    </div>
</template>

<script>
import Post from "@/views/home/Post";
export default {
    name: "UserProfile",
    components: { Post },
    data() {
        return {
            user: null,
            is_loading_user: true,
            posts: [],
            is_loading_posts: true
        };
    },
    computed: {},
    mounted() {
        this.$axios
            .get(this.getApiUrl("/api/users/" + this.$route.params.user_id))
            .then(response => (this.user = response.data.data))
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.is_loading_user = false;
            });

        this.$axios
            .get(
                this.getApiUrl(
                    "/api/users/" + this.$route.params.user_id + "/posts"
                )
            )
            .then(response => (this.posts = response.data.data))
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.is_loading_posts = false;
            });
    },
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.fb-profile img.fb-image-lg {
    z-index: 0;
    width: 100%;
    height: 320px;
    margin-bottom: 10px;
    object-fit: cover;
}

.fb-image-profile {
    margin: -300px 10px 0px 50px;
    z-index: 9;
    width: 20%;
    height: 20%;
}

@media (max-width: 768px) {
    .fb-profile-text > h1 {
        font-weight: 700;
        font-size: 16px;
    }

    .fb-image-profile {
        margin: -45px 10px 0px 25px;
        z-index: 9;
        width: 20%;
    }
}
</style>
