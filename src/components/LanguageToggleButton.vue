<template>
    <div>
        <ul class="flex list-none rounded p-0 justify-center">
            <li
                aria-label="English"
                class="ui-page-item"
                :class="{ 'ui-selected': activeLanguage == 'en' }"
                @click="setLanguage('en')"
            >
                <a role="button" class="ui-page-link"
                    ><span aria-hidden="true">EN</span><span class="sr-only">English</span></a
                >
            </li>

            <li class="ui-page-item" :class="{ 'ui-selected': activeLanguage == 'bn' }" @click="setLanguage('bn')">
                <a role="button" aria-label="Bangla" class="ui-page-link"
                    ><span aria-hidden="true">বাং</span><span class="sr-only">Bangla</span></a
                >
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    computed: {
        activeLanguage() {
            return this.$store.getters.activeLanguage;
        }
    },
    methods: {
        setLanguage(lang) {
            this.$i18n.locale = lang;
            this.$store.dispatch("setActiveLanguage", lang);
        }
    }
};
</script>

<style></style>
