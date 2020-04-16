<template>
  <section>
    <h2>{{ tag }}タグの記事一覧</h2>
    <v-row>
      <v-col v-for="(post, index) in posts" :key="index">
        <article-preview :post="post"></article-preview>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import ArticlePreview from '~/components/article-preview.vue'
const client = createClient()
export default {
  components: {
    ArticlePreview
  },
  asyncData({ env, params }) {
    return client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.tags[in]': params.tag,
        order: '-sys.createdAt'
      })
      .then((entries) => {
        return {
          posts: entries.items,
          tag: params.tag
        }
      })
      .catch(console.error)
  }
}
</script>
