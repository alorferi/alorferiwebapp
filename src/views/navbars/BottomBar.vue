<template>
    <div class="border-top p-2">

        <div class="d-flex  justify-content-between">
            <div class="text-center p-3">
                <img
                    alt="Logo of Alor Feri"
                    src="@/assets/images/defaults/logo_large.png"
                    width="128"
                />
            </div>

            <div class="">
                <div class="pl-1">
                    Alor Feri
                </div>

                <div class="pl-1" v-if="showPrivacyPolicy">
                    Privacy Policy
                </div>

                <div class="pl-1" v-if="showPricing">
                    <router-link :to="{ name: 'pricing' }">
                        Pricing</router-link
                    >
                </div>

                <div class="pl-1" v-if="showTerms">
                    Terms
                </div>

                <div class="pl-1" v-if="showHelp">
                    Help
                </div>

                <div class="pl-1">
                    Awards
                </div>
                <div class="pl-1">
                    Research
                </div>

                <div class="pl-1">
                    <router-link :to="{ name: 'about' }">About</router-link>
                </div>
            </div>

            <div class="">
                <div class="pl-1">
                   Employers
                </div>

                <div class="pl-1">
                   Post a job
                </div>

                <div class="pl-1">
                 Get a free Employer
                </div>

            </div>

            <div class="">
                <div class="pl-1">
                   Community
                </div>



                <div class="pl-1">
                    Privacy Policy
                </div>

                <div class="pl-1">
                   Contact us
                </div>

                <div class="pl-1" >
                    Terms
                </div>

                <div class="pl-1">
                    Help
                </div>



            </div>



            <div class="">
                <div class="pl-1">
                   Work with us
                </div>



                <div class="pl-1">
                    Advertisers
                </div>

                <div class="pl-1" v-if="showPricing">
                    Developers
                </div>

                <div class="pl-1">
                    Careers
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


                <div class="mt-1">

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

        <div>
            <div></div>
            <div></div>
            <div></div>
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
        return {
            showPrivacyPolicy: false,
            showPricing: true,
            showTerms: false,
            showHelp: false
        };
    },
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
