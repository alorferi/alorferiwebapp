<template>
    <div class="border-top p-2">
        <div id="bars" class="d-flex flex-row justify-content-between">
            <div class="text-center p-3 port-item">
                <router-link :to="{ name: 'home' }">
                    <img
                        alt="Logo of Alor Feri"
                        src="@/assets/images/defaults/logo_large.png"
                        width="128"
                /></router-link>
            </div>

            <div class="flex-fill port-item">
                <div class="mr-4  border-bottom font-weight-bold">
                    {{ $t("alorferi") }}
                </div>

                <div>
                    <router-link :to="{ name: 'about' }">{{
                        $t("about")
                    }}</router-link>
                </div>

                <!-- <div>
                    <router-link :to="{ name: 'products' }"
                        >{{ $t('services') }}</router-link
                    >
                </div> -->

                <div>
                    <router-link :to="{ name: 'awards' }">{{
                        $t("awards")
                    }}</router-link>
                </div>
                <!-- <div>
                    <router-link :to="{ name: 'research' }"
                        >{{ $t('research') }}</router-link
                    >
                </div> -->
            </div>

            <div class="flex-fill port-item">
                <div class=" mr-4 border-bottom font-weight-bold">
                    {{ $t("libraries") }}
                </div>

                <div>
                    <router-link :to="{ name: 'help' }">
                        {{ $t("create_and_manage") }}</router-link
                    >
                </div>

                <div>
                    <a href="https://backoffice.alorferi.com" target="_blank">
                        {{ $t("back_office") }}
                    </a>
                </div>

                <div>
                    <router-link :to="{ name: 'pricing' }">{{
                        $t("pricing")
                    }}</router-link>
                </div>

                <!-- <div class=" mr-4  mt-2 border-bottom font-weight-bold">
                    {{ $t('employers') }}
                </div>

                <div>


                    <router-link :to="{ name: 'advertisers' }">
                        {{ $t('post_a_job') }}</router-link
                    >

                </div>

                <div class="mb-2">

                    <router-link :to="{ name: 'careers' }">
                        {{ $t('get_a_free_employer') }}   </router-link
                    >


                </div> -->
            </div>

            <div class="flex-fill port-item">
                <div class="mr-4  border-bottom font-weight-bold">
                    {{ $t("community") }}
                </div>

                <div>
                    <router-link :to="{ name: 'privacy-policy' }">
                        {{ $t("privacy_policy") }}
                    </router-link>
                </div>

                <div>
                    <router-link :to="{ name: 'help' }">
                        {{ $t("help") }}
                    </router-link>
                </div>

                <div>
                    <router-link :to="{ name: 'contact-us' }">
                        {{ $t("contact_us") }}
                    </router-link>
                </div>
            </div>

            <div class="flex-fill port-item">
                <div class=" mr-4 border-bottom font-weight-bold">
                    {{ $t("work_with_us") }}
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
                        {{ $t("developers") }}
                    </router-link>
                </div>
            </div>

            <div class="port-item">
                <div class="ml-2">
                    {{ $t("download_the_app") }}
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
                    {{ $t("get_us_on") }}
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
<style scoped>

@media screen and (max-width: 768px) {
  #bars {
    flex-direction: column !important;
  }
  .port-item {
    width: 100%;
  }
}
</style>
