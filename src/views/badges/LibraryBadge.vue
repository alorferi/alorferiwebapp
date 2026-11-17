<template>
    <div>
        <div class="ui-card">
            <div class="p-5 p-2 text-center">
                <LibraryLogo :library="library" size="72" />
                <a href="/user/profile" class="absolute inset-0"> </a>
            </div>

            <!-- <div class="card-footer text-center">
            <span>Alor Feri</span>
        </div> -->
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

import LibraryLogo from "../library/LibraryLogo";

export default {
    name: "LibraryBadge",
    components: {LibraryLogo},
      computed: {
        library(){

           var lib = this.$store.getters.library;

           return lib;
        }
    },
};
</script>
