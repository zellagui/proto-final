<route lang="yaml">
    meta:
      footer:
        enabled: false
    </route>
    
    <script setup lang="ts">
    import { customerLogos } from '/@src/data/pages/logos'
    import {
      jobs,
      jobTopics,
      jobCategories,
      candidates,
      testimonials,
    } from '/@src/data/pages/jobs'
    import { socialLinks } from '/@src/data/blocks/advanced/social'

    import {
        businessSolutions,
      
        } from '/@src/data/pages/banking'
            


    

    </script>
    
<template>
  <div>
    <HeroG />
    
    <!-- <LogoMarquee
      :logos="customerLogos"
      compact
    /> -->

    <Section color="grey">
      <Container>
        <SectionTitle
          title="How to Spot Suspicious Job Postings"
          subtitle="Did you know ?"
        />
    
        <FeatureBlockA
          alignment="centered"
          :features="jobCategories"
          :columns="3"
          :limit="8"
          size="medium"
          links
        />
    
        <div class="my-4">
          <Buttons alignment="centered">
            <Button
              color="primary"
              :long="3"
              raised
              bold
              to="blog"
            >
              See More
            </Button>
          </Buttons>
        </div>
      </Container>
    </Section>
    
    
    <Section
      id="job-offers"
      wave="wave-1"
    >
      <Container>
        <SectionTitle
          title="Coming soon"
          subtitle="Access postings reviews & companies opening historical data"
        />
        <br>

        <FullJobSearch />
        <Countdown date="Sep 30, 2024" />

        <br>
        <div class="box-carousel-title max-w-7 mb-6">
          <Subtitle
            tag="h3"
            :size="6"
            weight="bold"
            class="pb-2"
          >
            <span class="text-gradient">Tired of wasting your time chasing ghosts?
            </span>
          </Subtitle>
          <Title
            tag="h2"
            :size="3"
            weight="bold"
          >
            <span>You deserve transparency in your job search.</span>
          </Title>
          <p class="paragraph rem-115">
            Empower yourself and others to identify, report, and sidestep suspicious job postings.
          </p>
        </div>
        <br>
        <SideSection
          subtitle="One-on-One"
          title="Track, Report, and Rate Job Listings"
          content="Access a real-time public database of fake job listings, view company health scores, and protect yourself from scams and wasted applications."
        
          to="index"
          image="/images/Flagged.svg"
          dark-image="/images/Flagged.svg"
          image-width="776"
          image-height="647"
          reverse
          blob
        />

        <Container>
          <SideSection
            subtitle="Assistance"
            title="Companies Opening History Explorer"
            content="Access historical job data, view company hiring trends, track re-posts and applicant counts, and make informed job search decisions."
        
            to="index"
            image="/images/historical_data.svg"
            dark-image="/images/historical_data.svg"
            image-width="776"
            image-height="647"
            blob
          />
        </Container>
        <!-- <JobGrid :jobs="jobs" /> -->
        <br>
        
        <Container>
          <SectionTitle
            title="How to support the movement"
          />

          <PulseCards
            :features="businessSolutions"
            links
            animated
          />
        </Container>
        <br>
        <br>

        <Container>
          <SectionTitle
            title="Be our beta user &#8212; It's Free"
            subtitle="Ready to join us?"
          />

          <!--Subscribe-->
          <SubscriptionCompactBlock
            text="Early user get a private access to the Discord, where your idea's are part of the solution."
            label="Subscribe"
            placeholder="Enter your email"
          />
        </Container>
      </container>
    </Section>

   
   
    
    
    <FooterA
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Negare
                  non possum. Apparet statim, quae sint officia, quae actiones."
      color="grey"
      :social-links="socialLinks"
    />
  </div>
</template>
    