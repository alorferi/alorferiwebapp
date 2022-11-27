<template>
    <span>
            <b-img-lazy
            v-if="this.member.photo_url"
            :src="this.getApiUrl(this.member.photo_url)"
            :style="imgStyle"
            class="rounded-circle"
        />

        <NameCircle v-else :name="member.first_name" :size="this.size" />
    </span>
</template>
<script>
import NameCircle from "../../components/NameCircle";

export default {
    name: "LibraryMemberPhoto",
    props: ["member", "size"],
    computed: {
        imgStyle() {
            var width = parseInt(this.size) + 12;
            var height = parseInt(this.size) + 12;
            return "width:" + width + "px; height:" + height + "px;";
        }
    },
    components: {
        NameCircle
    },
    methods: {
        sizeOfImg() {
            return this.size;
        },

        sizeOfNameCircle() {
            return this.size;
        },

        phtoUrl() {
            return this.getApiUrl(this.member.photo_url);
        }
    }
};
</script>
