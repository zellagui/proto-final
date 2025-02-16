<route lang="yaml">
  meta:
    footer:
      enabled: false
  </route>

<script setup lang="ts">

import { socialLinks } from '/@src/data/blocks/advanced/social'
import SigninSignUp from '/@src/pages/comp/SignInSignUp.vue'
import CompanyList from '/@src/components/CompanyList.vue'
import { starterTemplates } from '/@src/data/pages/development'
import { techLogos, customerLogos } from '/@src/data/pages/logos'
import {
  businessSolutions,

} from '/@src/data/pages/banking'
import { testimonials } from '/@src/data/blocks/advanced/testimonials'

// Stats data
const content14 = [
  {
    icon: 'ph:users-duotone',
    number: 15000,
    text: 'Active Job Seekers',
  },
  {
    icon: 'ph:buildings-duotone',
    number: 2500,
    text: 'Companies Tracked',
  },
  {
    icon: 'ph:flag-banner-duotone',
    number: 1200,
    text: 'Ghost Jobs Reported',
  },
  {
    icon: 'ph:check-circle-duotone',
    number: 95,
    text: 'Success Rate (%)',
  },
]

const techLogos = [
  {
    id: 0,
    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png',
  },
  {
    id: 1,
    picture: 'https://user-images.githubusercontent.com/23087690/67604687-19cf8780-f731-11e9-9217-9e8fccac3b69.jpg',
  },
  {
    id: 2,
    picture: 'https://static-00.iconduck.com/assets.00/glassdoor-icon-1024x1024-qn0ai0xz.png',
  },
  {
    id: 3,
    picture: 'https://www.ziprecruiter.com/favicon-144x144.png',
  },
  {
    id: 4,
    picture: '/assets/stacks/nuxt-light.svg',
  },
  {
    id: 5,
    picture: '/assets/stacks/svelte-light.svg',
  },
  {
    id: 6,
    picture: '/assets/stacks/js-light.svg',
  },
  {
    id: 7,
    picture: '/assets/stacks/vuejs-light.svg',
  },
]

const jobBoards = {
  linkedin: {
    name: 'LinkedIn',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png',
    url: 'https://linkedin.com'
  },
  indeed: {
    name: 'Indeed',
    logo: 'https://user-images.githubusercontent.com/23087690/67604687-19cf8780-f731-11e9-9217-9e8fccac3b69.jpg',
    url: 'https://indeed.com'
  },
  glassdoor: {
    name: 'Glassdoor',
    logo: 'https://static-00.iconduck.com/assets.00/glassdoor-icon-1024x1024-qn0ai0xz.png',
    url: 'https://glassdoor.com'
  },
  ziprecruiter: {
    name: 'ZipRecruiter',
    logo: 'https://www.ziprecruiter.com/favicon-144x144.png',
    url: 'https://ziprecruiter.com'
  },
  monster: {
    name: 'Monster',
    logo: 'https://play-lh.googleusercontent.com/YqM8H7Vip-UqQmsKXeJKxlvw8UcEc9v7oMEoPOe-8VDh1wKUudK6rdQ5TEaGjv8BkWA=w240-h480-rw',
    url: 'https://monster.com'
  }
}


</script>

<template>
  <div class="page-content">
    <!-- Hero Section -->
    <Section class="hero-section" wave="wave-1" shape-color="grey">
      <Container>
        <!-- Title Section -->
        <div class="hero-head has-text-centered">
          <Title tag="h1" :size="1" weight="bold" class="title-main">
            <span>
              You deserve
              <span class="text-primary">transparency</span>
              in your job search.
            </span>
          </Title>
          <a href="https://www.producthunt.com/products/ghost-jobs" target="_blank" rel="noopener noreferrer">
            <img src="/images/top-post-badge.svg" alt="Product Hunt Badge" class="ph-badge">
          </a>


          <div class="px-4 has-text-centered counter-section">
            <div class="data-update-badge">
              <Icon icon="ph:chart-line-up-duotone" :size="20" class="update-icon" />
              <span class="current-data">January 2025 Data</span>
              <span class="divider">•</span>
              <span class="next-update">Next update: February 28th</span>
              <span class="tooltip-text" title="We update our statistics monthly to provide the most accurate insights">
                <Icon icon="ph:info-duotone" :size="16" />
              </span>
            </div>
            <div class="stats-counter-grid">
              <!-- Jobs Analyzed -->
              <div class="counter-box">
                <Icon icon="ph:magnifying-glass-duotone" :size="48" class="counter-icon has-text-primary" />
                <div class="counter-content">
                  <Title tag="h3" :size="4" weight="bold" class="counter-number">
                    <Counter :number="6" />M
                  </Title>
                  <p class="counter-title">
                    Jobs Analyzed
                  </p>
                </div>
              </div>

              <!-- Ghost Jobs Detected -->
              <div class="counter-box">
                <Icon icon="ph:ghost-duotone" :size="48" class="counter-icon has-text-info" />
                <div class="counter-content">
                  <Title tag="h3" :size="4" weight="bold" class="counter-number">
                    <Counter :number="523" />K
                  </Title>
                  <p class="counter-title">
                    Companies Monitored
                  </p>
                </div>
              </div>

              <!-- Time Saved -->
              <div class="counter-box">
                <Icon icon="ph:clock-countdown-duotone" :size="48" class="counter-icon has-text-success" />
                <div class="counter-content">
                  <Title tag="h3" :size="4" weight="bold" class="counter-number">
                    <Counter :number="8" />
                  </Title>
                  <p class="counter-title">
                    Job Boards Monitored
                  </p>
                </div>
              </div>

              <!-- Community Reports -->
              <div class="counter-box">
                <Icon icon="ph:users-three-duotone" :size="48" class="counter-icon has-text-warning" />
                <div class="counter-content">
                  <Title tag="h3" :size="4" weight="bold" class="counter-number">
                    <Counter :number="3500" />
                  </Title>
                  <p class="counter-title">
                    Community Reports
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
    <Section color="grey">
      <Container>
        <TimelineTitle title="Community Insight" subtitle="Report Bad behaviors with"
          minititle="Tired of chasing ghost jobs ?" color="secondary" :step="1" />

        <DevWindows />

        <TimelineTitle title="Job search tools" subtitle="The most advanced" minititle="AND MANY MORE MONITORED!"
          color="primary" :step="2">
          <template #subheading>
            <div class="is-flex is-justify-content-center py-4">
              <AvatarGroup :avatars="techLogos" :limit="5" boxed />
            </div>
          </template>
        </TimelineTitle>

        <Timeline />

        <TimelineTitle title="The market" subtitle="We monitor for you" color="accent" :step="3">
          <template #content>
            <div class="py-6 mx-auto max-w-9">
              <div class="columns b-columns-half-tablet-p">
                <div class="column is-6">
                  <p class="paragraph">
                    From niche job boards to corporate career pages, we leave no stone unturned. By monitoring and
                    breaking down all this data, we create a transparent, ledger-like record of each company’s hiring
                    practices—open for everyone to explore.
                  </p>
                </div>
                <div class="column is-6">
                  <p class="paragraph">
                    Of course, numbers only tell part of the story. Our community-driven reports, tips, and open
                    discussions fill in the gaps, empowering you to see a complete picture of every employer before you
                    apply.
                  </p>
                </div>
              </div>
            </div>
          </template>
        </TimelineTitle>

        <TestimonialsMarquee :testimonials="testimonials" color="default"  />

        <CtaBlockB title-primary="Beta version"
          content-primary="This version is still in beta. public version launch end february " cta-primary="Launch"
          cta-primary-link="launch" title-secondary="Help us make it better"
          content-secondary="You vision is important to us. Share your feedback with us" cta-secondary="Feedback"
          cta-secondary-link="contact" boxed shapes animated color="primary" />


      </Container>

    </Section>

    <!-- Chrome Extension Section -->
    <!-- <Section class="section-extension py-6">
      <Container>
        <SpinnerSection subtitle="Free Access: GhostJobs.io Chrome Extension" title="Report / track on the go."
          cta="Get early access" to="extension-page" image="/images/chrome_store.png"
          content="Track and report job postings directly from your browser" />
      </Container>
    </Section> -->

    <!-- Featured Companies Section -->
    <!-- <Section class="section-companies py-6">
      <Container>
        <SectionTitle title="Featured Companies" subtitle="Discover top companies hiring now" />
        <Suspense>
          <template #default>
            <CompanyList :columns="4" :limit="8" size="medium" rounded />
          </template>
          <template #fallback>
            <div class="has-text-centered py-6">
              Loading companies...
            </div>
          </template>
        </Suspense>
      </Container>
    </Section> -->

    <!-- Support Movement Section -->
    <!-- <Section id="job-offers" wave="wave-1" class="section-support py-6">
      <Container>
        <SectionTitle title="How to support the movement" subtitle="Join us in making job searching more transparent" />
        <PulseCards :features="businessSolutions" links animated />
        <div class="mt-6">
          <SigninSignUp />
        </div>
      </Container>
    </Section> -->

    <FooterA FooterColors="white"
      text="Join the movement for job search transparency. Find your next opportunity with confidence."
      :social-links="socialLinks" />
  </div>
</template>

<style lang="scss" scoped>
.page-content {
  .hero-section {
    padding: 20% 0 4rem;
    background: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
  }

  .hero-head {
    margin-bottom: 3rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .title-main {
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .subtitle-main {
    font-size: 1.25rem;
    color: var(--light-text);
    margin-top: 2rem;
    margin-bottom: 0rem;
    max-width: 600px;
  }

  .counter-section {
    margin-bottom: 6rem;
  }

  .data-update-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    color: var(--light-text);
    margin-bottom: 2rem;
    box-shadow: var(--light-box-shadow);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--light-box-shadow), 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .update-icon {
      color: var(--primary);
    }

    .current-data {
      font-weight: 600;
      color: var(--dark-text);
    }

    .divider {
      color: var(--border-color);
      margin: 0 0.25rem;
    }

    .next-update {
      color: var(--light-text);
    }

    .tooltip-text {
      display: inline-flex;
      align-items: center;
      color: var(--light-text);
      cursor: help;
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary);
      }
    }
  }

  .stats-counter-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    padding-top: 0rem;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  .counter-box {
    background: var(--white);
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    box-shadow: var(--light-box-shadow);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;

    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--light-box-shadow), 0 8px 20px rgba(0, 0, 0, 0.1);

      .counter-icon {
        transform: scale(1.1);
      }

      .counter-number {
        color: var(--primary);
      }
    }

    .counter-icon {
      transition: transform 0.3s ease;
      margin-bottom: 0.5rem;
    }

    .counter-content {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .counter-number {
      color: var(--title-color);
      margin-bottom: 0;
      transition: color 0.3s ease;
      font-size: 2rem;
    }

    .counter-title {
      font-size: 1rem;
      color: var(--light-text);
      margin: 0;
      font-weight: 500;
    }
  }

  .text-primary {
    color: var(--primary);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.2em;
      left: 0;
      width: 100%;
      height: 0.2em;
      background-color: var(--primary);
      opacity: 0.1;
      border-radius: 4px;
    }
  }

  .action-button {
    padding: 1rem 2rem;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .section-features,
  .section-extension,
  .section-companies,
  .section-support {
    position: relative;
    z-index: 1;
    padding: 4rem 0;
  }

  .product-hunt-badge {
    display: block;
    margin: 0 auto 3rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .ph-badge {
      height: 54px;
      width: auto;
    }
  }
}
</style>
