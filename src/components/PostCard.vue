<template>
  <div class="d-flex align-items-start post-card">
    <div
      class="d-flex flex-column align-items-center"
      v-b-tooltip.hover
      :title="tooltip"
    >
      <h1 class="index">{{ ("0" + (index + 1)).slice(-2) }}</h1>
      <b-icon v-if="journalPaper" class="type" icon="vector-pen" />
      <b-icon v-else class="type" icon="journal" />
    </div>

    <div class="d-flex flex-column h-100">
      <b-button class="title text-left mb-auto" variant="link" :to="to">
        {{ post.title ? post.title : "Untitled" }}
      </b-button>
      <div class="d-flex">
        <small class="ml-3">{{ post.date }}</small>
        <small class="mx-2">·</small>
        <small>{{ post.readTime }} min.</small>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    index: {
      type: Number,
      required: true,
    },
    journalPaper: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
      required: true,
    },
    to: {
      type: String,
      default: "/post/edit/",
    },
  },

  computed: {
    tooltip() {
      return this.journalPaper ? "Journal paper" : "Notebook entry";
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~/assets/styles/custom.scss";

.post-card {
  overflow: hidden;
  color: $black;
  border-left: 12px solid $gray-100;
  width: 29%;

  .index {
    color: $gray-100;
    font-weight: bold;
    font-size: 4em;
    transform: translate(-8px, -16px);
    margin: 0;
    padding: 0;
    user-select: none;
  }

  .type {
    color: $black;
    font-size: 1.2em;
    transform: translate(0, -10px);
  }

  .title {
    font-weight: bold;
    font-size: 1.6em;
  }
}
</style>
