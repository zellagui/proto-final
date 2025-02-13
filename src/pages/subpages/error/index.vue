<route lang="yaml">
meta:
  navbar:
    enabled: false
  footer:
    enabled: false
</route>

<script setup lang="ts"></script>

<template>
  <div>
    <ErrorHero
      color="grey"
      pattern
    >
      <template #error>
        <IllustrationError />
      </template>
    </ErrorHero>
  </div>
</template>
