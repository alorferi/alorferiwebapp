<template>
    <nav class="social-links" :aria-label="$t('social.navigation')">
        <router-link
            v-for="link in links"
            :key="link.route"
            :to="{ name: link.route }"
            class="social-nav-item"
            :class="{ 'is-current': active(link) }"
            :aria-current="active(link) ? 'page' : undefined"
            @click="$emit('navigate')"
        >
            <i :class="link.icon" aria-hidden="true"></i><span>{{ $t("social." + link.label) }}</span>
        </router-link>
    </nav>
</template>
<script>
export default {
  emits: ["navigate"],
  name: "AppLinks",
  computed: {
    links() {
      return [{
        route: "home",
        label: "feed",
        icon: "fas fa-home"
      }, {
        route: "libraries",
        label: "libraries",
        icon: "fas fa-book-open"
      }, {
        route: "users",
        label: "readers",
        icon: "fas fa-user-friends"
      }, {
        route: "courses.index",
        label: "courses",
        icon: "fas fa-graduation-cap"
      }];
    }
  },
  methods: {
    active(link) {
      const name = this.$route.name;
      if (link.route === "libraries") return ["libraries", "library-show", "library-edit", "library-create", "library-about", "unique-name"].includes(name);
      if (link.route === "courses.index") return ["courses.index", "courses.show", "courses.apply"].includes(name);
      if (link.route === "users") return ["users", "users.show"].includes(name);
      return name === link.route;
    }
  }
};
</script>
