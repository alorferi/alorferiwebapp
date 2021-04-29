<template>
  <div>
      <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: meta.current_page == 1 }">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>

    <li  class="page-item" v-for="(page,index) in meta.last_page" :key="index" :class="{ active: page == meta.current_page }" >
        <a class="page-link" :href="getUrlFromRouteName(page)">{{page}}</a>
        </li>
    <li class="page-item" :class="{ disabled: meta.current_page == meta.last_page }">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
  </ul>
</nav>
  </div>
</template>

<script>
export default {
  name: "Paginator",
  props:["meta",'route_name'],
  mounted() {

  },
  computed:{

  },
  data() {
    return {

    };
  },

  methods: {

       getUrlFromRouteName:function(page){

            var urlResolver=this.$router.resolve({name: this.route_name})

          var endPoint =  urlResolver.href

            return   this.getEndPointQueryString(endPoint,page);
      }

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
