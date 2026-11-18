<template>
    <article class="ui-card social-discovery-card">
        <UserPhoto :user="item" size="56" />
        <h2>
            <router-link :to="{ name: 'users.show', params: { user_id: item.id } }"
                >{{ item.first_name }} {{ item.surname }}</router-link
            >
        </h2>
        <p v-if="item.nickname">{{ item.nickname }}</p>
        <span class="social-course-meta">{{ $t("social.readers") }}</span>
    </article>
</template>
<script>
import UserPhoto from "./UserPhoto";
export default { name: "UserListItem", props: ["item"], components: { UserPhoto } };
</script>
