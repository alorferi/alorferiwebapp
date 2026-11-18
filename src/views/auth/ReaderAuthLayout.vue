<template>
    <div class="reader-welcome reader-page reader-auth-layout" :class="mode === 'login' ? 'reader-home' : 'reader-register-page'">
        <a class="reader-skip" href="#reader-auth">{{ mode === 'login' ? copy.skip : copy.skipSignup }}</a>
        <header class="reader-header reader-container">
            <router-link class="reader-brand" :to="homeLocation" :aria-label="copy.homeLabel">
                <img src="@/assets/images/defaults/alorferi_logo_brand.png" alt="" width="44" height="44" />
                <span
                    >Alor Feri<small>{{ copy.brandCaption }}</small></span
                >
            </router-link>
            <div class="reader-language" role="group" :aria-label="copy.language">
                <button
                    type="button"
                    lang="en"
                    :aria-pressed="language === 'en' ? 'true' : 'false'"
                    @click="$emit('language-change', 'en')"
                >
                    EN
                </button>
                <span aria-hidden="true"></span>
                <button
                    type="button"
                    lang="bn"
                    :aria-pressed="language === 'bn' ? 'true' : 'false'"
                    @click="$emit('language-change', 'bn')"
                >
                    বাংলা
                </button>
            </div>
        </header>

        <main class="reader-main reader-container">
            <div class="reader-auth-hero">
                <section class="reader-story" aria-labelledby="reader-title">
                    <p class="reader-eyebrow"><span aria-hidden="true"></span>{{ copy.eyebrow }}</p>
                    <component :is="mode === 'login' ? 'h1' : 'h2'" id="reader-title" class="reader-hero-title">
                        {{ copy.titleStart }} <em>{{ copy.titleEnd }}</em>
                    </component>
                    <p class="reader-description">{{ copy.description }}</p>
                    <ul class="reader-values">
                        <li>
                            <svg viewBox="0 0 20 20" aria-hidden="true">
                                <path d="m3 4 7 2 7-2v12l-7 2-7-2V4Zm7 2v12" /></svg
                            >{{ copy.discover }}
                        </li>
                        <li>
                            <svg viewBox="0 0 20 20" aria-hidden="true">
                                <path d="m2 7 8-4 8 4H2Zm2 2v6m4-6v6m4-6v6m4-6v6M2 17h16" /></svg
                            >{{ copy.connect }}
                        </li>
                        <li>
                            <svg viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    d="M4 3h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H8l-4 3v-3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 4h8m-8 3h5"
                                /></svg
                            >{{ copy.share }}
                        </li>
                    </ul>
                </section>

                <div class="reader-art" aria-hidden="true">
                    <img
                        class="reader-illustration"
                        src="@/assets/illustrations/home-readers-bench.svg"
                        width="600"
                        height="350"
                        alt=""
                        decoding="async"
                    />
                    <p><span></span>{{ copy.artCaption }}<span></span></p>
                </div>
            </div>
            <div class="reader-auth-panel">
                <div class="reader-auth-content">
                    <slot />
                    <p class="reader-auth-caption">
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M5 7V5a3 3 0 0 1 6 0v2M4 7h8v7H4V7Z" /></svg
                        >{{ copy.authCaption }}
                    </p>
                </div>
            </div>
        </main>

        <footer class="reader-footer reader-container">
            <p>© {{ year }} Alor Feri<span aria-hidden="true">·</span>{{ copy.footerTagline }}</p>
            <nav :aria-label="copy.footerNavigation">
                <a :href="companyLinks.about" target="_blank" rel="noopener noreferrer">{{ copy.about }}</a>
                <a :href="companyLinks.careers" target="_blank" rel="noopener noreferrer">{{ copy.careers }}</a>
                <a :href="companyLinks.contact" target="_blank" rel="noopener noreferrer">{{ copy.contact }}</a>
                <a :href="$router.resolve({ name: 'help' }).href" @click.prevent="$emit('navigate', 'help')">{{ copy.help }}</a>
                <a :href="$router.resolve({ name: 'privacy-policy' }).href" @click.prevent="$emit('navigate', 'privacy-policy')">{{
                    copy.privacy
                }}</a>
            </nav>
        </footer>
    </div>
</template>

<script>
export default {
    name: "ReaderAuthLayout",
    emits: ["language-change", "navigate"],
    props: {
        mode: { type: String, required: true, validator: value => ["login", "register"].includes(value) },
        copy: { type: Object, required: true },
        language: { type: String, required: true },
        homeLocation: { type: Object, required: true },
        companyLinks: { type: Object, required: true },
        year: { type: Number, required: true },
    },
};
</script>
