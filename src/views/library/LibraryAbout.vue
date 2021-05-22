<template>
    <div>
             <!-- <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Mobile</p>
            <p class="pl-2 text-blue-400">{{ library.mobile }}</p>
            <p class="pt-6 text-gray-600 font-bold uppercase text-sm">Email</p>
            <p class="pl-2 text-blue-400">{{ library.email }}</p>
            <p class="pt-6 text-gray-600 font-bold uppercase text-sm">
                Founded at
            </p>
            <p class="pl-2 text-blue-400">{{ library.founded_at }}</p> -->



<div class="p-2 m-3">
    <!-- @if(ValidX::canAccessLibrary($library,"library_edit")==null) -->
    <div class=" text-right">
        <a href="#" class="btn btn-primary">Edit</a>
    </div>

    <!-- @endif -->

<!-- @if(library.about) -->
<div class="form-group" style="text-align: justify">

    <!-- {{ str_replace("\n","<br/>",library.about) }} -->

    {{library.about}}

</div>
<!-- @endif -->



<div class="form-group">

   Email : {{ library.email }}

</div>



    <div class="form-group">
       Founded At : {{ this.formatDate(library.founded_at) }}
    </div>

<div class="form-group">
  Govt Reg No  : {{ library.govt_reg_no }}

</div>

<div class="form-group">
  Phone  : {{ library.phone }}

</div>



<div class="form-group">
  Mobile  : {{ library.mobile }}

</div>

<div class="form-group">
  Post Code  : {{ library.post_code }}

</div>


 <div class="form-group">
   Total Reqular News Papers : {{ library.total_regular_news_papers }}

</div>

<div class="form-group">
   Total Reqular Magazines : {{ library.total_regular_magazines }}
</div>


<div class="form-group">
 Opening Time   :

    {{ library.opening_time_at }}

</div>

<div class="form-group">
Closing Time    :
    {{ library.closing_time_at }}
</div>

<div class="form-group">


      Off Days  {{offDayname}},
</div>

</div>

    </div>
</template>
<script>

export default({
    props:["library"],
})
</script>

