<template>
  <div class="pa-3">
    <like-btn type="Course" :object="course._id"></like-btn>
    <h3>{{ course.name }}</h3>
    <v-select
      v-model="currentIndex"
      :items="course.episodes.map((v, i) => ({ text: v.name, value: i }))"
    ></v-select>
    <video :src="episode.file" width="100%" controls></video>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'

export default {
  components: { LikeBtn },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  },
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })

    return {
      id,
      course
    }
  }
}
</script>

<style></style>
