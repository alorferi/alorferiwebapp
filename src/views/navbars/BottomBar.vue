<template>
    <div class="border-top p-2">
        <div class="d-flex  justify-content-between">
            <div class="text-center p-3">
                <router-link :to="{ name: 'home' }">
                    <img
                        alt="Logo of Alor Feri"
                        src="@/assets/images/defaults/logo_large.png"
                        width="128"
                /></router-link>
            </div>

            <div class="flex-fill">
                <div class="mr-4  border-bottom font-weight-bold">
                    Alor Feri
                </div>

                <div>
                    <router-link :to="{ name: 'about' }">About</router-link>
                </div>

                <div>
                    <router-link :to="{ name: 'products' }"
                        >Products</router-link
                    >
                </div>

                <div>
                    <router-link :to="{ name: 'pricing' }">Pricing</router-link>
                </div>

                <div>
                    <router-link :to="{ name: 'awards' }">Awards</router-link>
                </div>
                <div>
                    <router-link :to="{ name: 'research' }"
                        >Research</router-link
                    >
                </div>
            </div>

            <div class="flex-fill">


                <div class=" mr-4 border-bottom font-weight-bold">
                    Libraries
                </div>

                <div>

                       <router-link :to="{ name: 'help' }"> Create & Manage</router-link>
                </div>

                <div>
                    <a href="https://backoffice.alorferi.com" target="_blank">
                        Back Office
                    </a>
                </div>

                <div class=" mr-4  mt-2 border-bottom font-weight-bold">
                    Employers
                </div>

                <div>


                    <router-link :to="{ name: 'advertisers' }">
                        Post a job</router-link
                    >

                </div>

                <div class="mb-2">

                    <router-link :to="{ name: 'careers' }">
                        Get a free Employer</router-link
                    >


                </div>

            </div>

            <div class="flex-fill">
                <div class="mr-4  border-bottom font-weight-bold">
                    Community
                </div>

                <div>
                    <router-link :to="{ name: 'privacy-policy' }">
                        Privacy Policy</router-link
                    >
                </div>

                <div>
                    <router-link :to="{ name: 'help' }">Help</router-link>
                </div>

                <div>
                    <router-link :to="{ name: 'contact-us' }">
                        Contact Us</router-link
                    >
                </div>
            </div>

            <div class="flex-fill">
                <div class=" mr-4 border-bottom font-weight-bold">
                    Work with us
                </div>

                <!-- <div>
                    <router-link :to="{ name: 'advertisers' }">
                        Advertisers</router-link
                    >
                </div>

                <div>
                    <router-link :to="{ name: 'careers' }">
                        Careers</router-link
                    >
                </div> -->

                <div>
                    <router-link :to="{ name: 'api-overview' }">
                        Developers</router-link
                    >
                </div>
            </div>

            <div>
                <div class="ml-2">
                    Download the App
                </div>

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

                <div class="mt-1 ml-2">
                    Get us on:

                    <a
                        class="p-1"
                        href="https://fb.com/alorferi"
                        target="_blank"
                    >
                        <img
                            src="@/assets/images/icons/ic_facebook.png"
                            width="32"
                            alt="Alor Feri logo"
                        />
                    </a>

                    <a
                        class="p-1"
                        href="https://youtube.com/@alorferi"
                        target="_blank"
                    >
                        <img
                            src="@/assets/images/icons/ic_youtube.png"
                            width="32"
                            alt="Alor Feri logo"
                        />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import LanguageToggleLink from "@/components/LanguageToggleLink";

export default {
    name: "Login",
    props: {
        msg: String
    },
    components: {
        // LanguageToggleLink
    },
    mounted: function() {},
    data() {
        return {};
    },
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
