<route lang="yaml">
meta:
  footer:
    enabled: false
</route>

<script setup lang="ts">
useHead({
  title: 'Blog pages',
})
</script>

<template>
  <div>
    <Section color="grey">
      <Container class="mt-6">
        <SectionTitle
          title="Prebuilt blog demos"
          subtitle="Blog pages"
        />

        <DemoList :categories="['blog']" />
      </Container>
    </Section>

    <DemoFooter />
  </div>
</template>
