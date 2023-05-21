<template>
    <div>
        <div class="row" style="padding-top: 50pt">
            <div class="col-sm-7 pl-2 text-center">
                <div class="mt-5 ml-auto mr-auto p-5">
                    <div class="text-success text-left">
                        <h1>{{ $t("alorferi") }}</h1>
                    </div>

                    <div class="text-left" style="font-size: 30px">
                        {{ $t("motto") }}
                    </div>
                </div>
            </div>

            <div class="col-sm-5 pl-5 pr-4">
                <Login />
            </div>
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
