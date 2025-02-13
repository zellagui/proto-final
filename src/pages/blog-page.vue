<route lang="yaml">
  meta:
    footer:
      enabled: false
  </route>
  
  <script setup lang="ts">
  import { resources } from '/@src/data/pages/blog/resource'
  import { socialLinks } from '/@src/data/blocks/advanced/social'
  </script>
  
<template>
  <div>
    <Section color="grey">
      <Container>
        <div class="mx-auto max-w-9">
          <PageTitle
            title="Our Work Resources"
            subtitle="Stay Informed"
          >
            <template #content>
              <div class="mx-auto max-w-6 mt-2">
                <p class="paragraph rem-115">
                  Ready for early access? Subscribe to Ghostjobs for exclusive updates, news, and a bundle of free resources.
                </p>
              </div>
  
              <div class="mx-auto max-w-4 mt-4">
                <SubscriptionCompact
                  label="Subscribe"
                  placeholder="Enter your email"
                />
              </div>
            </template>
          </PageTitle>
        </div>
  
        <ResourceGrid
          :posts="resources"
          upside-down
        />
  
        <div class="load-more py-6">
          <div class="buttons is-centered">
            <Button
              color="primary"
              :long="3"
              raised
              bold
            >
              Load More
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  
    <FooterA
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Negare
                non possum. Apparet statim, quae sint officia, quae actiones."
      color="light"
      :social-links="socialLinks"
    />
  </div>
</template>
  