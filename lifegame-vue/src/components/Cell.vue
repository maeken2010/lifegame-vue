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
  border: solid 3px #000000;
}

.alive {
  color: #000000
}

.dead {
  color: #ffffff
}
</style>
