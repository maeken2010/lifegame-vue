<template>
  <div class="board">
    <button @click="nextGeneration" class="generation">next generation</button>
    <div v-for="(cellsState, n) in cellsStateArray" :key="n" class="row">
      <div v-for="(cellState, m) in cellsState" :key="String(m)+n" class="col">
        <Cell :state="cellState" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Cell from "@/components/Cell.vue";

export default {
  name: "Board",
  components: {
    Cell
  },
  created: function() {
    this.initCellsState();
  },
  computed: mapState(["cellsStateArray"]),
  methods: mapMutations(["initCellsState", "nextGeneration"])
};
</script>

<style scoped lang="scss">
.row {
  display: flex;
}
</style>
