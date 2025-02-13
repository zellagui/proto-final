<script setup lang="ts">
import { tagProps, tagColors } from '/@src/data/docs/base/tags'
</script>

<template>
  <Section
    id="tag-colors-demo"
    bordered-bottom
  >
    <Container>
      <div class="mx-auto max-w-6">
        <div class="pt-4 pb-6">
          <DemoTitle
            title="Tag Colors"
            subtitle="Available tag colors"
          />
          <div class="is-flex is-align-items-flex-end pt-4">
            <Tags>
              <Tag label="Default" />
              <Tag
                color="solid"
                label="Solid"
              />
              <Tag
                color="primary"
                label="Primary"
              />
              <Tag
                color="success"
                label="Success"
              />
              <Tag
                color="info"
                label="Info"
              />
              <Tag
                color="warning"
                label="Warning"
              />
              <Tag
                color="danger"
                label="Danger"
              />
              <Tag
                color="orange"
                label="Orange"
              />
              <Tag
                color="blue"
                label="Blue"
              />
              <Tag
                color="green"
                label="Green"
              />
              <Tag
                color="purple"
                label="Purple"
              />
            </Tags>
          </div>
        </div>

        <DemoTabs>
          <template #code>
            <PrismCode
              language="html"
              :code="tagColors"
            />
          </template>
          <template #props>
            <PrismCode
              language="javascript"
              :code="tagProps"
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
              Tags are a central part in all web and mobile application. Vulk
              tags come in different flavors. You can control tag colors using
              the
              <code>color</code>
              prop. Allowed values are
              <code>solid</code>
              ,
              <code>primary</code>
              ,
              <code>success</code>
              ,
              <code>info</code>
              ,
              <code>purple</code>
              ,
              <code>orange</code>
              ,
              <code>green</code>
              ,
              <code>warning</code>
              and
              <code>danger</code>
              .
            </p>
          </template>
        </DemoTabs>
      </div>
    </Container>
  </Section>
</template>
