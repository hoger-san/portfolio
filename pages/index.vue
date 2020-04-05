<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-center">
        <h1>{{ person.fields.name }}</h1>
        <ul v-for="(post, index) in posts" :key="index">
          <li>{{ post.fields.title }}</li>
        </ul>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
const client = createClient()
export default {
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
