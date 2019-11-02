<template>
  <div class="board">
    <div v-for="(cellsState, n) in cellsStateArray" :key="n" class="row">
      <div v-for="(cellState, m) in cellsState" :key="String(m)+n" class="col">
        <Cell :state="cellState" />
      </div>
    </div>
  </div>
</template>

<script>
import Cell from "@/components/Cell.vue";

export default {
  name: "Board",
  data: function () {
    return {
      cellsStateArray: [...Array(100)].map(() => [...Array(100)].map(() => this.generateRandomState()))
    }
  },
  components: {
    Cell
  },
  methods: {
    generateRandomState: function () {
      return Math.random() >= 0.5; //https://stackoverflow.com/a/36756480
    }
  }
};
</script>

<style scoped lang="scss">
.row {
  display: flex;
}
</style>
