<template>
    <div>
        <div class="ui-card mb-4 p-4">
            <div class="flex">
                <UserPhoto :user="item" size="48" />

                <div class="pl-2">
                    <h4 class="ml-1 mt-4">{{ item.first_name }} {{ item.surname }}</h4>

                    <router-link
                        :to="{
                            name: 'users.show',
                            params: { user_id: item.id },
                        }"
                        class="absolute inset-0"
                    >
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserPhoto from "@/views/user/UserPhoto";

export default {
    name: "UserListItem",
    props: ["item"],
    components: {
        UserPhoto
    },
    methods: {

        photoUrl(){
                return this.getApiUrl(this.item.photo_url)
        }

    }
};
</script>
