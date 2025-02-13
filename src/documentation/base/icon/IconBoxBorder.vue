<script setup lang="ts">
import { iconboxProps, iconboxBordered } from '/@src/data/docs/base/icons'
</script>

<template>
  <Section
    id="iconbox-border-demo"
    bordered-bottom
  >
    <Container>
      <div class="mx-auto max-w-6">
        <div class="pt-4 pb-6">
          <DemoTitle
            title="Bordered Box"
            subtitle="Bordered box recap"
          />
          <div class="is-flex is-align-items-flex-end pt-4">
            <div class="px-2">
              <IconBox
                size="medium"
                color="primary"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:paw-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="success"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:skull-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="info"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:layers-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="warning"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:diamond-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="danger"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:flash-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="purple"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:shirt-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="blue"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:person-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="green"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:storefront-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="orange"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:briefcase-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="yellow"
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:speedometer-outline"
                />
              </IconBox>
            </div>
          </div>
          <div class="is-flex is-align-items-flex-end pt-4">
            <div class="px-2">
              <IconBox
                size="medium"
                color="primary"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:help-buoy-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="success"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:newspaper-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="info"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:game-controller-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="warning"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:mail-unread-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="danger"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:lock-closed-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="purple"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:earth-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="blue"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:server-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="green"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:business-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="orange"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:ice-cream-outline"
                />
              </IconBox>
            </div>
            <div class="px-2">
              <IconBox
                size="medium"
                color="yellow"
                rounded
                bordered
              >
                <i
                  class="iconify"
                  data-icon="ion:terminal-outline"
                />
              </IconBox>
            </div>
          </div>
        </div>

        <DemoTabs>
          <template #code>
            <PrismCode
              language="html"
              :code="iconboxBordered"
            />
          </template>
          <template #props>
            <PrismCode
              language="javascript"
              :code="iconboxProps"
            />
          </template>
          <template #sample>
            <div class="empty-text">
              <p class="paragraph rem-95">
                No data sample available for this component
              </p>
            </div>
          </template>
          <template #usage>
            <p class="paragraph rem-95">
              Icons play a central part of every web and mobile application.
              Vulk icon boxes are compatible with
              <a
                href="https://icones.netlify.app/"
                target="_blank"
                class="link"
              >
                Iconify
              </a>
              , which brings in thousands of icons. Unused icons are purge at
              build time. You can make bordered icon boxes by using the
              <code>bordered</code>
              prop.
            </p>
          </template>
        </DemoTabs>
      </div>
    </Container>
  </Section>
</template>
