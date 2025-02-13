<script setup lang="ts">
import { ref, computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { faq } from '/@src/data/pages/commerce'

export type LayerExtension = 'jpg' | 'jpeg' | 'png' | 'svg'

export interface SpinnerSectionProps {
  title: string
  subtitle: string
  content: string
  to: RouteLocationRaw
  cta?: string
  image: string
  imageWidth?: string
  imageHeight?: string
  legend?: string
  bordered?: boolean
  inverted?: boolean
  reverse?: boolean
}

const props = withDefaults(defineProps<SpinnerSectionProps>(), {
  cta: undefined,
  imageWidth: '150',
  imageHeight: '150',
  legend: undefined,
  bordered: false,
  inverted: false,
  reverse: false,
})

const spinnerSectionClasses = computed(() => [
  props.bordered && `is-bordered`,
  props.inverted && `is-inverted`,
  props.reverse && `is-reverse`,
])

const textClasses = computed(() => [props.inverted && `is-inverted`])

const modalOpen = ref(false)
</script>

<template>
  <div
    class="side-section py-6 z-1"
    :class="spinnerSectionClasses"
  >
    <div class="columns is-vcentered">
      <div class="column is-5">
        <Subtitle
          tag="h3"
          :size="5"
          weight="bold"
          class="pb-4"
        >
          <span class="text-gradient">{{ props.subtitle }}</span>
        </Subtitle>
        <Title
          tag="h2"
          :size="2"
          weight="bold"
          :class="textClasses"
        >
          {{ props.title }}
        </Title>
        <p
          class="paragraph rem-115 mb-4"
          :class="textClasses"
        >
          {{ content }}
        </p>
        <!-- Action link triggers modal -->
        <a
          href="#"
          class="rem-115"
          @click.prevent="modalOpen = true"
        >
          <span class="action-link">{{ props.cta }}</span>
          <i
            class="iconify"
            data-icon="feather:arrow-right"
          />
        </a>
      </div>
      <div class="column is-6 is-offset-1 has-text-centered is-relative">
        <Title
          v-if="props.legend"
          tag="h3"
          :size="5"
          weight="bold"
          class="text-white"
        >
          {{ props.legend }}
        </Title>
        <img
          class="is-block mx-auto"
          :src="props.image"
          alt="Static image"
          :width="props.imageWidth"
          :height="props.imageHeight"
        >
      </div>
    </div>
  </div>

  <!-- Modal -->
  <Modal
    title="Ghost jobs extension - Early access"
    :open="modalOpen"
    size="big"
    actions="center"
    @close="modalOpen = false"
  >
    <template #content>
      <!-- Your modal content -->

      <SectionTitle
        title=""
        subtitle="Limited beta access — join today!"
      />
      <div class="columns is-vcentered">
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
      <br>

      <!--Subscribe-->
      <SubscriptionCompactBlock
        text=" Are you tired of applying to jobs that aren't actually hiring? Our new Chrome extension empowers you to flag and report ghost jobs directly from your browser with just a click. With our autofill feature, reporting misleading job postings has never been easier."
        label="Get invite"
        placeholder="Enter your email"
      />
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
.side-section {
  &.is-bordered {
    border-bottom: 1px solid var(--border);
  }

  &.is-inverted {
    &.is-bordered {
      border-bottom-color: var(--dark-border);
    }
  }
}

img {
  max-width: 75%;  // Adjust to a percentage of the original size
  height: auto;    // Maintain aspect ratio
}

.iconify {
  transition: transform 0.3s;
  vertical-align: middle;
}

.action-link {
  font-weight: 500;
  margin-right: 0.75rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
    color: var(--primary);

    + .iconify {
      opacity: 0.7;
      color: var(--primary);
      transform: translateX(5px) !important;
    }
  }
}

/* If using a button instead of an anchor tag */
.action-link-button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>
