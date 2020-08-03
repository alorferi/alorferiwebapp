<template>
  <div class>
    <div
      class="rounded-full border border-gray-400 text-white bg-blue-400 w-10 h-10 flex justify-center items-center"
    >
      <a href="#">{{shortName}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "NameCircle",
  props: ["name"],
  computed: {
    shortName: function () {
      return this.name.match(/[A-Z]/g).slice(0, 2).join("");
    },
  },
  mounted() {
    console.log("Component mounted.");
  },
};
</script>
