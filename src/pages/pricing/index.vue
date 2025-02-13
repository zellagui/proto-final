<route lang="yaml">
meta:
  footer:
    enabled: false
</route>

<script setup lang="ts">
useHead({
  title: 'Pricing pages',
})
</script>

<template>
  <div>
    <Section color="grey">
      <Container class="mt-6">
        <SectionTitle
          title="Prebuilt pricing demos"
          subtitle="Pricing pages"
        />

        <DemoList :categories="['pricing']" />
      </Container>
    </Section>

    <DemoFooter />
  </div>
</template>
