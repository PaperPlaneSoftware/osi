<template>
  <Layout>
    <section class="hero">
      <div class="d-flex flex-column align-items-start w-50 p-5">
        <h1 class="hero-strapline mb-4">Keeping science open to everyone.</h1>
        <p class="my-4">
          Keep a science journal, write papers and read the latest research from
          the OSI community. <b-link to="/what"><b>Learn more</b></b-link>
        </p>
        <b-button variant="outline-secondary" size="lg"> Get Started </b-button>
      </div>
    </section>

    <!-- Offline posts -->
    <section class="p-5">
      <h2><b-icon icon="journals" /> Your posts</h2>
      <hr />
      <div class="d-flex flex-wrap">
        <post-card
          class="mr-5 mt-5"
          v-for="(post, i) in offlinePosts"
          :key="post.uuid"
          :index="i"
          :post="post"
          :to="`/post/edit/${post.uuid}`"
        />
      </div>
    </section>

    <!-- Online posts -->
    <section class="p-5">
      <h2><b-icon icon="star" /> Published</h2>
      <hr />
      <div class="d-flex flex-wrap">
        <post-card
          v-for="(post, i) in $page.posts.edges"
          class="mt-5 mr-5"
          :key="`published-${i}`"
          :index="i"
          :post="post.node"
          :to="`/post/${post.node.id}`"
        />
      </div>
    </section>
  </Layout>
</template>

<page-query>
query {
  posts: allStrapiPost {
    edges {
      node {
        id
        title
        content
        date
        readTime
      }
    }
  }
}
</page-query>

<script>
import PostDatabase from "~/models/PostDatabase";
import PostCard from "~/components/PostCard.vue";

export default {
  metaInfo: {
    title: "Open Science Initiative",
  },

  components: {
    PostCard,
  },

  data() {
    return {
      db: new PostDatabase(),

      offlinePosts: [],
    };
  },

  mounted() {
    this.db.posts
      .limit(6)
      .toArray()
      .then((rows) => this.offlinePosts.push(...rows));
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/styles/custom.scss";

.hero {
  background-image: url("~@/assets/svgs/hero.png");
  background-size: 14.5em;
  background-repeat: no-repeat;
  background-position-x: 80%;
  background-position-y: -15px;

  background-color: $primary;
  border-bottom: 1px solid $black;
  color: $black;
  font-size: 1.2em;

  .hero-strapline {
    font-size: 3.9em;
  }
}
</style>
