<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Job } from '/@src/types';

const props = defineProps<{
  companyName: string;
  currentJobId?: string | number;
}>();

const isLoading = ref(true);
const error = ref<string | null>(null);
const similarJobs = ref<Job[]>([]);

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

// Load jobs from sample file
const loadSimilarJobs = async () => {
  if (!props.companyName) return;

  try {
    isLoading.value = true;
    const formattedName = formatCompanyNameForFile(props.companyName);
    const response = await fetch(`/src/prototype-data-v1 copy/samples copy/${formattedName}_sample.json`);

    if (!response.ok) {
      throw new Error(`Jobs data not found for ${formattedName}`);
    }

    const data = await response.json();
    if (!data.jobs || !Array.isArray(data.jobs)) {
      throw new Error('Invalid jobs data format');
    }

    // Filter out current job and limit to 3 jobs
    similarJobs.value = data.jobs
      .filter(job => job.id !== props.currentJobId);

  } catch (err) {
    console.error('Error loading similar jobs:', err);
    error.value = err instanceof Error ? err.message : 'Failed to load similar jobs';
  } finally {
    isLoading.value = false;
  }
};

const formatSalary = (compensation: any) => {
  if (!compensation) return 'Not specified';

  const min = compensation.min_amount;
  const max = compensation.max_amount;
  const interval = compensation.interval;

  const formatK = (amount: number) => {
    return amount >= 1000 ? `${Math.round(amount / 1000)}k` : amount;
  };

  if (min && max) {
    return `${formatK(min)}$ - ${formatK(max)}$ ${interval}`;
  } else if (min) {
    return `From ${formatK(min)}$ ${interval}`;
  } else if (max) {
    return `Up to ${formatK(max)}$ ${interval}`;
  }

  return 'Not specified';
};

onMounted(() => {
  loadSimilarJobs();
});
</script>

<template>
  <div class="side-card similar-jobs-card">
    <h3>
      <i
        class="iconify"
        data-icon="ph:briefcase-duotone"
      />
      More Jobs at {{ props.companyName }}
    </h3>

    <div class="similar-jobs-list">
      <div
        v-if="isLoading"
        class="loading-state"
      >
        <p>Loading similar jobs...</p>
      </div>

      <div
        v-else-if="error"
        class="error-state"
      >
        <p>{{ error }}</p>
      </div>

      <div
        v-else
        class="jobs-scroll-container"
      >
        <div
          v-for="job in similarJobs"
          :key="job.id"
          class="similar-job-card"
        >
          <div class="job-info">
            <h4 class="job-title">
              {{ job.title }}
            </h4>
            <div class="job-meta">
              <span
                v-if="job.location"
                class="location"
              >
                <i
                  class="iconify"
                  data-icon="ph:map-pin-duotone"
                />
                {{ job.location?.city }}, {{ job.location?.state }}
              </span>
              <span
                v-if="job.compensation"
                class="salary"
              >
                <i
                  class="iconify"
                  data-icon="ph:money-duotone"
                />
                {{ formatSalary(job.compensation) }}
              </span>
            </div>
          </div>
          <div class="job-action">
            <a
              :href="`/company/profile/job/${job.id}?company=${encodeURIComponent(props.companyName)}`"
              class="button is-primary is-small is-rounded"
            >
              View
              <i
                class="iconify"
                data-icon="ph:arrow-right-duotone"
              />
            </a>
          </div>
        </div>
      </div>

      <a
        :href="`/company/profile/jobs?company=${encodeURIComponent(props.companyName)}`"
        class="view-all-link"
      >
        View All Jobs
        <i
          class="iconify"
          data-icon="ph:arrow-right-duotone"
        />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.similar-jobs-card {
  h3 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--title-color);
    margin-bottom: 1.25rem;

    .iconify {
      font-size: 1.2em;
      color: var(--primary);
    }
  }
}

.similar-jobs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.jobs-scroll-container {
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-bottom: 1rem;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--card-bg-color-secondary, #f5f5f5);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--primary-light);
    border-radius: 3px;

    &:hover {
      background: var(--primary);
    }
  }
}

.similar-job-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background: var(--white);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    transform: translateX(4px);
    border-color: var(--primary);

    .job-action .button {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }
  }

  .job-info {
    flex-grow: 1;
    min-width: 0;

    .job-title {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--title-color);
      margin: 0 0 0.5rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .job-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      font-size: 0.8rem;
      color: var(--light-text);

      span {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;

        .iconify {
          font-size: 1.1em;
          color: var(--primary);
        }
      }

      .salary {
        font-weight: 500;
        color: var(--title-color);
      }
    }
  }

  .job-action {
    .button {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.4rem 0.75rem;
      font-size: 0.8rem;
      font-weight: 500;
      background: transparent;
      color: var(--title-color);
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;

      .iconify {
        font-size: 1.1em;
        transition: transform 0.3s ease;
      }

      &:hover {
        .iconify {
          transform: translateX(4px);
        }
      }
    }
  }
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--primary);
  transition: all 0.3s ease;

  .iconify {
    font-size: 1.1em;
    transition: transform 0.3s ease;
  }

  &:hover {
    color: var(--primary-dark);

    .iconify {
      transform: translateX(4px);
    }
  }
}

.loading-state,
.error-state {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--light-text);
  font-size: 0.9rem;
}

.error-state {
  color: var(--danger);
}
</style>
