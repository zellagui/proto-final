<script setup lang="ts">
useHead({
  title: 'General Disclaimer - Ghost Jobs',
  meta: [
    {
      name: 'description',
      content: 'General Disclaimer and Terms of Use for Ghost Jobs platform.',
    },
  ],
})
</script>

<template>
  <div class="legal-page">
    <Section class="legal-section">
      <Container>
        <div class="legal-content">
          <h1 class="title is-2 mb-6">General Disclaimer</h1>
          <p class="subtitle is-6 has-text-grey mb-6">Last Updated: October 2nd, 2024</p>

          <div class="content">
            <p class="mb-5">
              Ghost Jobs, LLC provides this website and its services on an "as is" and "as available" basis, subject to
              the following disclaimer.
            </p>

            <h2 class="title is-4 mt-6 mb-4">Professional Advice Disclaimer</h2>
            <p class="mb-5">
              The information provided on this website is for general informational purposes only. It should not be
              construed as professional advice. No professional-client relationship is created through the use of this
              website.
            </p>

            <h2 class="title is-4 mt-6 mb-4">User-Generated Content</h2>
            <p class="mb-5">
              Ghost Jobs, LLC does not warrant the accuracy, completeness, or usefulness of any user-generated content.
              We are not responsible for any errors or omissions in such content.
            </p>

            <h2 class="title is-4 mt-6 mb-4">Third-Party Links</h2>
            <p class="mb-5">
              Our website may contain links to third-party websites. These links are provided for convenience only.
              Ghost Jobs, LLC has no control over and assumes no responsibility for the content, privacy policies, or
              practices of any third-party websites.
            </p>

            <h2 class="title is-4 mt-6 mb-4">Liability Limitations</h2>
            <p class="mb-5">
              Ghost Jobs, LLC shall not be liable for any damages arising from the use of, or inability to use, this
              website or our services. This includes direct, indirect, incidental, punitive, and consequential damages.
            </p>

            <h2 class="title is-4 mt-6 mb-4">Data Tracking Disclaimer</h2>
            <p class="mb-5">
              We use various tracking technologies to improve user experience and analyze website traffic. By using our
              website, you consent to our use of these technologies in accordance with our Privacy Policy.
            </p>

            <h2 class="title is-4 mt-6 mb-4">Contact Us</h2>
            <p class="mb-5">
              If you have any questions about this disclaimer, please contact us at hello@ghostjobs.io.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.legal-page {
  padding: 2rem 0;
  background: var(--wrap-muted-color);
}

.legal-section {
  padding: 3rem 0;
}

.legal-content {
  max-width: 800px;
  margin: 0 auto;
  background: var(--card-bg-color);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: var(--light-box-shadow);

  .title {
    color: var(--dark-text);

    &.is-2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    &.is-4 {
      color: var(--primary);
      font-size: 1.5rem;
      font-weight: 600;
    }
  }

  .content {
    color: var(--medium-text);
    font-size: 1rem;
    line-height: 1.7;

    p {
      margin-bottom: 1.5rem;
    }

    ul {
      margin-left: 1.5rem;
      margin-bottom: 1.5rem;

      li {
        margin-bottom: 0.5rem;
      }
    }
  }
}

@media only screen and (width <=767px) {
  .legal-content {
    padding: 2rem 1.5rem;

    .title {
      &.is-2 {
        font-size: 2rem;
      }

      &.is-4 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
