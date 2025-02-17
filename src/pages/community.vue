<script setup lang="ts">
import { ref, computed } from 'vue'
import { socialLinks } from '../data/blocks/advanced/social'
import { countries as staticCountries } from '../data/country/countries'

const webhook = 'https://hook.us1.make.com/mrtf37v0nrvesbcdmlvwnlp9qui1zpgw'
const isSubmitted = ref(false)
const countries = ref(staticCountries)
const name = ref('')
const email = ref('')
const selectedCountry = ref('')
const jobApplicationFrequency = ref('')
const encounteredFakeJob = ref(false)
const frequencyOfFakeJobs = ref('')
const jobBoards = ref([])
const wastedHours = ref(0)
const fakeJobIndicators = ref([])
const usefulFeatures = ref([])
const anonymousForumInterest = ref(false)
const freeVersionInterest = ref(false)
const subscriptionLikelihood = ref(0)
const additionalComments = ref('')
const roleType = ref('')
const jobTitle = ref('')
const jobFunction = ref('')
const referralSource = ref('')
const marketingConsent = ref(false)

useHead({
  title: 'Join Our Community - Ghost Jobs',
  meta: [
    {
      name: 'description',
      content: 'Join the Ghost Jobs community for exclusive tools, resources, and insights to navigate your career journey.',
    },
  ],
})

const applyRate = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Most days of the week',
    label: 'Most days of the week',
  },
  {
    value: 'A few times a month',
    label: 'A few times a month',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
  {
    value: 'Hardly ever',
    label: 'Hardly ever',
  },
]

const wrongPost = [
  {
    value: 'I come across them daily',
    label: 'I come across them daily',
  },
  {
    value: 'I can spot them a few times a week',
    label: 'I can spot them a few times a week',
  },
  {
    value: 'Every so often I come across them',
    label: 'Every so often I come across them',
  },
  {
    value: 'No idea - its hard to tell whats genuine or not',
    label: 'No idea - its hard to tell whats genuine or not',
  },
]

const indicatorsPost = [
  { label: "I've seen the same job reposted many times", value: "reposted_many_times" },
  { label: "Insider knowledge (personally was told no intention to hire for the position, work for a company who you are confident does this, etc..)", value: "insider_knowledge" },
  { label: "Lack of specifics/vague description on the job posting", value: "vague_description" },
  { label: "The original posting date is very old and/or there are a very high number of applicants", value: "old_posting" },
  { label: "I've applied for jobs without receiving any sort of response from the company", value: "no_response" },
  { label: "The positing has unprofessional language", value: "unprofessional_language" },
  { label: "Listings provide little to no information about the company", value: "no_company_info" },
  { label: "The application process is unclear", value: "unclear_application_process" },
  { label: "Unusual requests for personal information", value: "unusual_requests" },
  { label: "I'm not sure", value: "not_sure" },
  { label: "Other (please leave notes at the end)", value: "other" }
];

const usefulFeaturesOptions = [
  { label: "Ability to flag suspicious job listings", value: "flag_suspicious" },
  { label: "Reviews from other job seekers about their application experience", value: "reviews_from_seekers" },
  { label: "Insights and statistics about job listings (e.g., number of applicants, reposting frequency)", value: "job_listings_insights" },
  { label: "Company job posting 'health' statistics", value: "health_statistics" },
  { label: "Exclusive, highly vetted job postings", value: "exclusive_postings" },
  { label: "Recommendations for legitimate job opportunities", value: "legitimate_recommendations" },
  { label: "Advanced company insights/analytics (i.e. correlation of jobs to growth trends, financials, employee reviews, etc..)", value: "advanced_company_insights" },
  { label: "Job Application Tracking", value: "application_tracking" },
  { label: "Company Contact Information, if known (e.g., recruiter, hiring manager, etc.)", value: "company_contact_info" },
  { label: "Job Search Hacking Playbook/Tools", value: "job_search_tools" },
  { label: "Other (please include notes at the end)", value: "other" },
  { label: "Automated applicant campaigns (i.e. automated applications, company email sequencing, etc..)", value: "automated_campaigns" }
];

const roleTypes = [
  { label: 'Founder', value: 'founder' },
  { label: 'C-Level', value: 'c_level' },
  { label: 'VP/SVP', value: 'vp_svp' },
  { label: 'Director', value: 'director' },
  { label: 'Manager', value: 'manager' },
  { label: 'Individual Contributor', value: 'individual_contributor' },
]

const jobFunctions = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
  { label: 'Operations', value: 'operations' },
  { label: 'Finance', value: 'finance' },
  { label: 'HR', value: 'hr' },
  { label: 'Other', value: 'other' },
]

const referralSources = [
  { label: 'Search Engine', value: 'search_engine' },
  { label: 'Social Media', value: 'social_media' },
  { label: 'Friend/Colleague', value: 'referral' },
  { label: 'Blog/Article', value: 'blog' },
  { label: 'Other', value: 'other' },
]

const isFormValid = computed(() => {
  return name.value &&
    email.value &&
    selectedCountry.value &&
    roleType.value &&
    jobTitle.value &&
    jobFunction.value &&
    referralSource.value &&
    marketingConsent.value
})

const handleSubmit = async () => {
  const formData = {
    name: name.value,
    email: email.value,
    selectedCountry: selectedCountry.value,
    roleType: roleType.value,
    jobTitle: jobTitle.value,
    jobFunction: jobFunction.value,
    referralSource: referralSource.value,
    marketingConsent: marketingConsent.value,
  };

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log('Data sent successfully');
      isSubmitted.value = true; // Set submission state to true
    } else {
      console.error(`Failed to send data: ${response.status} - ${response.statusText}`);
      const errorDetails = await response.json(); // Optional: Get additional error details from the response body
      console.error('Error details:', errorDetails);
    }
  } catch (error) {
    console.error('Error sending data:', error);
  }
};
</script>

<template>
  <div class="community-page">
    <!-- Hero Section with Form -->
    <Section class="hero-section">
      <Container>
        <div class="hero-content">
          <div class="hero-text">
            <span class="badge">Join the Movement</span>
            <h1 class="title is-2">Revolutionize Your<br>Job Search Journey</h1>
            <p class="subtitle is-4">Connect with fellow job seekers, access exclusive insights, and navigate your
              career path with confidence.</p>
          </div>

          <div class="main-container">
            <!-- Form Container -->
            <div class="form-container">
              <div v-if="isSubmitted" class="success-message">
                <div class="success-content">
                  <i class="iconify success-icon" data-icon="ph:check-circle-duotone"></i>
                  <h3>Welcome to the Community!</h3>
                  <p>Check your email for the Discord invitation link. We're excited to have you join us!</p>
                </div>
              </div>

              <form v-else @submit.prevent="handleSubmit" class="quick-form">
                <Field class="form-field">
                  <FieldLabel label="First Name*" required />
                  <Control>
                    <VInput v-model="name" placeholder="Enter your first name" />
                  </Control>
                </Field>

                <Field class="form-field">
                  <FieldLabel label="Email*" required />
                  <Control>
                    <VInput v-model="email" type="email" placeholder="Enter your email address" />
                  </Control>
                </Field>

                <Field class="form-field">
                  <FieldLabel label="What type of role are you looking for?*" required />
                  <Control>
                    <VSelect v-model="roleType" :options="roleTypes" placeholder="Select role type" />
                  </Control>
                </Field>

                <Field class="form-field">
                  <FieldLabel label="What is the ideal job title are you pursuing?*" required />
                  <Control>
                    <VInput v-model="jobTitle" placeholder="Enter your ideal job title" />
                  </Control>
                </Field>

                <Field class="form-field">
                  <FieldLabel label="What is your most recent, current, or desired job function?*" required />
                  <Control>
                    <VSelect v-model="jobFunction" :options="jobFunctions" placeholder="Please Select" />
                  </Control>
                </Field>

                <Field class="form-field">
                  <FieldLabel label="How did you hear about us?*" required />
                  <Control>
                    <VSelect v-model="referralSource" :options="referralSources" placeholder="Please Select" />
                  </Control>
                </Field>

                <Field class="form-field privacy-field">
                  <Control>
                    <Checkbox v-model="marketingConsent">
                      I agree to receive other communications from GhostJobs.io.*
                    </Checkbox>
                    <p class="privacy-note">You can unsubscribe at any time. For more details, see our Privacy Policy.
                    </p>
                  </Control>
                </Field>

                <p class="consent-text">By submitting this form, you consent to GhostJobs.io storing and processing your
                  personal data for the purpose of providing the requested content.</p>

                <Button type="submit" class="submit-button" color="primary" :disabled="!isFormValid">
                  Join Community
                </Button>
              </form>
            </div>

            <!-- Social Links Grid -->
            <div class="platforms-grid">
              <a v-for="link in socialLinks" :key="link.name" :href="link.url" class="platform-card"
                :class="{ 'is-discord': link.name === 'Discord' }" target="_blank" rel="noopener noreferrer">
                <div class="card-content">
                  <span class="platform-icon">
                    <i class="iconify" :data-icon="link.icon"></i>
                  </span>
                  <div class="platform-details">
                    <h3>{{ link.name }}</h3>
                    <p v-if="link.name === 'Discord'" class="highlight">Join 15,000+ members</p>
                    <p v-else-if="link.name === 'X'" class="highlight">Latest updates & tips</p>
                    <p v-else-if="link.name === 'Linkedin'" class="highlight">Professional insights</p>
                    <p v-else-if="link.name === 'Chrome'" class="highlight">Smart job search tools</p>
                  </div>
                </div>
                <div class="card-action">
                  <span class="action-text">{{ link.name === 'Discord' ? 'Join Community' : 'Connect' }}</span>
                  <i class="iconify" data-icon="ph:arrow-right-bold"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  </div>
</template>

<style lang="scss" scoped>
.community-page {
  background: linear-gradient(180deg, var(--wrap-muted-color) 0%, #fff 100%);
  min-height: 100vh;
}

.hero-section {
  padding: 4rem 0;

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-text {
    text-align: center;
    margin-bottom: 3rem;
  }

  .badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--primary);
    color: white;
    border-radius: 2rem;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    transform: translateY(0);
    animation: float 3s ease-in-out infinite;
  }

  .title.is-2 {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, var(--dark-text) 0%, var(--primary) 100%);
    background-clip: text;
    color: transparent;
  }

  .subtitle.is-4 {
    font-size: 1.25rem;
    color: var(--light-text);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
}

.main-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.form-container {
  background: var(--card-bg-color);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 8px 24px rgb(var(--primary-rgb) / 6%);
}

.quick-form {
  .form-field {
    margin-bottom: 1.25rem;

    &.privacy-field {
      margin-top: 1.5rem;
    }
  }

  .privacy-note {
    font-size: 0.85rem;
    color: var(--light-text);
    margin-top: 0.5rem;
    margin-left: 1.75rem;
  }

  .consent-text {
    font-size: 0.85rem;
    color: var(--light-text);
    margin: 1rem 0;
    line-height: 1.5;
  }
}

.submit-button {
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.platforms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.platform-card {
  background: var(--card-bg-color);
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  position: relative;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgb(var(--primary-rgb) / 8%);

    .card-action {
      background: var(--primary);
      color: white;

      i {
        transform: translateX(4px);
      }
    }
  }

  &.is-discord {
    background: #5865F2;
    border: none;

    .platform-details {

      h3,
      p {
        color: white;
      }
    }

    .platform-icon {
      color: white;
    }

    .card-action {
      background: white;
      color: #5865F2;
    }

    &:hover .card-action {
      background: white;
      color: #5865F2;
    }
  }

  .card-content {
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .platform-icon {
    font-size: 2rem;
    color: var(--primary);
  }

  .platform-details {
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--dark-text);
      margin-bottom: 0.25rem;
    }

    .highlight {
      font-size: 0.9rem;
      color: var(--light-text);
      margin: 0;
    }
  }

  .card-action {
    padding: 0.75rem 1.25rem;
    background: var(--wrap-muted-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;

    .action-text {
      font-size: 0.9rem;
      font-weight: 500;
    }

    i {
      transition: transform 0.3s ease;
    }
  }
}

@media only screen and (width <=1024px) {
  .main-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .platforms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media only screen and (width <=767px) {
  .hero-section {
    padding: 3rem 0;

    .title.is-2 {
      font-size: 2.5rem;
    }
  }

  .form-container {
    padding: 1.5rem;
  }

  .platforms-grid {
    grid-template-columns: 1fr;
  }

  .platform-card {
    margin: 0;
  }
}
</style>
