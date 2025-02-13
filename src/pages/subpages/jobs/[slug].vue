<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import JobDetails from '/@src/pages/company/profile/job_details.vue';

const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;

// get job data
const job = ref<any>(null);

async function fetchJob() {
  try {
    // Extract company name and job ID from the slug
    const [companyName, jobId] = slug.split('--');
    if (!companyName || !jobId) {
      throw new Error('Invalid job URL');
    }

    // Format company name for file path
    const formattedName = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

    // Fetch jobs data
    const response = await fetch(`/src/prototype-data-v1 copy/samples copy/${formattedName}_sample.json`);
    if (!response.ok) throw new Error('Jobs data not found');

    const data = await response.json();
    const foundJob = data.jobs.find((j: any) => j.id === jobId);

    if (!foundJob) {
      throw new Error('Job not found');
    }

    job.value = foundJob;
  } catch (error) {
    console.error('Error loading job:', error);
    router.replace('/');
  }
}

onMounted(fetchJob);
</script>

<template>
  <div>
    <Section overflown>
      <Container v-if="job">
        <JobDetails :job="job" />
      </Container>
      <Container v-else>
        <div class="has-text-centered py-6">
          <p>Loading job details...</p>
        </div>
      </Container>
    </Section>
  </div>
</template>
