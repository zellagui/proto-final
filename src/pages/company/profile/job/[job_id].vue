# route lang="yaml"
meta:
layout: default
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSelectedCompanyStore } from '/@src/stores/selectedCompany';
import JobDetails from '../job_details.vue';
import companiesData from '../../../../data/beta-data/10-companies copy.jsonl?raw'

const route = useRoute();
const router = useRouter();
const selectedCompanyStore = useSelectedCompanyStore();
const jobId = route.params.job_id as string;

// Import sample files and augmented files
const sampleFiles = import.meta.glob('../../../../data/beta-data/samples copy/*_sample.json', { as: 'raw' })
const augmentedFiles = import.meta.glob('../../../../data/beta-data/augmented_jobs.py/*_augmented.json', { as: 'raw' })

// Debug available files
console.log('Available sample files:', Object.keys(sampleFiles))
console.log('Available augmented files:', Object.keys(augmentedFiles))

// get job data
const job = ref<any>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Function to format company name for file path
const formatCompanyNameForFile = (name: string): string => {
  // First normalize the name
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase();

  // Map special cases to their correct file names
  const nameMap: { [key: string]: string } = {
    'bank_of_america': 'Bank_of_America',
    'capital_one': 'Capital_One',
    'cisco': 'Cisco',
    'family_dollar': 'Family_Dollar',
    'intermountain_health': 'Intermountain_Health',
    'lululemon': 'lululemon',
    'microsoft': 'Microsoft',
    'nbcuniversal': 'NBCUniversal',
    'nike': 'Nike',
    'skechers': 'Skechers',
    'trinity_health': 'Trinity_Health',
    'verizon': 'Verizon'
  };

  return nameMap[normalized] || normalized;
};

async function fetchJob() {
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
      const lines = companiesData.trim().split('\n');
      const companies = lines.map(line => JSON.parse(line));
      const company = companies.find(c => c.name === companyName);
      if (!company) throw new Error(`Company not found: ${companyName}`);
      selectedCompanyStore.setCompany(company);
    }

    // Load jobs data
    const formattedName = formatCompanyNameForFile(companyName);
    console.log('Loading jobs for company:', formattedName);
    console.log('Looking for job ID:', jobId);

    // Construct the file paths
    const sampleFilePath = `../../../../data/beta-data/samples copy/${formattedName}_sample.json`
    console.log('Looking for sample file:', sampleFilePath);

    if (sampleFilePath in sampleFiles) {
      const rawData = await sampleFiles[sampleFilePath]()
      const jobsData = JSON.parse(rawData)
      console.log('Found jobs:', jobsData.jobs.length);

      let foundJob = jobsData.jobs.find((j: any) => j.id.toString() === jobId.toString());

      if (!foundJob) {
        console.error('Available job IDs:', jobsData.jobs.map((j: any) => j.id));
        throw new Error(`Job ${jobId} not found for company: ${formattedName}`);
      }

      // Try to load augmented data if available
      try {
        const augmentedName = formattedName === 'Cisco' ? 'cicso' : formattedName.toLowerCase();
        const augmentedFilePath = `../../../../data/beta-data/augmented_jobs.py/${augmentedName}_augmented.json`;
        console.log('Looking for augmented file:', augmentedFilePath);

        if (augmentedFilePath in augmentedFiles) {
          const augmentedRawData = await augmentedFiles[augmentedFilePath]();
          const augmentedData = JSON.parse(augmentedRawData);
          const augmentedJob = augmentedData.augmented_jobs?.find(
            (j: any) => j.id.toString() === jobId.toString()
          );

          if (augmentedJob) {
            console.log('Found augmented data for job:', jobId);
            foundJob = {
              ...foundJob,
              augmented: augmentedJob.augmented
            };
          } else {
            console.log('No augmented data found for job:', jobId);
          }
        } else {
          console.log('No augmented file available for:', formattedName);
        }
      } catch (augmentedError) {
        console.warn('Failed to load augmented data:', augmentedError);
        // Continue without augmented data
      }

      job.value = foundJob;
    } else {
      console.error('Jobs file not found for:', formattedName);
      console.error('Available files:', Object.keys(sampleFiles));
      throw new Error(`Jobs data not found for ${formattedName}`);
    }
  } catch (error) {
    console.error('Error loading job:', error);
    router.replace('/');
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchJob);
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
        <button class="button is-primary mt-4" @click="router.back()">
          Go Back
        </button>
      </div>
    </div>
    <div v-else-if="job">
      <JobDetails :job="job" :loading="isLoading" :error="error" />
    </div>
  </div>
</template>
