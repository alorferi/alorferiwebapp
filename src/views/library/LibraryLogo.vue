<template>
    <div>
        <b-img-lazy
            v-if="this.library.logo_url != null"
            :src="this.logoUrl()"
            :style="imgStyle"
            class="rounded-circle p-2"
        />

        <NameCircle v-else :name="library.name" :size="this.size" class="p-2" />
    </div>
</template>
<script>
import NameCircle from "../../components/NameCircle";

export default {
    name: "LibraryLogo",
    props: ["library", "size"],
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

        logoUrl() {
            if(this.library.logo_url==null){
                return ""
            }else{
                return this.getApiUrl(this.library.logo_url);
            }

        }
    }
};
</script>
