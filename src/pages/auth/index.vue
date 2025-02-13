<route lang="yaml">
meta:
  footer:
    enabled: false
</route>

<script setup lang="ts">
useHead({
  title: 'Auth pages',
})
</script>

<template>
  <div>
    <Section color="grey">
      <Container class="mt-6">
        <SectionTitle
          title="Prebuilt auth demos"
          subtitle="Auth pages"
        />

        <DemoList :categories="['auth']" />
      </Container>
    </Section>

    <DemoFooter />
  </div>
</template>
