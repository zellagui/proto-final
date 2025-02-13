<script setup lang="ts">
import { post } from '/@src/data/pages/blog/post'
</script>

<template>
  <div>
    <Section>
      <Container>
        <BlogPost
          :content="post"
          centered
        />
      </Container>
    </Section>
  </div>
</template>
