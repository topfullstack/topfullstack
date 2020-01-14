<template>
  <div class="pa-3">
    <h3>{{ course.name }}</h3>
    <!-- <v-select
      v-model="currentIndex"
      :items="course.episodes.map((v, i) => ({ text: v.name, value: i }))"
    ></v-select> -->
    <v-row>
      <v-col md="8">
        <video
          @timeupdate="playing"
          width="100%"
          :src="episode.file"
          controls
        ></video>

        <v-list dense class="px-3">
          <v-subheader>
            评论
          </v-subheader>
          <v-list-item v-for="item in comments.data" :key="item._id">
            <v-list-item-avatar v-if="item.user && false">
              <v-img :src="item.user.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content v-if="item.user">
              {{ item.user.username }}
              : {{ item.content }}
            </v-list-item-content>
          </v-list-item>
          <v-pagination
            dense
            circle
            :length="comments.lastPage"
            v-model="page"
          ></v-pagination>
          <v-form @submit.prevent="sendComment">
            <v-text-field
              hide-details
              v-model="comment.content"
              placeholder="发表评论"
              class="align-center"
            >
              <template #append-outer>
                <v-btn type="submit" icon>
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-form>
        </v-list>
      </v-col>
      <v-col md="4">
        <v-list>
          <v-list-item-group v-model="currentIndex">
            <v-list-item v-for="item in course.episodes" :key="item._id">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'

const fetchComments = async function($axios, object, page = 1) {
  const ret = await $axios.$get('comments', {
    params: {
      query: {
        sort: {
          _id: -1
        },
        where: {
          object
        },
        page,
        populate: 'object user'
      }
    }
  })
  return ret
}
export default {
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })

    const episode = course.episodes[0]
    let comments = []
    if (episode) {
      comments = await fetchComments($axios, episode._id)
    }

    return {
      id,
      course,
      comments
    }
  },
  filters: {
    time(val) {
      return dayjs(val).format('HH:mm')
    }
  },
  data() {
    return {
      page: 1,
      currentIndex: 0,
      comment: {
        content: null
      },
      playingTime: 0
    }
  },
  watch: {
    async page(val) {
      this.comments = await fetchComments(this.$axios, this.episode._id, val)
    }
  },
  methods: {
    playing(e) {
      this.playingTime = e.target.currentTime
    },
    async sendComment() {
      this.comment = {
        ...this.comment,
        type: 'Episode',
        object: this.episode._id,
        sentAt: this.playingTime
      }
      await this.$axios.$post('comments', this.comment)
      this.comments = await fetchComments(this.$axios, this.episode._id)
      this.comment.content = null
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  }
}
</script>

<style></style>
