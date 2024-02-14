<template>
    <div class="card">

        <div class=" card-body ">
            <div class="row">
                <div class="col-md-6 ">
                    <h1>Alor Feri</h1>
                    <p style="text-align: justify;">
                        Alor Feri Limited stands at the forefront of technological innovation as a dynamic software
                        development company. Specializing in mobile app development using Flutter, Android, and iOS
                        technologies, as well as web-based applications and backend services utilizing Laravel, Vue.Js,
                        Django, and more.
                    </p>

                    <p style="text-align: justify;">

                        Alor Feri is committed to delivering cutting-edge solutions across diverse platforms.
                        We are professionals in designing, creating and deploying applications for pivotal tasks and
                        organization-wide ventures. Our specialized staff at Alor Feri approaches your difficulties
                        strategically, developing solutions and system administration services that suit your short and
                        long-term goals. We specialize in software development, which includes designing (UI/UX),
                        developing, maintaining, and promoting mobile apps as well as other web applications. Our aim is
                        to give our customers the best user experience in the business by providing proper solutions
                        through our resource pool of experienced individuals, cutting-edge technology, and industry best
                        practices.    <router-link :to="{ name: 'about' }">{{
                        $t("read_more")
                    }}</router-link>

                    </p>
                </div>
                <div class="col-md-6">
                    <img class="img-fluid rounded"
                        src="@/assets/images/news/interview_with_somoy_tv.jpg"
                        alt="Interview with somoy tv">
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
    .custom-section {
        margin-top: 20px;
        margin-bottom: 20px;
        border-radius: 20px;
        background-color: #fef8f8;

        padding: 20px;
    }
</style>

<script>
    export default {
        name: "AboutAlorFeri",
        components: {


        },
    };
</script>
