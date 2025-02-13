<script setup lang="ts">
import config from '/@src/app.config'

export type FooterColors = 'light' | 'dark'

export interface FooterASocialLink {
  url: string
  name: string
  icon: string
}

export interface FooterAProps {
  color?: FooterColors
  socialLinks?: FooterASocialLink[]
  bubbles?: boolean
  curved?: boolean
}

const props = withDefaults(defineProps<FooterAProps>(), {
  color: undefined,
  socialLinks: undefined, // Pass your social links as a prop or define default links here
  bubbles: false,
  curved: false,
})

const footerClasses = computed(() => [
  props.color && `footer-${props.color}`,
  props.curved && `footer-curved`,
  props.bubbles && 'footer-overflow',
])
</script>

<template>
  <footer
    class="footer"
    :class="footerClasses"
  >
    <FooterBubbles v-if="props.bubbles" />

    <div class="container">
      <div class="columns is-vcentered b-flex-tablet-p">
        <!-- Left Column -->
        <div class="column is-4">
          <div class="level is-mobile mobile:mb-4">
            <slot name="leftLinks">
              <RouterLink
                :to="{ name: 'index' }"
                class="level-item footer-link"
              >
                Home
              </RouterLink>
              <RouterLink
                :to="{ name: 'blog' }"
                class="level-item footer-link"
              >
                Job hacks
              </RouterLink>
              <RouterLink
                :to="{ name: 'contact-us' }"
                class="level-item footer-link"
              >
                Contact
              </RouterLink>
            </slot>
          </div>
        </div>

        <!-- Middle Column -->
        <div class="column is-4 has-text-centered">
          <RouterLink
            class="footer-logo-centered"
            :to="{ name: 'index' }"
          >
            <DarkImage
              class="size-44x44"
              :src="config.logo.src"
              :src-dark="config.logo.srcDark"
              alt=""
              :width="config.logo.width"
              :height="config.logo.height"
            />
            <span class="is-sr-only">Logo</span>
          </RouterLink>
        </div>

        <!-- Right Column -->
        <div class="column is-4 has-text-right">
          <div
            v-if="props.socialLinks"
            class="level is-mobile"
          >
            <a
              v-for="(link, index) in props.socialLinks"
              :key="index"
              :href="link.url"
              class="level-item footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="icon">
                <i
                  class="iconify"
                  :data-icon="link.icon"
                />
              </span>
              <span class="is-sr-only">{{ link.name }}</span>
            </a>
          </div>
        </div>
      </div>
      <p class="paragraph rem-90 footer-text has-text-centered is-6">
        <span
          role="img"
          aria-label="copyright"
        >©</span>
        2024-2025 Ghostjobs. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  padding-top: 6rem;
  padding-bottom: 3rem;
  background: var(--footer-default-bg-color);

  &.footer-overflow {
    :global(body) {
      //overflow-x: hidden;
    }
  }

  &.footer-curved {
    border-top-left-radius: 50% 20%;
    border-top-right-radius: 50% 20%;
  }

  &.footer-light {
    background: var(--footer-light-bg-color);
  }

  &.footer-dark {
    background: var(--footer-dark-bg-color);

    .title {
      color: var(--white-smoke);
      opacity: 0.6;
    }

    .footer-link {
      color: var(--white-smoke);
      opacity: 0.8;
    }

    .footer-text {
      color: var(--white-smoke);
    }
  }

  &.footer-left {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  .footer-link {
    position: relative;
    font-family: var(--font);
    color: var(--medium-text);
    transition: color 0.3s;

    &::before {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 35%;
      transform-origin: right center;
      height: 3px;
      border-radius: 50px;
      background: var(--primary);
      transform: scale(0, 1);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      color: var(--primary-light-5);
      opacity: 1;

      &::before {
        transform-origin: left center;
        transform: scale(1, 1);
      }
    }
  }

  .footer-text {
    font-family: var(--font);
    color: var(--medium-text);
  }

  .footer-logo-centered {
    display: block;
    width: 100%;

    :deep(img) {
      margin: 0 auto;
    }
  }

  .footer-logo-left {
    img {
      display: block;
    }
  }
}

@media only screen and (width <= 767px) {
  .footer {
    .footer-link {
      margin-right: 0 !important;
    }

    &.footer-curved {
      border-top-left-radius: 80% 20%;
      border-top-right-radius: 80% 20%;
    }
  }
}
</style>