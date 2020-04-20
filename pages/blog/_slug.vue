<template>
  <v-row>
    <v-col xs="0" sm="1" md="1" lg="2"></v-col>
    <v-col xs="12" sm="10" md="10" lg="8">
      <article>
        <v-img :src="post.fields.heroImage.fields.file.url"></v-img>
        <section class="headlines">
          <time class="caption">
            {{ new Date(post.fields.publishDate).toDateString() }}
          </time>
          <h1 class="display-1">{{ post.fields.title }}</h1>
          <p class="headline text--secondary">{{ post.fields.description }}</p>
        </section>
        <section class="body" v-html="$md.render(post.fields.body)"></section>
        <v-chip-group>
          <nuxt-link
            v-for="tag in post.fields.tags"
            :key="tag"
            :to="{ name: 'tags-tag', params: { tag: tag } }"
            ><v-chip>{{ tag }}</v-chip></nuxt-link
          >
        </v-chip-group>
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
<style scoped>
section {
  margin-bottom: 3em;
}
</style>
