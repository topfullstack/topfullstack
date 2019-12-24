<template>
  <div>
    <avue-crud :data="data" :option="option" ref="crud"></avue-crud>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VTest extends Vue {
  option = {
    column: [{ prop: "id", slot: true }, { prop: "name" }]
  };
  data = [
    { id: 1, name: "a" },
    { id: 2, name: "a" },
    { id: 3, name: "a" },
    { id: 4, name: "a" }
  ];
  mounted() {
    setTimeout(() => {
      (this.$refs.crud as any).$scopedSlots = this.$scopedSlots;
      // console.log(this.$scopedSlots);
    }, 1000)
  }
}
</script>

<style>
</style>