<route lang="yaml">
meta:
  footer:
    enabled: false
</route>

<script setup lang="ts">
useHead({
  title: 'Sub pages',
})
</script>

<template>
  <div>
    <Section color="grey">
      <Container class="mt-6">
        <SectionTitle
          title="Prebuilt sub pages demos"
          subtitle="Sub pages"
        />

        <DemoList :categories="['subpages']" />
      </Container>
    </Section>

    <DemoFooter />
  </div>
</template>
