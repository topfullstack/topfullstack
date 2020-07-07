<template>
  <div class="pa-3">
    <v-row>
      <v-col :md="8">
        <video :src="episode.file" width="100%" controls></video>
        <like-btn :object="course._id" type="Course"></like-btn>
        <h3>{{ course.name }}</h3>
        <v-select
          v-model="currentIndex"
          :items="course.episodes.map((v, i) => ({ text: v.name, value: i }))"
        ></v-select>
      </v-col>
      <v-col :md="4">
        <comment-list type="Episode" :object="episode._id"></comment-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
import CommentList from '../../components/CommentList.vue'

export default {
  components: { LikeBtn, CommentList },
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
