<route lang="yaml">
meta:
  footer:
    enabled: false
</route>

<script setup lang="ts">
useHead({
  title: 'Layouts starters',
})
</script>

<template>
  <div>
    <Section color="grey">
      <Container class="mt-6">
        <SectionTitle
          title="Prebuilt layouts demos"
          subtitle="Layouts starters"
        />

        <DemoList :categories="['layouts']" />
      </Container>
    </Section>

    <DemoFooter />
  </div>
</template>
