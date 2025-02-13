<script setup lang="ts">
import { countries as staticCountries } from '../data/country/countries';

import { ref } from 'vue'

const webhook = 'https://hook.us1.make.com/mrtf37v0nrvesbcdmlvwnlp9qui1zpgw';

const isSubmitted = ref(false); // Track form submission state


const countries = ref(staticCountries);
const name = ref('')
const email = ref('')
const selectedCountry = ref(null)
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
  { label: "Company job posting ‘health’ statistics", value: "health_statistics" },
  { label: "Exclusive, highly vetted job postings", value: "exclusive_postings" },
  { label: "Recommendations for legitimate job opportunities", value: "legitimate_recommendations" },
  { label: "Advanced company insights/analytics (i.e. correlation of jobs to growth trends, financials, employee reviews, etc..)", value: "advanced_company_insights" },
  { label: "Job Application Tracking", value: "application_tracking" },
  { label: "Company Contact Information, if known (e.g., recruiter, hiring manager, etc.)", value: "company_contact_info" },
  { label: "Job Search Hacking Playbook/Tools", value: "job_search_tools" },
  { label: "Other (please include notes at the end)", value: "other" },
  { label: "Automated applicant campaigns (i.e. automated applications, company email sequencing, etc..)", value: "automated_campaigns" }
];

const handleSubmit = async () => {
  const formData = {
    name: name.value,
    email: email.value,
    selectedCountry: selectedCountry.value,
    jobApplicationFrequency: jobApplicationFrequency.value,
    encounteredFakeJob: encounteredFakeJob.value,
    frequencyOfFakeJobs: frequencyOfFakeJobs.value,
    jobBoards: jobBoards.value,
    wastedHours: wastedHours.value,
    fakeJobIndicators: fakeJobIndicators.value,
    usefulFeatures: usefulFeatures.value,
    anonymousForumInterest: anonymousForumInterest.value,
    freeVersionInterest: freeVersionInterest.value,
    subscriptionLikelihood: subscriptionLikelihood.value,
    additionalComments: additionalComments.value,
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
  <Section
    wave="wave-1"
    shape-color="grey"
  >
    <Container>
      <div class="content py-6">
        <Title
          tag="h3"
          :size="4"
          weight="semi"
          narrow
        >
          Your Privacy Matters: We Never Sell, Share, or Publish Your Data.
        </Title>
        <p class="paragraph">
          Take part in our community survey and join our wait list.
        </p>
  
        <!-- Show Thank You Message After Submission -->
        <div v-if="isSubmitted">
          <p class="thank-you-message">
            Thank you for completing the survey! Your feedback is valuable to us, and it will help us improve our services. We appreciate your time and effort.
          </p>
        </div>

        <!-- Show Form if Not Submitted -->
        <form
          v-else
          @submit.prevent="handleSubmit"
        >
          <!-- Name Field -->
          <Field>
            <FieldLabel label="Name" />
            <Control>
              <VInput
                v-model="name"
                placeholder="Enter your name"
              />
            </Control>
          </Field>
  
          <!-- Email Field -->
          <Field>
            <FieldLabel label="Email" />
            <Control icon="feather:mail">
              <VInput
                v-model="email"
                type="email"
                placeholder="Enter your email"
              />
            </Control>
          </Field>

          <Field>
            <FieldLabel label="Country" />
            <Control>
              <VSelect
                v-model="selectedCountry"
                :options="countries"
              />
            </Control>
          </Field>
  
          <!-- Job Application Frequency -->
          <Field>
            <FieldLabel label="How often do you apply for jobs online?" />
            <Control>
              <VSelect
                v-model="jobApplicationFrequency"
                :options="applyRate"
              />
            </Control>
          </Field>
  
          <!-- Encountered Fake Jobs Question -->
          <Field>
            <FieldLabel label="Have you ever encountered a job posting that you believed was not genuine?" />
            <Control>
              <Checkbox
                v-model="encounteredFakeJob"
                label="Yes"
              />
            </Control>
          </Field>
  
          <!-- Frequency of Fake Jobs -->
          <Field v-if="encounteredFakeJob">
            <FieldLabel label="How often do you come across postings you feel aren't genuine?" />
            <Control>
              <VSelect
                v-model="frequencyOfFakeJobs"
                :options="wrongPost"
              />
            </Control>
          </Field>
  
          <!-- Job Boards -->
          <Field v-if="encounteredFakeJob">
            <FieldLabel label="What sites or job boards did you experience this?" />
            <Control>
              <Checkbox
                v-model="jobBoards"
                name="jobBoards"
                label="Employer Website"
                value="Employer Website"
              />
              <Checkbox
                v-model="jobBoards"
                name="jobBoards"
                label="Indeed"
                value="Indeed"
              />
              <Checkbox
                v-model="jobBoards"
                name="jobBoards"
                label="LinkedIn"
                value="LinkedIn"
              />
              <Checkbox
                v-model="jobBoards"
                name="jobBoards"
                label="ZipRecruiter"
                value="ZipRecruiter"
              />
              <Checkbox
                v-model="jobBoards"
                name="jobBoards"
                label="Glassdoor"
                value="Glassdoor"
              />
              <Checkbox
                v-model="jobBoards"
                name="jobBoards"
                label="Startup Job Boards"
                value="Startup Job Boards"
              />
              <Checkbox
                v-model="jobBoards"
                name="jobBoards"
                label="Other"
                value="Other"
              />
            </Control>
          </Field>
  
          <!-- Estimated Wasted Hours -->
          <Field v-if="encounteredFakeJob">
            <FieldLabel label="How many estimated hours do you think you've wasted on applying for suspected fake job postings?" />
            <Control>
              <VInput
                v-model="wastedHours"
                type="number"
                min="0"
              />
            </Control>
          </Field>
  
          <!-- Indicators of Fake Job Postings -->
          <Field v-if="encounteredFakeJob">
            <FieldLabel label="What indicators make you suspect that a job posting might be fake?" />
            <Control>
              <div
                v-for="indicator in indicatorsPost"
                :key="indicator.value"
              >
                <Checkbox
                  v-model="fakeJobIndicators"
                  :name="`fakeJobIndicator-${indicator.value}`"
                  :label="indicator.label"
                  :value="indicator.value"
                />
              </div>
            </Control>
          </Field>
  
          <!-- Useful Features -->
          <Field>
            <FieldLabel label="Which of the following features would you find most useful in a job search tool?" />
            <Control>
              <div
                v-for="feature in usefulFeaturesOptions"
                :key="feature.value"
              >
                <Checkbox
                  v-model="usefulFeatures"
                  :name="`usefulFeature-${feature.value}`"
                  :label="feature.label"
                  :value="feature.value"
                />
              </div>
            </Control>
          </Field>
  
          <!-- Interest in Anonymous Forum -->
          <!-- <Field>
            <FieldLabel label="Would you be interested in participating in an anonymous community forum to discuss job search experiences and tips?" />
            <Control>
              <Checkbox
                v-model="anonymousForumInterest"
                label="Yes"
              />
            </Control>
          </Field> -->
  
          <!-- Interest in Free Version -->
          <!-- <Field>
            <FieldLabel label="Would you use a free version of our tool with basic features?" />
            <Control>
              <Checkbox
                v-model="freeVersionInterest"
                label="Yes"
              />
            </Control>
          </Field> -->
  
          <!-- Subscription Likelihood -->
          <!-- <Field>
            <FieldLabel label="How likely are you to pay for a nominal subscription per month for premium features?" />
            <Control>
              <VSelect
                v-model="subscriptionLikelihood"
                type="number"
                min="0"
                max="10"
                placeholder="Rate from 0 to 10"
              />
            </Control>
          </Field> -->
  
          <!-- Additional Comments -->
          <Field>
            <FieldLabel label="Additional Comments or Suggestions" />
            <Control>
              <VTextarea
                v-model="additionalComments"
                placeholder="Share any other negative experiences or suggestions here..."
              />
            </Control>
          </Field>
  
         
          <Button
            type="submit"
            class="btn-submit"
            size="large"
            color="primary"
            icon-right="feather:arrow-right"
          >
            submit
          </Button>
        </form>
      </div>
    </Container>
  </Section>
</template>

