<template>
    <div class="">
        <Loading v-if="is_loading" />
        <div v-else>
            <UserPager :user="user" />
        </div>
    </div>
</template>

<script>
import Loading from "../../components/Loading";
import UserPager from "./UserPager";

export default {
    name: "ShowUser",
    components: {
        Loading,
        UserPager
    },
    async mounted() {
        this.fetchUser();
    },

    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    data: function() {
        return {
            is_loading: true,
        };
    },
    methods: {
        fetchUser() {
            const self = this;
            self.is_loading = true;
            this.$store
                .dispatch("fetchUser", this.$route.params.user_id)
                .then(() => {})
                .catch(() => {
                    self.$router.push({ name: "home" });
                })
                .finally(() => {
                    self.is_loading = false;
                });
        }
    }
};
</script>
