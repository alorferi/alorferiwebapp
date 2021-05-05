<template>
     <div class="">
        <Loading v-if="loading" />
        <div v-else>

            <UserPager :user="user" />
        </div>
    </div>
</template>

<script>
import Loading from "../../components/Loading";
import UserPager from "./UserPager"


export default {
    name: "ShowUser",
    components: {
        Loading, UserPager
    },
    mounted() {
        this.fetchUser()
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
        fetchUser(){
                this.$store
                .dispatch("fetchUser", this.$route.params.user_id)
                .then(() => {
                    this.loading = false;
                })
                .catch(() => {
                    this.loading = false;
                });

        },
    }
};
</script>
