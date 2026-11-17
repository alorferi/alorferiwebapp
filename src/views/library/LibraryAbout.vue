<template>
    <div class="ui-card rounded-t-none border-t-0">
        <!-- <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Mobile</p>
        <p class="pl-2 text-blue-400">{{ library.mobile }}</p>
        <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Email</p>
        <p class="pl-2 text-blue-400">{{ library.email }}</p>
        <p class="pt-6 text-gray-600 font-bold uppercase text-sm">
            Founded at
        </p>
        <p class="pl-2 text-blue-400">{{ library.founded_at }}</p> -->

        <div class="p-2 m-4">
            <!-- @if(ValidX::canAccessLibrary($library,"library_edit")==null) -->
            <div class="text-right">
                <!-- <a href="#" class="btn btn-primary">Edit</a> -->
            </div>

            <!-- @endif -->

            <!-- @if(library.about) -->
            <div class="mb-4" style="text-align: justify">
                <!-- {{ str_replace("\n","<br/>",library.about) }} -->

                {{ library.about }}
            </div>
            <!-- @endif -->

            <div class="mb-4">Email : {{ library.email }}</div>

            <div class="mb-4">Founded At : {{ this.formatDate(library.founded_at) }}</div>

            <div class="mb-4">Govt Reg No : {{ library.govt_reg_no }}</div>

            <div class="mb-4">Phone : {{ library.phone }}</div>

            <div class="mb-4">Mobile : {{ library.mobile }}</div>

            <div class="mb-4">Post Code : {{ library.post_code }}</div>

            <div class="mb-4">
                Total Reqular News Papers :
                {{ library.total_regular_news_papers }}
            </div>

            <div class="mb-4">Total Reqular Magazines : {{ library.total_regular_magazines }}</div>

            <div class="mb-4">
                Opening Time :

                {{ library.opening_time_at }}
            </div>

            <div class="mb-4">
                Closing Time :
                {{ library.closing_time_at }}
            </div>

            <div class="mb-4">Off Days {{ offDayname }},</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["library"]
};
</script>
