<script setup lang="ts">
import { heroAvatars } from '/@src/data/pages/marketing'
</script>

<template>
  <Hero
    alignment="center"
    size="fullheight"
    shape="/assets/shapes/hero-shape.svg"
    shape-orientation="right"
  >
    <template #body>
      <div class="columns is-vcentered mt-12">
        <!--Hero Content-->
        <div class="column is-relative">
          <Title
            tag="h1"
            :size="1"
            weight="bold"
          >
            <span class="text-gradient">You deserve transparency in your job search.</span>
          </Title>
          <Subtitle
            tag="p"
            :size="5"
            weight="thin"
            class="mx-auto max-w-6 b-centered-tablet-p pt-2"
          >
            Tired of wasting your time chasing ghosts? Empower yourself and others to identify, 
            report, and sidestep suspicious job postings. 
          </Subtitle>

          <!--Hero Benefits-->
          <HeroCenteredBenefits
            :benefits="[
              'Real insights',
              'Honest reviews',
              'Streamlined Search',
            ]"
          />

          <!--Buttons-->
          <div class="buttons is-relative z-1">
            <Button
              color="primary"
              elevated
              bold
            >
              Join the movement
            </Button>
          </div>

          <!--Hero Avatars-->
          <!-- <HeroAvatars :avatars="heroAvatars" /> -->

          <!--Customer logos -->
          <!-- <HeroDualLogos
            left="/assets/brands/vonmo.svg"
            right="/assets/brands/bobcot.svg"
          /> -->

          <!--Hero App Mockup-->
          <DarkImage
            class="centered-app is-relative mx-auto max-w-9 my-4 z-1"
            src="/images/Flagged.svg"
            src-dark="/images/Flagged.svg"
            alt=""
            width="1519"
            height="949"
          />

          <!--Hero Circle Shape-->
          <img
            class="app-circle-1 rotating"
            src="/assets/shapes/hero-shape-2.svg"
            alt="Circle shape"
            width="150"
            height="150"
          >
        </div>
      </div>
    </template>
  </Hero>
</template>

<style lang="scss" scoped>
:deep(.hero) {
  overflow: hidden !important;
}

.app-circle-1 {
  position: absolute;
  bottom: 270px;
  left: -60px;
  height: 440px;
  width: 440px;
  z-index: 0;
}

.app-circle-2 {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 180px;
  width: 180px;
  z-index: 0;
}

.centered-app:deep(img) {
  display: block;
  border-radius: 2rem;
  border: 1px solid var(--border);
  box-shadow: var(--light-box-shadow);
}

.is-dark {
  .centered-app:deep(img) {
    border: none;
  }
}

@media only screen and (width <= 767px) {
  .app-circle-1 {
    display: none;
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .app-circle-1 {
    bottom: 125px;
    left: -140px;
  }
}
</style>
