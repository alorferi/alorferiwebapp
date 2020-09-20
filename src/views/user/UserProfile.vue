<template>
    <div>
        <div class="fb-profile">
            <img
                id="coverImg"
                align="left"
                class="fb-image-lg"
                src="http://babulmirdha.com/wp-content/uploads/2020/08/53389214_10156369705603922_2990639677289005056_o.jpg"
                alt="Profile image example"
                v-on:click="clickCover"
            />
            <img
                align="left"
                class="fb-image-profile rounded-circle"
                src="https://lh3.googleusercontent.com/5ylhx9Mwx1HbCArBj8spYIhSsGtrmxFAJnqJfeXdV8GdCE7FANZa0PolHmkxkREFkOdBbxSMeUZVGaxeV2bg1KQQaTJN-DkVBoSRGaCjcIFYXa1kN1FCb72At-oOro9So9N3bfTM"
                alt="Profile image example"
            />

             <p v-if="is_loading_user">Loading user</p>

            <div v-else class="fb-profile-text pl-3">
                <h3>{{ user.first_name }} {{ user.surname }}</h3>
                <p>{{ user.motto }}</p>
            </div>

            <!-- The Modal -->
            <div id="myModal" class="modal">
                <span id="closeModel" class="close text-white" v-on:click="closeModel"
                    >&times;</span
                >
                <img class="modal-content" id="img01" />
                <div id="caption"></div>
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
import Post from "@/views/post/Post";
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
        var user_id =
            this.$route.params.user_id == undefined
                ? this.$store.getters.user.id
                : this.$route.params.user_id;

        this.$axios
            .get(this.getApiUrl("/api/users/" + user_id), {
                headers: {
                    Authorization: "Bearer " + this.$store.getters.access_token
                }
            })
            .then(response => (this.user = response.data.data))
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.is_loading_user = false;
            });

        this.$axios
            .get(this.getApiUrl("/api/users/" + user_id + "/posts"), {
                headers: {
                    Authorization: "Bearer " + this.$store.getters.access_token
                }
            })
            .then(response => (this.posts = response.data.data))
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                this.is_loading_posts = false;
            });
    },
    methods: {
        clickCover: function(event) {
            var myModal = document.getElementById("myModal");
            var modalImg = document.getElementById("img01");
            var captionText = document.getElementById("caption");
            myModal.style.display = "block";
            modalImg.src = event.target.src;
            captionText.innerHTML = event.target.alt;
        },
        closeModel: () => {
            var myModal = document.getElementById("myModal");
            myModal.style.display = "none";
        }
    }
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
    object-position: 100% 30%;
}

.fb-image-profile {
    margin: -200px 10px 0px 50px;
    z-index: 9;
    width: 20%;
    height: 20%;
}

@media (max-width: 768px) {
    .fb-profile-text > h3 {
        font-weight: 700;
        font-size: 16px;
    }

    .fb-image-profile {
        margin: -45px 10px 0px 25px;
        z-index: 9;
        width: 20%;
    }
}

#coverImg:hover {
    opacity: 0.5;
}

/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
}

/* Modal Content (image) */
.modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
}

/* Caption of Modal Image */
#caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
}

/* Add Animation */
.modal-content,
#caption {
    animation-name: zoom;
    animation-duration: 0.6s;
}

@keyframes zoom {
    from {
        transform: scale(0.1);
    }
    to {
        transform: scale(1);
    }
}

/* The Close Button */
.close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
}

.close:hover,
.close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
    .modal-content {
        width: 100%;
    }
}
</style>
