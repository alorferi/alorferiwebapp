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
    name: "ShowMe",
    components: {
        Loading, UserPager
    },
  async mounted(){
        this.fetchMe()
    },

    computed: {
        user(){
           return this.$store.getters.activeUser;
        },

    },
    data: function() {
        return {
            loading: true,
            delete_modal: false,
        };
    },
    methods: {
        fetchMe(){
                this.$store
                .dispatch("fetchMe")
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
