import Vue from 'vue'
import { AxiosInstance } from 'axios';
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $http: AxiosInstance
  }
}

declare module 'vue-ele-form' {}