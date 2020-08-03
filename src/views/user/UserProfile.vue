<template>
    <div class="row">
        <div class="col-md-3">
            <div class="card card-body">
                {% include 'user/my_profile_photo_with_full_name.html' %}
                <hr />
                <a
                    class="btn btn-warning"
                    href="{% url 'user_edit_my_profile' %}"
                >
                    Edit Profile</a
                >
            </div>
        </div>
        <div class="col-md-9">
            <div class="card card-body">
                <h5>
                    Career Objectives
                </h5>

                <hr />
                <p class="text-justify">
                    A resourceful individual with a proven track record in
                    implementing successful marketing strategies, boosting
                    organic traffic, and improving search rankings seeks a
                    position of Marketing Associate at ABC company to maximize
                    brand awareness and revenue through integrated marketing
                    communications.
                </p>
            </div>
            <br />
            <div class="card card-body">
                <h5>
                    Career Summery
                </h5>

                <hr />
                <p class="text-justify">
                    Having more than 5 years of working experiences with iOS,
                    Android, Windows Phone, Web & Desktop (.Net) app
                    development, I have worked with various languages,
                    technologies & tools in different environment with different
                    people with lots of enjoyment.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Feeds",
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.profile-pic {
    max-width: 200px;
    max-height: 200px;
    margin: 0 auto;
    border-radius: 50%;
}
</style>
