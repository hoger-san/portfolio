<template>
  <v-card max-width="400">
    <v-img
      max-height="250"
      class="thumbnail"
      :src="post.fields.heroImage.fields.file.url"
    >
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
    <v-chip-group>
      <nuxt-link
        v-for="tag in post.fields.tags"
        :key="tag"
        :to="{ name: 'tags-tag', params: { tag: tag } }"
        ><v-chip>{{ tag }}</v-chip></nuxt-link
      >
    </v-chip-group>
  </v-card>
</template>
<script>
export default {
  props: ['post']
}
</script>
