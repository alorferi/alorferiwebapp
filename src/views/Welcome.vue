<template>
    <div class="row" style="padding-top: 60pt">
        <div class="col-sm-4">
            <img
                src="../assets/slider_imgs/img_02.png"
                alt="Los Angeles"
                width="360px"
            />
        </div>

        <div class="col-sm-4 text-center">
            <!-- <img src="" width="250" alt="Alor Feri logo"> -->
            <img
                alt="Alor Feri logo"
                src="../assets/images/defaults/logo_large.png"
                width="255"
            />


   <br />
   <br />
   <br />

                 <a
                href="https://play.google.com/store/apps/details?id=com.provatsoft.alorferi"
                target="_blank"
            >
                <img
                    src="../assets/images/defaults/google_play_get_on.png"
                    width="250"
                    alt="Alor Feri logo"
                />
            </a>

            <br />
            <br />



        </div>

        <div class="col-sm-4">
            <Login />
        </div>
    </div>
</template>

<script>
// import Login from "@/views/auth/Login";
import Login from "@/views/auth/LoginWithUserName";
export default {
    name: "Welcome",
    components: {
        Login
    },
    mounted: function() {},
    computed: {},
    props: {
        msg: String
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
