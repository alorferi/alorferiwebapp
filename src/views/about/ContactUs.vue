<template>
    <div class=" border-left border-right ">
        <div class="jumbotron text-center" style="margin-bottom:0">
            <h1 class="text-center">Contact Us</h1>
            <h4>We are here for you</h4>
        </div>

        <div class="p-4">
            <h5>
                Address
            </h5>
            <div>
                <p>
                    Alor Feri Limited
                </p>

                <p>
                    241/A, North Kazipara
                </p>

                <p>
                    Kafrul, Mirpur, Dhaka - 1216
                </p>





                <div>
                    <a :href="companyContact.map" target="_blank" rel="noopener noreferrer"> <i class='fas fa-map-marker-alt' style='color:red'></i> View Map</a>
                </div>
            </div>
        </div>

        <div class="p-4">
            <h5>
                Mobile
            </h5>
            <div>
                Call us:  <a :href="'tel:' + companyContact.phone">{{ companyContact.phoneLabel }}</a>

            </div>
        </div>

        <div class="p-4">
            <h5>
                E-mail
            </h5>
            <div>
                Email us:  <a :href="'mailto:' + companyContact.email">{{ companyContact.email }}</a>
            </div>
        </div>
        <div class="p-4">
            <h5>
                Facebook
            </h5>
            <div>
                Send us a direct message from our
                <a :href="companyLinks.facebook" target="_blank" rel="noopener noreferrer"
                    >Facebook Page</a
                >
            </div>
        </div>







    </div>
</template>

<script>
import { companyLinks, companyContact } from "@/config/company";

export default {
    name: "ContactUs",
    components: {},
    mounted: function() {},
    computed: {},
    props: {},
    data() {
        return { companyLinks, companyContact };
    },
    methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
