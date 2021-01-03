<template>
  <section>
    {{ id }}
  </section>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      id: "",
    };
  },

  mounted() {
    const { id } = this.$route.params;

    console.log(id);
    this.id = id;
  },
});
</script>
