import Dexie from "dexie";

export default class PostDatabase extends Dexie {
  posts;

  constructor() {
    super("PostDatabase");
    this.version(1).stores({
      posts: "uuid,title,content,date,readTime",
    });
    this.posts = this.table("posts");
  }
}
