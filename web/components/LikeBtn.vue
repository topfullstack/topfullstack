<template>
  <v-btn flat icon :color="status ? 'pink' : null" @click="toggle">
    <v-icon>mdi-heart</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      requierd: true
    },
    object: {
      type: String,
      requierd: true
    }
  },
  data() {
    return {
      status: false
    }
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
  },
  mounted() {
    this.getStatus()
  }
}
</script>

<style></style>
