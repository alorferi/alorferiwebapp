<template>
    <div>
        <div class="row" style="padding-top: 50pt">
            <div class="col-sm-7">
                <div class="mt-5">
                    <div class="text-success">
                        <h1>Alor Feri</h1>
                    </div>

                    <div style="font-size: 30px">
                        Connects readers, and libraries and enlightens society.
                    </div>
                </div>

                <!-- <img
                    src="@/assets/images/awards/building_smart_bangladesh.png"
                    alt="Book is distributed to the reader by bicycle."
                    width="600"
                /> -->

                <!-- <img
                    src="../assets/slider_imgs/img_02.png"
                    alt="Book is distributed to the reader by bicycle."
                    width="360px"
                /> -->
            </div>

            <!-- <div class="col-sm-4 text-center">
                <img
                    alt="Logo of Alor Feri"
                    src="@/assets/images/defaults/logo_large.png"
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
                        src="@/assets/images/defaults/google_play_get_on.png"
                        width="250"
                        alt="Alor Feri logo"
                    />
                </a>

                <br />
                <br />
            </div> -->

            <div class="col-sm-5 pl-4 pr-4">
                <Login />
            </div>
        </div>

        <br />
        <br />
        <br />
        <br />
        <div class="mt-auto">
            <BottomBar />
        </div>
    </div>
</template>

<script>
// import Login from "@/views/auth/Login";
import Login from "@/views/auth/Login";
import BottomBar from "@/views/navbars/BottomBar";
export default {
    name: "Welcome",
    components: {
        Login,
        BottomBar
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
