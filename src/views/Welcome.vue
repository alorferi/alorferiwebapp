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
                src="../assets/logo_large.png"
                width="200"
            />

            <h3 style="color:#0000A0;text-shadow: 1px 1px #ffffff;">
                <br />
                এসো বই পড়ি <br />
                আলোকিত সমাজ গড়ি।
            </h3>

            <br />
            <br />

            <a
                href="https://play.google.com/store/apps/details?id=com.provatsoft.alorferi"
                target="_blank"
            >
                <img
                    src="../assets/google_play_get_on.png"
                    width="250"
                    alt="Alor Feri logo"
                />
            </a>

            <br />
            <br />
        </div>

        <div class="col-sm-4">
            <login />
        </div>
    </div>
</template>

<script>
import Login from "@/views/auth/Login";
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
