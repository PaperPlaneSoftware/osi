<template>
  <section class="px-5 py-3">
    <b-button variant="link" to="/">← Back</b-button>

    <section v-if="loadingState == 'loading'">
      <div class="d-flex align-items-center justify-content-center">
        <b-icon icon="circle-fill" animation="throb" font-scale="4"></b-icon>
      </div>
    </section>

    <section v-else-if="loadingState == 'failed'">
      <div class="d-flex align-items-center justify-content-center">
        <h4 class="text-danger">Oops! Something went wrong, please refresh.</h4>
      </div>
    </section>

    <section v-else-if="loadingState == 'success'">
      <div class="d-flex flex-wrap">
        <!-- Mavon editor -->
        <div class="w-75 py-4 pr-2">
          <mavon-editor
            class="mavon-editor mb-4"
            language="en"
            v-model="content"
          />
        </div>

        <!-- Details -->
        <div class="w-25 py-4 pl-2">
          <b-card title="Post details">
            <b-form-input
              class="my-4"
              placeholder="Post title"
              v-model="title"
            />
            <b-form-tags
              input-id="tags-remove-on-delete"
              :input-attrs="{
                'aria-describedby': 'tags-remove-on-delete-help',
              }"
              v-model="tags"
              separator=" "
              placeholder="tags"
              remove-on-delete
              no-add-on-enter
            />
            <b-form-text id="tags-remove-on-delete-help" class="mt-2 text-left">
              Press <kbd>Backspace</kbd> to remove the last tag
            </b-form-text>

            <div class="d-flex flex-column align-items-end">
              <!-- Publish -->
              <div class="my-4">
                <b-button v-if="errorMsg" variant="danger" @click="publish">
                  Publish
                </b-button>
                <b-button v-else variant="primary" @click="publish">
                  <b-icon
                    v-if="published"
                    class="mr-2"
                    icon="check-circle"
                  />Publish
                </b-button>
              </div>
              <small
                v-if="errorMsg"
                class="text-danger text-right float-right mt-4"
              >
                {{ errorMsg }}
              </small>

              <!-- Save & Delete -->
              <div class="d-flex">
                <div class="align-self-center mx-2">
                  <small v-if="saved">✔ Saved</small>
                  <small v-else>Needs saving</small>
                </div>

                <b-button
                  class="text-danger"
                  variant="link"
                  v-b-modal.delete-modal
                >
                  <b-icon icon="trash" />
                </b-button>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <b-modal id="delete-modal" hide-header ok-variant="danger" @ok="del">
      <p class="my-2">
        This will delete your local copy but will not remove the published
        version. Are you sure?
      </p>
    </b-modal>
  </section>
</template>

<script>
import Vue from "vue";
import short from "short-uuid";
import PostDatabase from "~/models/PostDatabase";

export default Vue.extend({
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      db: new PostDatabase(),

      title: "",
      content: "",
      tags: [],
      date: new Date(),
      readTime: 0,

      loadingState: "loading",
      saved: true,
      published: false,

      errorMsg: undefined,
    };
  },

  computed: {
    post() {
      return {
        uuid: this.uuid,
        title: this.title,
        content: this.content,
        date: this.date.toISOString().split("T")[0],
        readTime: this.readTime,
      };
    },

    titleAndContent() {
      return `${this.title}|${this.content.substring(1)}`;
    },
  },

  watch: {
    titleAndContent() {
      if (this.saved && this.content.length > 0) {
        this.saved = false;
        setTimeout(this.save, 3000);
      }
    },
  },

  mounted() {
    this.saved = true;

    this.db.posts
      .filter((post) => post.uuid === this.uuid)
      .first()
      .then((row) => {
        if (row) this.setPost(row);
        else this.newPost();
      })
      .then((_) => (this.loadingState = "success"))
      .catch((err) => {
        this.loadingState = "failed";
        console.error(err);
      });
  },

  methods: {
    newPost() {
      this.db.posts
        .put({
          uuid: this.uuid,
          title: this.title,
          content: this.content,
          date: new Date().toISOString().split("T")[0],
          readingTime: 0,
        })
        .catch((err) => console.error(err));
    },

    setPost(post) {
      this.title = post.title;
      this.content = post.content;
    },

    del() {
      this.db.posts
        .filter((post) => post.uuid === this.uuid)
        .keys()
        .then((keys) =>
          keys.forEach((key) => {
            const k = key.valueOf();
            this.db.posts.delete(k);
            root.$router.push("/");
          })
        );
    },

    save() {
      this.db.posts
        .update(this.post, {
          title: this.title,
          content: this.content,
          date: new Date().toISOString().split("T")[0],
          readTime: Math.ceil(calcReadingTime(this.content).minutes),
        })
        .then((_) => (this.saved = true));
    },

    publish() {},
  },
});
</script>

<style lang="scss" scoped>
.mavon-editor {
  z-index: 0;
  height: 100vh !important;
  border-radius: 4px !important;
  border: 1px solid rgba($color: #000000, $alpha: 0.125) !important;
  box-shadow: none !important;
}
</style>
