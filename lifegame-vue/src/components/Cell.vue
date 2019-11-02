<template>
  <div class="cell" :class="state ? 'alive' : 'dead'">
  </div>
</template>

<script>
export default {
  name: "Cell",
  props: {
    state: Boolean
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
  background: #000000
}

.dead {
  background: #ffffff
}
</style>
