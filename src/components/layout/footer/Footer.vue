<script setup lang="ts">
import config from '/@src/app.config'

export type FooterColor = 'light' | 'dark'

export interface FooterLink {
  label: string
  to: string
}

export interface FooterSocial {
  icon: string
  link: string
  name: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterCtaBenefit {
  label: string
}

export interface FooterCta {
  title: string
  subtitle: string
  benefits: FooterCtaBenefit[]
  links: FooterLink[]
}

export interface Footer {
  columns: FooterColumn[]
  socials: FooterSocial[]
  newsletter?: {
    action?: string
    method?: string
  }
  links: FooterLink[]
  cta?: FooterCta
  copyright: string
}

export interface FooterProps {
  content: Footer
  color?: FooterColor
}

const props = withDefaults(defineProps<FooterProps>(), {
  color: 'light',
})

const footerClasses = computed(() => [
  props.color && `footer-${props.color}`,
  props.content.cta && `has-cta`,
])
</script>

<template>
  <footer
    class="footer"
    :class="footerClasses"
  >
    <FooterMap />
    <FooterCta
      v-if="props.content.cta"
      :content="props.content.cta"
    />
    <div class="container">
      <div
        v-if="
          props.content.newsletter?.action ||
            props.content.socials?.length ||
            props.content.columns?.length
        "
        class="columns footer-columns is-bordered pt-4 pb-6"
      >
        <div
          v-for="(column, index) in props.content.columns"
          :key="index"
          class="column is-one-fifth"
        >
          <div class="footer-column">
            <Subtitle
              :size="6"
              weight="thin"
              tag="h4"
              leading
              inverted
              uppercase
            >
              <span>{{ column.title }}</span>
            </Subtitle>
            <ul class="footer-column-list">
              <li
                v-for="(link, l) in column.links"
                :key="l"
              >
                <RouterLink
                  :to="link.to"
                  class="footer-link"
                >
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>

        <div
          v-if="
            props.content.newsletter?.action || props.content.socials?.length
          "
          class="column is-one-fifth has-text-centered"
        >
          <div class="social-block">
            <form
              v-if="props.content.newsletter?.action"
              :action="props.content.newsletter.action"
              :method="props.content.newsletter.method"
            >
              <Field>
                <Control icon="feather:mail">
                  <VInput
                    name="email"
                    placeholder="Subscribe"
                    inverted
                  />
                </Control>
              </Field>
              <Field>
                <Control>
                  <Button
                    type="submit"
                    color="primary"
                    fullwidth
                  >
                    Subscribe
                  </Button>
                </Control>
              </Field>
            </form>
            <div
              v-if="props.content.socials?.length"
              class="socials"
            >
              <RouterLink
                v-for="(social, s) in props.content.socials"
                :key="s"
                class="footer-link"
                :to="social.link"
              >
                <i
                  class="iconify"
                  :data-icon="social.icon"
                  data-inline="false"
                />
                <span class="is-sr-only">{{ social.name }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="columns is-vcentered pt-6 pb-6">
        <div class="column is-8">
          <div
            class="is-flex d-column-mobile d-column-tablet-p is-align-items-center"
          >
            <a
              class="footer-logo-left"
              href="#"
            >
              <DarkImage
                class="small:mx-auto large:mx-0"
                :src="config.logo.src"
                :src-dark="config.logo.srcDark"
                alt=""
                :width="config.logo.width"
                :height="config.logo.height"
              />
            </a>
            <ul class="py-2">
              <li
                v-for="(link, l) in content.links"
                :key="l"
                class="inline-block px-2"
              >
                <RouterLink
                  :to="link.to"
                  class="footer-link rem-90"
                >
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="column is-4 has-text-centered">
          <p
            class="paragraph medium:text-right is-6"
            data-config-id="copyright"
          >
            {{ content.copyright }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  padding-top: 6rem;
  padding-bottom: 3rem;

  &.has-cta {
    margin-top: 6rem;
    padding-top: 10rem;
  }

  &.footer-primary {
    background: var(--primary);
  }

  &.footer-light {
    background: var(--footer-light-bg-color);
  }

  &.footer-dark {
    background: var(--footer-dark-bg-color);

    .columns {
      &.is-bordered {
        border-bottom: 1px solid var(--footer-dark-border-color);
      }
    }

    .title {
      color: var(--footer-dark-heading-color);
      opacity: 0.6;
    }

    .footer-link {
      color: var(--footer-dark-link-color);
      opacity: 0.8;

      &:hover {
        color: var(--footer-dark-link-color-hover) !important;
        opacity: 1;
      }
    }
  }

  .columns {
    position: relative;
    z-index: 1;

    &.is-bordered {
      border-bottom: 1px solid var(--border);
    }
  }

  .footer-column {
    .footer-column-list {
      li {
        padding: 0.25rem 0;
      }
    }
  }

  .footer-link {
    font-family: var(--font);
    font-weight: 300;
    color: var(--footer-light-link-color);
    transition: color 0.3s;
    padding: 0.25rem 0;

    &:hover {
      color: var(--footer-light-link-color-hover);
    }
  }

  .social-block {
    .socials {
      display: flex;
      justify-content: flex-end;
      padding: 0.5rem 0;

      a,
      .router-link {
        color: var(--white);
        font-size: 1rem;
        margin: 0 0.5rem;
      }
    }
  }

  .footer-logo-left {
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 100%;
      max-width: 36px;
    }

    .footer-logo-text {
      font-family: var(--font-alt);
      font-weight: 300;
      font-size: 1rem;
      text-transform: uppercase;
      margin-left: 0.5rem;
      margin-right: 1.5rem;
      color: var(--white);
    }
  }
}

@media only screen and (width <= 767px) {
  .footer {
    &.has-cta {
      margin-top: 12rem;
    }

    .social-block .socials {
      justify-content: center;
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .footer {
    .footer-columns {
      display: flex;
      padding-bottom: 0 !important;
    }

    .columns.pt-6.pb-6 {
      padding-top: 2rem !important;
      padding-bottom: 2rem !important;
    }
  }
}
</style>
