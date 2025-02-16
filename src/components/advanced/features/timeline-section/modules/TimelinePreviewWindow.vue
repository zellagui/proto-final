<script setup lang="ts"></script>

<template>
  <div class="preview-container">
    <img src="/modular.gif" alt="Modular Interface" class="preview-gif" />
  </div>
</template>

<style scoped lang="scss">
.preview-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
  background: var(--wrap-muted-color);
}

.preview-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
