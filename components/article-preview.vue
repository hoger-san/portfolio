<template>
  <v-card max-width="400">
    <v-img class="thumbnail" :src="post.fields.heroImage.fields.file.url">
    </v-img>
    <v-card-title
      ><nuxt-link
        :to="{ name: 'blog-slug', params: { slug: post.fields.slug } }"
        class="title"
        >{{ post.fields.title }}</nuxt-link
      >
    </v-card-title>
    <v-card-subtitle>
      <time>{{ new Date(post.fields.publishDate).toDateString() }}</time>
    </v-card-subtitle>
    <v-card-text>
      <p>{{ post.fields.description }}</p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: ['post']
}
</script>
