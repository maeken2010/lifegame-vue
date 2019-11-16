<template>
  <div @click="changeCell(coordinates)" class="cell" :class="state ? 'alive' : 'dead'"></div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Cell",
  props: {
    state: Boolean,
    coordinates: Object
  },
  methods: {
    ...mapMutations(["changeCell"])
  }
};
</script>

<style scoped lang="scss">
.cell {
  width: 10px;
  height: 10px;
  border: solid 1px #000000;
}

.alive {
  background: #000000;
}

.dead {
  background: #ffffff;
}
</style>
