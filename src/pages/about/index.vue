<route lang="yaml">
meta:
  footer:
    enabled: false
</route>

<script setup lang="ts">
useHead({
  title: 'About pages',
})
</script>

<template>
  <div>
    <Section color="grey">
      <Container class="mt-6">
        <SectionTitle
          title="Prebuilt about demos"
          subtitle="About pages"
        />

        <DemoList :categories="['about']" />
      </Container>
    </Section>

    <DemoFooter />
  </div>
</template>
