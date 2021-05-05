<template>
    <div class="">
        <Loading v-if="loading" />
        <div v-else>

            <UserPager/>
        </div>
    </div>
</template>

<script>
import Loading from "../../components/Loading";
import axios from "axios";
import UserPager from "./UserPager"


export default {
    name: "ShowUser",
    components: {
        Loading, UserPager
    },
    mounted() {
        this.fetchUser(this.$route.params.id)
    },

    computed: {
        user(){
           return this.$store.getters.user;
        },

    },
    data: function() {
        return {
            loading: true,
            delete_modal: false,
        };
    },
    methods: {
        fetchUser(userId){
                this.$store
                .dispatch("fetchUser", userId)
                .then(() => {
                    this.loading = false;
                })
                .catch(() => {
                    this.loading = false;
                });

        },
        destroy: function() {
            axios
                .delete(
                    this.getApiUrl("/api/libraries/" + this.$route.params.id)
                )
                .then(response => {
                    this.$router.push("/user/my-libraries");
                    console.info(response);
                })
                .catch(error => {
                    alert("Internal error, unable to delete contact.");

                    if (error.response.status === 404) {
                        this.$router.push("/user/my-libraries");
                    }
                });
        }
    }
};
</script>
