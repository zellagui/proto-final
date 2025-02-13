<route lang="yaml">
meta:
  transition: no-transition
  footer:
    enabled: false
</route>

<script setup lang="ts">
import { profileProjects } from '/@src/data/blocks/advanced/profile'
</script>

<template>
  <div>
    <Section color="grey">
      <Container>
        <ProfileWrapper large>
          <ProfileProjectsGrid :projects="profileProjects" />
        </ProfileWrapper>
      </Container>
    </Section>
  </div>
</template>
