<route lang="yaml">
meta:
  transition: no-transition
  footer:
    enabled: false
</route>

<script setup lang="ts">
import {
  profileProjects,
  profileSkills,
  profileEducation,
  profileExperiences,
} from '/@src/data/blocks/advanced/profile'
</script>

<template>
  <div>
    <Section color="grey">
      <Container>
        <ProfileWrapper>
          <ProfileBio
            bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paria sunt
        igitur. Eam tum adesse, cum dolor omnis absit; Suo genere perveniant ad
        extremum; Ita credo. Duo Reges: constructio interrete. Nihil opus est
        exemplis hoc facere longius."
          />

          <ProfileProjects :projects="profileProjects" />

          <ProfileSkills :skills="profileSkills" />

          <ProfileExperience :experiences="profileExperiences" />

          <ProfileEducation :education="profileEducation" />
        </ProfileWrapper>
      </Container>
    </Section>
  </div>
</template>
