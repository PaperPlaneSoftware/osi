<template>
  <post-editor :uuid="uuid" />
</template>

<script>
import Vue from "vue";
import short from "short-uuid";
import PostEditor from "~/components/PostEditor.vue";

export default Vue.extend({
  components: {
    PostEditor,
  },

  data() {
    return {
      uuid: short.generate(),
    };
  },
});
</script>
