<route lang="yaml">
    meta:
      footer:
        enabled: false
    </route>
    
    <script setup lang="ts">
    import { helpCenterCategories } from '/@src/data/pages/help'
    // import { genericFaq } from '/@src/data/blocks/advanced/faq'
    // import { boxedPosts } from '/@src/data/pages/nft'
    import { socialLinks } from '/@src/data/blocks/advanced/social'
    </script>
    
<template>
  <div>
    <Section color="grey">
      <Container>
        <SectionTitle
          title="Help Categories"
          subtitle="Take a look at"
        />
    
        <HelpCenterCategories :categories="helpCenterCategories" />
      </Container>
    </Section>
    <FooterA
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Negare
                non possum. Apparet statim, quae sint officia, quae actiones."
      :social-links="socialLinks"
    />
    <!-- <Section color="grey">
      <Container>
        <SectionTitle
          title="Read our FAQs"
          subtitle="Have a Question?"
        />
    
        <FaqListBoxed :items="genericFaq" />
    
        <BlogBoxedGrid
          punchline="Easy-Peezy 👌"
          title="Resources to Get Started"
          subtitle="You should definitely subscribe to our news for daily tips and tricks"
          :posts="boxedPosts"
          inverted
        />
      </Container>
    </Section>
    
    <FooterD
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Negare
                  non possum. Apparet statim, quae sint officia, quae actiones."
      color="light"
      :social-links="socialLinks"
    /> -->
  </div>
</template>
    