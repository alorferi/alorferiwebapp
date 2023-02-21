<template>
    <div>
        <div class="card mb-3 p-3">
            <div class="d-flex">

                <UserPhoto :user ="item" size="48"/>

                <div class="pl-2">
                    <h4 class="ml-1 mt-3">{{ item.first_name }} {{ item.surname }} </h4>

                    <router-link
                        :to="{
                            name: 'users.show',
                            params: { user_id: item.id }
                        }"
                        class="stretched-link"
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
