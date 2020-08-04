<template>
    <div>
        <div class="card">
            <div class="card-body p-2 text-center">
                <i
                    class="far fa-user-circle"
                    style="width:100px;height:100px"
                ></i>

                <a href="/user/profile" class="stretched-link"> </a>
            </div>
            <!-- <img
                            src="@/assets/logo.png"
                            class="rounded m-2"
                            alt="Alor Feri Logo"
                        /> -->

            <div class="card-footer text-center">
                <span>Babul Mirdha</span>
            </div>

            <div class="card-footer text-center">
                <div>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-warning"></i>
                    <i class="fas fa-star text-secondary"></i>
                    <i class="fas fa-star text-secondary"></i>
                </div>
            </div>

            <div class="card-footer text-center">
                <a
                    class="btn btn-warning"
                    href="{% url 'user_edit_my_profile' %}"
                >
                    Edit Profile</a
                >
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "UserBadge",
    components: {}
};
</script>
