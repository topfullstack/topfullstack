<template>
  <v-btn :color="status ? 'pink' : null" @click="toggle" icon>
    <v-icon>mdi-heart</v-icon>
  </v-btn>
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
      status: false
    }
  },
  mounted() {
    this.getStatus()
  },
  methods: {
    async getStatus() {
      const ret = await this.$axios.$get('actions/status', {
        params: {
          type: this.type,
          object: this.object,
          name: 'like'
        }
      })
      this.status = ret.status
      // await
      // this.status = ...
    },
    async toggle() {
      const ret = await this.$axios.$post('actions/toggle', {
        type: this.type,
        object: this.object,
        name: 'like'
      })
      this.status = ret.status
      // await
    }
  }
}
</script>

<style></style>
