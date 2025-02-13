<script setup lang="ts">
export interface PlaceholderSectionProps {
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<PlaceholderSectionProps>(), {
  title: undefined,
  subtitle: undefined,
})
</script>

<template>
  <div class="section-placeholder">
    <div class="placeholder-content">
      <slot name="image" />
      <Title
        tag="h3"
        :size="6"
        weight="semi"
        leading
      >
        <slot>{{ props.title }}</slot>
      </Title>
      <p
        v-if="props.subtitle || 'subtitle' in $slots"
        class="paragraph"
      >
        <slot name="subtitle">
          {{ props.subtitle }}
        </slot>
      </p>
      <slot name="action" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-placeholder {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .placeholder-content {
    text-align: center;

    :deep(img) {
      display: block;
      max-width: 280px;
      margin: 0 auto !important;
    }

    h3 {
      font-family: var(--font-alt);
      font-size: 1.1rem;
      font-weight: 600;
    }

    p {
      font-family: var(--font);
      font-size: 1rem;
      max-width: 280px;
      margin: 0 auto 12px;
    }

    .button {
      min-width: 140px;
    }
  }
}
</style>
