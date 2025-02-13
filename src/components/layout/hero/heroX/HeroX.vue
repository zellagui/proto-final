<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { marketingIconFeatures } from '/@src/data/pages/marketing'

const reports = ref(0)
const members = ref(0)
const companies = ref(0)
const growth = ref(25) // Default growth percentage

onMounted(async () => {
  try {
    const response = await fetch('https://hook.us2.make.com/wtoa6guh6r6g9ym3e27ywtnlxdn3j4wc')
    const data = await response.json()
    // Example: [{"members":232,"reports":263,"compagnies":243}]
    if (Array.isArray(data) && data.length > 0) {
      const stats = data[0]
      reports.value = stats.reports ?? 0
      members.value = stats.members ?? 0
      companies.value = stats.companies ?? stats.compagnies ?? 0 // Handle spelling variations
      // You can compute growth here if the data provides necessary fields
    }
  } catch (error) {
    console.error('Error fetching data from webhook:', error)
  }
})
</script>

<template>
  <Hero
    class="scape-hero"
    alignment="center"
    size="fullheight"
  >
    <template #body>
      <div class="columns is-vcentered mt-12">
        <!--Hero Content-->
        <div class="column is-relative">
          <div class="hero-caption mx-auto max-w-6 mb-4">
            <Title
              tag="h1"
              :size="1"
              weight="bold"
            >
              <span>
                You deserve
                <span class="text-primary">transparency</span>
                in you job search.
              </span>
            </Title>
            <Subtitle
              tag="p"
              :size="5"
              classes="b-centered-tablet-p text-medium"
            >
              Tired of wasting your time chasing ghosts?
            </Subtitle>
          </div>
          <div class="mx-auto max-w-8">
            <FullJobSearch compact />
          </div>
        </div>
      </div>
    </template>
  </Hero>
</template>


<style lang="scss" scoped>


.hero-caption {
  padding-top: 3rem;
}

.cityscape:deep(img) {
  position: relative;
  margin-top: -6rem;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
}

.bg-circle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 0;
  height: 80vw;
  width: 80vw;
  border-radius: 50%;
  background: var(--wrap-muted-color);
  transform: translateY(50%);
}

:deep(.hero) {
  overflow: hidden !important;
}

:deep(.hero-body) {
  position: relative;
  z-index: 3;
  padding-bottom: 0 !important;
}

.scape-hero {
  position: relative;
}

@media only screen and (width <= 767px) {
  .hero-caption {
    padding-top: 0;
  }

  .cityscape:deep(img) {
    margin-top: 3rem;
  }

  :deep(.title) {
    font-size: 2.5rem;
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .hero-caption {
    padding-top: 0;
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: landscape) {
  .hero-caption {
    padding-top: 0;
  }
}

/* stylelint-disable */

//IPad Air
@media only screen and (min-device-width: 820px) and (max-device-height: 1180px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
  .hero {
    &.is-fullheight {
      max-height: 1024px !important;
      min-height: 1024px !important;

      .columns {
        display: flex !important;

        .column {
          width: initial !important;
          margin: 0 !important;
        }
      }
    }
  }
}

//IPad pro
@media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
  .hero {
    &.is-fullheight {
      max-height: 1024px !important;
      min-height: 1024px !important;

      .columns {
        display: flex !important;

        .column {
          width: initial !important;
          margin: 0 !important;
        }
      }
    }
  }
}

/* stylelint-enable */
</style>
