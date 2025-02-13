<route lang="yaml">
meta:
  footer:
    enabled: false
</route>

<script setup lang="ts">
useHead({
  title: 'Landing pages',
})
</script>

<template>
  <div>
    <Section color="grey">
      <Container class="mt-6">
        <SectionTitle
          title="Prebuilt page demos"
          subtitle="Landing pages"
        />

        <DemoList :categories="['landing']" />
      </Container>
    </Section>

    <DemoFooter />
  </div>
</template>
