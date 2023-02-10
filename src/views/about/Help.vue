<template>
    <div class="about">
        <div class="d-flex justify-content-around">
            <div class="text-center p-2">
                <img
                    src="@/assets/images/defaults/logo_large_en.png"
                    height="180"
                    alt="Alor Feri logo"
                />
                <!-- <div class="text-center" style="font-size:13pt">
            আলোকিত সমাজের প্রত্যয়
        </div> -->
            </div>
            <div class="text-center p-2">
                <img
                    src="@/assets/images/defaults/af_mobile_app.png"
                    height="200"
                    alt="Alor Feri logo"
                />
            </div>
            <div class="text-center p-2">
                <img
                    src="@/assets/images/defaults/af_model_car.png"
                    height="200"
                    alt="Alor Feri logo"
                />
            </div>
        </div>

        <p style="text-align:justify">
            <span style="font-weight:bold">
                Alor Feri Limited
            </span>

            is a promising Bangladeshi technology startup founded in 2021 by Md
            Babul Mirdha. The company's mission is to empower libraries and
            connect readers with books and knowledge to improve the quality of
            education and enlighten society. With the Alor Feri app, the company
            provides a smart library management system that streamlines library
            operations and enhances the reading experience for users.

            <br />
            <br />
            Md Babul Mirdha started researching and developing the Alor Feri app
            back in 2015 while working as a software engineer at a private
            company. Today, the app is used by over 160 libraries and serves
            over 2,800 readers.
            <br />
            <br />
            Headquartered in Mirpur, Dhaka, Alor Feri Limited is dedicated to
            building a knowledge-based society through technology. With its
            innovative library management app, the company is making a
            significant impact in the local community by improving access to
            books and learning resources.
        </p>
        <!-- <h5>
            আলোর ফেরীর লক্ষ্য ও উদ্দেশ্য:
        </h5> -->

        <p style="text-align:justify">
            <b> Mission:</b>
            <br />
            To empower libraries and connect readers with books and knowledge to
            improve the quality of education and enlighten society.
        </p>

        <p>
            <b>
                Vision:
            </b>

            <br />
            To revolutionize the library experience for patrons and institutions
            alike, fostering stronger bonds between libraries and their
            communities, and promoting literacy, education, and social
            enrichment.
        </p>

        <p>
            <b>
                Goals:
            </b>

            <br />


            <ul>

                <li>
                    Streamline library tasks
                </li>

                <li>
                    Enhance library-reader connection
                </li>

                <li>
                    Provide valuable performance metrics
                </li>
                <li>
                    Measure library success
                </li>
                <li>
                    Improve the library experience for patrons
                </li>
                <li>
                    Improve the quality of education and enlighten society.
                </li>


            </ul>
        </p>

        <BottomBar />
    </div>
</template>



<script>

import BottomBar from "@/views/navbars/BottomBar";
export default {
    name: "Help",
    components: {
        BottomBar
    },
    mounted: function() {},
    computed: {},
    props: {

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>



