# route lang="yaml"
meta:
  layout: default
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSelectedCompanyStore } from '/@src/stores/selectedCompany';
import JobDetails from '../job_details.vue';

const route = useRoute();
const router = useRouter();
const selectedCompanyStore = useSelectedCompanyStore();
const jobId = route.params.job_id as string;
const job = ref<any>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Function to format company name for file path
function formatCompanyNameForFile(name: string): string {
  // Map special cases to their correct file names
  const nameMap: { [key: string]: string } = {
    'bank_of_america': 'bank_of_america',
    'capital_one': 'capital_one',
    'cisco': 'cisco',
    'family_dollar': 'family_dollar',
    'intermountain_health': 'intermountain_health',
    'lululemon': 'lululemon',
    'microsoft': 'microsoft',
    'nbcuniversal': 'nbcuniversal',
    'nike': 'nike',
    'skechers': 'skechers',
    'trinity_health': 'trinity_health',
    'verizon': 'verizon'
  };

  // First normalize the name
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();

  // Return mapped name if it exists, otherwise return normalized name
  return nameMap[normalized] || normalized;
}

onMounted(async () => {
  try {
    isLoading.value = true;

    // Get company name from URL or query parameter
    const companyName = decodeURIComponent(route.query.company as string);
    if (!companyName) {
      throw new Error('Company name is required');
    }

    // Load company data if not already loaded
    if (!selectedCompanyStore.company || selectedCompanyStore.company.name !== companyName) {
      // Load company data from the JSONL file
      const companiesResponse = await fetch('/src/prototype-data-v1 copy/10-companies copy.jsonl');
      if (!companiesResponse.ok) throw new Error('Failed to load companies data');

      const text = await companiesResponse.text();
      const companies = text.trim().split('\n').map(line => JSON.parse(line));

      const company = companies.find(c => c.name === companyName);
      if (!company) throw new Error(`Company not found: ${companyName}`);

      selectedCompanyStore.setCompany(company);
    }

    // Load jobs data
    const formattedName = formatCompanyNameForFile(companyName);
    console.log('Loading jobs for company:', formattedName);
    console.log('Looking for job ID:', jobId);

    // Load both regular job data and augmented data
    const [jobsResponse, augmentedResponse] = await Promise.all([
      fetch(`/src/prototype-data-v1 copy/samples copy/${formattedName}_sample.json`),
      fetch(`/src/prototype-data-v1 copy/augmented_jobs.py/${formattedName === 'cisco' ? 'cicso' : formattedName}_augmented.json`)
    ]);

    if (!jobsResponse.ok) {
      throw new Error(`Jobs data not found for company: ${formattedName}`);
    }

    const jobsData = await jobsResponse.json();
    console.log('Found jobs:', jobsData.jobs.length);

    let foundJob = jobsData.jobs.find((j: any) => j.id.toString() === jobId.toString());

    if (!foundJob) {
      console.error('Available job IDs:', jobsData.jobs.map((j: any) => j.id));
      throw new Error(`Job ${jobId} not found for company: ${formattedName}`);
    }

    // If augmented data is available, merge it with the job data
    if (augmentedResponse.ok) {
      try {
        const augmentedData = await augmentedResponse.json();
        const augmentedJob = augmentedData.augmented_jobs?.find(
          (j: any) => j.id.toString() === jobId.toString()
        );

        if (augmentedJob) {
          foundJob = {
            ...foundJob,
            augmented: augmentedJob.augmented
          };
        }
      } catch (augmentedError) {
        console.warn('Failed to parse augmented data:', augmentedError);
        // Continue without augmented data
      }
    } else {
      console.warn('Augmented data not available for:', formattedName);
    }

    job.value = foundJob;
  } catch (err) {
    console.error('Error loading job:', err);
    error.value = err instanceof Error ? err.message : 'Failed to load job details';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div>
    <div v-if="isLoading">
      <div class="has-text-centered py-6">
        <p>Loading job details...</p>
      </div>
    </div>
    <div v-else-if="error">
      <div class="has-text-centered py-6">
        <p class="has-text-danger">
          {{ error }}
        </p>
        <button
          class="button is-primary mt-4"
          @click="router.back()"
        >
          Go Back
        </button>
      </div>
    </div>
    <div v-else-if="job">
      <JobDetails
        :job="job"
        :loading="isLoading"
        :error="error"
      />
    </div>
  </div>
</template>
