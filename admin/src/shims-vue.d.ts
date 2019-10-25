declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

import Vue from 'vue'
import { AxiosInstance } from 'axios';
declare module 'vue/types/vue' {
  // 3. 声明为 Vue 补充的东西
  interface Vue {
    $http: AxiosInstance
  }
}