<template>
  <v-card flat tile class="pa-3">
    <v-form @submit.prevent="send">
      <v-text-field
        label="说点啥吧"
        required
        append-icon="mdi-send"
        @click:append="send"
        v-model="content"
      ></v-text-field>
    </v-form>
    <v-list two-line>
      <v-list-item v-for="(item, i) in comments" :key="i">
        <v-list-item-avatar color="blue">
          <span class="white--text">{{
            item.user.username[0].toUpperCase()
          }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.content }}</v-list-item-title>
          <v-list-item-subtitle>
            <span>{{ item.user.username }}</span>
            <span>{{ item.createdAt }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    object: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      content: null,
      comments: []
    }
  },
  methods: {
    async send() {
      await this.$axios.$post('comments', {
        type: this.type,
        object: this.object,
        content: this.content
      })
      this.content = null
      await this.fetch()
    },
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          query: {
            where: {
              type: this.type,
              object: this.object
            }
          }
        }
      })
    }
  },
  watch: {
    object: {
      handler: 'fetch',
      immediate: true
    }
  }
}
</script>

<style></style>
