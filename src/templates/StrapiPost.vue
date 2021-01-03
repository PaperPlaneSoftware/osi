<template>
  <Layout>
    <div class="p-5">
      <b-link class="d-block mb-5" to="/">← Back</b-link>
      <h1>{{ $page.post.title }}</h1>
      <div v-html="content" />
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  post: strapiPost(id: $id) {
    title
    content
  }
}
</page-query>

<script>
import Vue from "vue";
import MarkdownIt from "markdown-it";
import markdownItAbbr from "markdown-it-abbr";
import markdownItContainer from "markdown-it-container";
import markdownItDefList from "markdown-it-deflist";
import markdownItEmoji from "markdown-it-emoji";
import markdownItFootnote from "markdown-it-footnote";
import markdownItForInline from "markdown-it-for-inline";
import markdownItHighlightjs from "markdown-it-highlightjs";
import markdownItImagesPreview from "markdown-it-images-preview";
import markdownItIns from "markdown-it-ins";
import markdownItKatex from "markdown-it-katex";
import markdownItMark from "markdown-it-mark";
import markdownItSub from "markdown-it-sub";
import markdownItSup from "markdown-it-sup";
import markdownItTaskList from "markdown-it-task-lists";
import markdownItToc from "markdown-it-toc";

export default Vue.extend({
  computed: {
    content() {
      // markdown
      const md = new MarkdownIt();
      md.use(markdownItAbbr);
      md.use(markdownItContainer);
      md.use(markdownItDefList);
      md.use(markdownItEmoji);
      md.use(markdownItFootnote);
      md.use(markdownItForInline);
      md.use(markdownItHighlightjs);
      md.use(markdownItImagesPreview);
      md.use(markdownItIns);
      md.use(markdownItKatex);
      md.use(markdownItMark);
      md.use(markdownItSub);
      md.use(markdownItSup);
      md.use(markdownItTaskList);
      md.use(markdownItToc);

      return md.render(this.$page.post.content);
    },
  },
});
</script>
