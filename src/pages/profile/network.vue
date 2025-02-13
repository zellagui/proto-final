<route lang="yaml">
meta:
  transition: no-transition
  footer:
    enabled: false
</route>

<script setup lang="ts">
import { profileNetwork } from '/@src/data/blocks/advanced/profile'
</script>

<template>
  <div>
    <Section color="grey">
      <Container>
        <ProfileWrapper large>
          <ProfileNetwork
            :stats="profileNetwork.stats"
            :people="profileNetwork.people"
          />
        </ProfileWrapper>
      </Container>
    </Section>
  </div>
</template>
