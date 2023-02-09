<template>
    <div>
        <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6">
<br>
<br>
                <Login/>
            </div>
            <div class="col-sm-3"></div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <BottomBar />
    </div>
</template>

<script>
import BottomBar from "@/views/navbars/BottomBar";
import Login from "@/views/auth/Login";
// import $ from 'jquery'

// import jQuery from 'jquery'

export default {
    name: "LoginContainer",
    props: {
        msg: String
    },
    components: {
        BottomBar,
        Login
    },
    mounted: function() {
        if (this.$store.getters.isLoggedIn) {
             this.$router.push({ name: "home" });
        }
    },
    computed: {},
    data() {
        return {

        };
    },
    methods: {

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
