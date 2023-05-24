<template>
    <div>
        <div class="row mb-5" style="padding-top: 50pt">
            <div class="col-sm-7 pl-2 text-center">
                <div class="ml-auto mr-auto pl-5 pr-5 mb-3">
                    <div class="text-success text-left">
                        <h1>{{ $t("alorferi") }}</h1>
                    </div>

                    <div class="text-left" style="font-size: 30px">
                        {{ $t("motto") }}
                    </div>

                    <div class="text-left mt-2">
                        <img
                            class="img-rounded"
                            src="@/assets/images/defaults/img_khude_pathok.png"
                            height="256"
                            alt="img_khude_pathok"
                        />
                    </div>
                </div>
            </div>

            <div class="col-sm-5 pl-5 pr-4">
                <Login />
            </div>
        </div>



        <LibraryPatrons class="mb-5"/>

        <NewsAndMediaReports class="mb-5"/>

        <Awards/>


    </div>
</template>

<script>
import Login from "@/views/auth/Login";
import LibraryPatrons from "@/views/welcome/LibraryPatrons";
import NewsAndMediaReports from "@/views/welcome/NewsAndMediaReports";
import Awards from "@/views/welcome/Awards";
export default {
    name: "Welcome",
    components: {
        Login,
        LibraryPatrons,
        NewsAndMediaReports,
        Awards
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
