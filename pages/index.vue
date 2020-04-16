<template>
  <v-layout column justify-center align-center>
    <v-container>
      <v-card>
        <v-card-title>
          <h1>{{ person.fields.name }}</h1>
        </v-card-title>
        <v-card-subtitle>{{ person.fields.title }}</v-card-subtitle>
        <v-card-text>{{ person.fields.shortBio }}</v-card-text>
        <v-card-actions>
          <v-btn :href="person.fields.twitter">Twitter</v-btn>
          <v-btn :href="person.fields.github">GitHub</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container fluid>
      <h2>記事一覧</h2>
      <v-row>
        <v-col v-for="(post, index) in posts" :key="index">
          <article-preview :post="post"></article-preview>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import ArticlePreview from '~/components/article-preview.vue'
const client = createClient()
export default {
  components: {
    ArticlePreview
  },
  asyncData({ env }) {
    return Promise.all([
      client.getEntries({
        'sys.id': env.CTF_PERSON_ID
      }),
      client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })
    ])
      .then(([entries, posts]) => {
        return {
          person: entries.items[0],
          posts: posts.items
        }
      })
      .catch(console.error)
  }
}
</script>
