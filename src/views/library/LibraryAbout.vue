<template>
    <div>
             <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Mobile</p>
            <p class="pl-2 text-blue-400">{{ library.mobile }}</p>
            <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Email</p>
            <p class="pl-2 text-blue-400">{{ library.email }}</p>
            <p class="pt-6 text-gray-600 font-bold uppercase text-sm">
                Founded at
            </p>
            <p class="pl-2 text-blue-400">{{ library.founded_at }}</p>

    </div>
</template>
<script>

export default({
  computed: {
        library(){
           return this.$store.getters.library;
        }
    },
})
</script>

