<script setup lang="ts">
const props = defineProps<{
  number: number
}>()

const target = ref(null)
const targetIsVisible = useElementVisibility(target)
</script>

<template>
  <span
    v-if="props.number"
    ref="target"
    class="counter"
    :class="targetIsVisible && 'counter-active'"
    :style="`--end: ${Math.round(props.number ?? 0)}`"
  />
</template>

<style lang="scss" scoped>
@property --num {
  syntax: '<integer>';
  initial-value: 0;
  inherits: false;
}

.counter {
  //--end: 100;

  //animation: counter 5s ease-in-out;
  //animation-fill-mode: forwards;
  //counter-set: num var(--num);
}

.counter-active {
  --end: 100;

  animation: counter 2s ease-in-out;
  animation-fill-mode: forwards;
  counter-set: num var(--num);
}

.counter::after {
  content: counter(num);
}

@keyframes counter {
  0% {
    --num: 0;
  }

  100% {
    --num: var(--end);
  }
}
</style>
