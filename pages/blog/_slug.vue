<template>
  <v-row>
    <v-col xs="0" sm="1" md="1" lg="2"></v-col>
    <v-col xs="12" sm="10" md="10" lg="8">
      <article>
        <v-img :src="post.fields.heroImage.fields.file.url"></v-img>
        <time class="caption">
          {{ new Date(post.fields.publishDate).toDateString() }}
        </time>
        <h1 class="display-2">{{ post.fields.title }}</h1>
        <p class="headline text--secondary">{{ post.fields.description }}</p>
        <p class="body-1">{{ post.fields.body }}</p>
      </article>
    </v-col>
    <v-col xs="0" sm="1" md="1" lg="2"></v-col>
  </v-row>
</template>
<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  asyncData({ env, params }) {
    return client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug
      })
      .then((entries) => {
        return {
          post: entries.items[0]
        }
      })
      .catch(console.error)
  }
}
</script>
