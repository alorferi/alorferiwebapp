<template>
    <div>
        <!-- <b-button variant="success" size="sm">বাং</b-button>   <b-button variant="secondary" size="sm">EN</b-button> -->

        <ul class="pagination justify-content-center">
            <li class="page-itemx"   :class="{ active: activeLanguage == 'bn' }"
             @click="setLanguage('bn')"
            >
                <a role="button" aria-label="Bangla" class="page-linkx"



                    ><span aria-hidden="true">বাংলা</span
                    ><span class="sr-only">Bangla</span></a
                >
            </li>

            <li aria-label="English" class="page-itemx"    :class="{ active: activeLanguage == 'en' }"
              @click="setLanguage('en')"
            >
                <a role="button" class="page-linkx"


                    ><span aria-hidden="true">English</span
                    ><span class="sr-only">English</span></a
                >
            </li>
        </ul>
    </div>
</template>

<script>
export default {


computed: {
    activeLanguage(){
           return this.$store.getters.activeLanguage;
    }
},
    methods: {
        setLanguage(lang){
            this.$store.dispatch("setActiveLanguage",lang);
        }
    }

};
</script>

<style></style>
