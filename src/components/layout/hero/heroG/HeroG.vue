<script setup lang="ts">
import { viaPlaceholderErrorHandler } from '/@src/utils/viaPlaceholderErrorHandler'
import { customerLogos } from '/@src/data/pages/logos'
</script>

<template>
  <Hero
    color="grey"
    class="circle-hero"
    size="fullheight"
  >
    <template #body>
      <div class="columns is-vcentered">
        <div class="column is-5">
          <div class="hero-caption">
            <Title
              tag="h1"
              :size="3"
              weight="bold"
            >
              Flag Companies, Report Suspicious Job Postings
            </Title>
            <Subtitle
              tag="p"
              :size="4"
              classes="b-centered-tablet-p text-medium"
            >
              Together, we can restore transparency to the job market.
            </Subtitle>
            <!-- <QuickJobSearch /> -->
            <p class="paragraph rem-115">
              <i
                class="iconify"
                data-icon="iconoir:check"
              />
              100% anonymous: we never sell or share your data.
            </p>
            <p class="paragraph rem-115">
              <i
                class="iconify"
                data-icon="iconoir:check"
              />
              Save your time by not engaging with ghost jobs.
            </p>
            <p class="paragraph rem-115">
              <i
                class="iconify"
                data-icon="iconoir:check"
              />
              Protect your privacy & data.
            </p>
            <p class="paragraph rem-115">
              <i
                class="iconify"
                data-icon="iconoir:check"
              />
              Join a community driven movement.
            </p>
          </div>
        </div>
        <div class="column is-6 is-offset-1">
          <div class="circle-composition">
            <QuickJobSearch />
          </div>
        </div>
      </div>
    </template>
    <!-- <template #footer>
      <div class="mx-auto max-w-8">
        <div class="tabs is-centered pb-4">
          <HeroClients :logos="customerLogos" />
        </div>
      </div>
    </template> -->
  </Hero>
</template>



