<template>
  <Card class="jobs-list-card">
    <div class="jobs-list-card-head">
      <div class="title-wrap">
        <h3>Available Positions</h3>
        <p class="subtitle">
          {{ jobs.length }} open positions at {{ company?.name || 'the company' }}
        </p>
      </div>
    </div>

    <div class="jobs-list-card-body">
      <div
        v-if="isLoading"
        class="loading-state"
      >
        <p>Loading jobs...</p>
      </div>

      <div
        v-else-if="error"
        class="error-state"
      >
        <p>{{ error }}</p>
      </div>

      <template v-else>
        <!-- Jobs List Table -->
        <SimpleTable :bordered="false">
          <SimpleTableRow>
            <SimpleTableHeader>Position</SimpleTableHeader>
            <SimpleTableHeader>Location</SimpleTableHeader>
            <SimpleTableHeader>Job Type</SimpleTableHeader>
            <SimpleTableHeader>Salary</SimpleTableHeader>
            <SimpleTableHeader>Posted</SimpleTableHeader>
            <SimpleTableHeader>Action</SimpleTableHeader>
          </SimpleTableRow>

          <SimpleTableRow
            v-for="(job, index) in displayedJobs"
            :key="job.id || index"
          >
            <!-- Position Column -->
            <SimpleTableCell>
              <SimpleTableCellFlex>
                <template #media>
                  <img
                    :src="job.company_logo || company?.logo || '/img/company/default.svg'"
                    :alt="company?.name"
                    class="company-logo-small"
                  >
                </template>
                <template #content>
                  <Title
                    tag="h3"
                    :size="7"
                    weight="semi"
                    narrow
                    class="job-title"
                  >
                    {{ job.title }}
                  </Title>
                  <span
                    v-if="job.job_level"
                    class="tag is-rounded is-primary is-light level-tag"
                  >
                    {{ job.job_level }}
                  </span>
                </template>
              </SimpleTableCellFlex>
            </SimpleTableCell>

            <!-- Location Column -->
            <SimpleTableCell>
              <div class="location-info">
                <span class="location">{{ job.location?.city }}, {{ job.location?.state }}</span>
                <span
                  v-if="job.is_remote"
                  class="remote-badge"
                >
                  <i
                    class="iconify"
                    data-icon="ph:house-duotone"
                  />
                  Remote
                </span>
              </div>
            </SimpleTableCell>

            <!-- Job Type Column -->
            <SimpleTableCell>
              <span
                v-if="job.job_type?.length"
                class="tag is-rounded"
              >
                {{ formatJobType(job.job_type[0]) }}
              </span>
            </SimpleTableCell>

            <!-- Salary Column -->
            <SimpleTableCell>
              <p class="number-display">
                {{ formatSalary(job.compensation) }}
              </p>
            </SimpleTableCell>

            <!-- Posted Date Column -->
            <SimpleTableCell>
              <span class="posted-date">
                {{ formatDate(job.date_posted) }}
              </span>
            </SimpleTableCell>

            <!-- Action Column -->
            <SimpleTableCell>
              <RouterLink
                :to="`/company/profile/job/${job.id}?company=${encodeURIComponent(company?.name || '')}`"
                class="link has-underline is-reversed rem-90"
              >
                View Details
              </RouterLink>
            </SimpleTableCell>
          </SimpleTableRow>
        </SimpleTable>

        <!-- See More Button -->
        <div
          v-if="hasMoreJobs && !showAllJobs"
          class="see-more-action"
        >
          <button
            class="button is-primary is-outlined is-rounded"
            @click="showAllJobs = true"
          >
            See More Jobs
            <i
              class="iconify"
              data-icon="ph:arrow-down-duotone"
            />
          </button>
        </div>
      </template>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import Card from '/@src/components/base/card/Card.vue';
import { useSelectedCompanyStore } from '/@src/stores/selectedCompany';

const selectedCompanyStore = useSelectedCompanyStore();
const company = computed(() => selectedCompanyStore.company);

const props = defineProps({
  companyReport: {
    type: Object,
    required: true
  }
});

const jobsData = ref<any>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const JOBS_PER_PAGE = 9;
const showAllJobs = ref(false);

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
const loadJobsData = async () => {
  if (!props.companyReport?.company_name) return;

  try {
    isLoading.value = true;
    const formattedName = formatCompanyNameForFile(props.companyReport.company_name);
    const response = await fetch(`/src/prototype-data-v1 copy/samples copy/${formattedName}_sample.json`);

    if (!response.ok) {
      throw new Error(`Jobs data not found for ${formattedName}`);
    }

    const data = await response.json();
    jobsData.value = data;

    if (!data.jobs || !Array.isArray(data.jobs)) {
      throw new Error('Invalid jobs data format');
    }
  } catch (err) {
    console.error('Error loading jobs data:', err);
    error.value = err instanceof Error ? err.message : 'Failed to load jobs data';
    jobsData.value = null;
  } finally {
    isLoading.value = false;
  }
};

const jobs = computed(() => {
  return jobsData.value?.jobs || [];
});

const displayedJobs = computed(() => {
  if (showAllJobs.value) {
    return jobs.value;
  }
  return jobs.value.slice(0, JOBS_PER_PAGE);
});

const hasMoreJobs = computed(() => {
  return jobs.value.length > JOBS_PER_PAGE;
});

const formatJobType = (type: string) => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const formatSalary = (compensation: any) => {
  if (!compensation) return 'Not specified';

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });

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

const formatDate = (date: string) => {
  if (!date) return 'Not specified';
  const dateObj = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - dateObj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Posted yesterday';
  if (diffDays < 7) return `Posted ${diffDays} days ago`;
  if (diffDays < 30) return `Posted ${Math.floor(diffDays / 7)} weeks ago`;

  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

onMounted(() => {
  loadJobsData();
});
</script>

<style lang="scss" scoped>
.jobs-list-card {
  margin-bottom: 1.5rem;

  .jobs-list-card-head {
    padding: 1rem;
    border-bottom: 1px solid var(--border-color, #eee);

    .title-wrap {
      h3 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--title-color);
      }

      .subtitle {
        margin-top: 0.25rem;
        font-size: 0.9rem;
        color: var(--light-text);
      }
    }
  }

  .jobs-list-card-body {
    padding: 1rem;
  }
}

/* Table styles */
:deep(.table) {
  width: 100%;
  min-width: 800px;

  td {
    vertical-align: middle;
  }
}

/* Company logo styling */
.company-logo-small {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--border-color, #eee);
  padding: 2px;
}

/* Job title and tags */
.job-title {
  margin-bottom: 0.25rem !important;
  color: var(--title-color);
  font-size: 0.95rem;
}

.level-tag {
  font-size: 0.75rem;
}

/* Location info */
.location-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .location {
    font-size: 0.9rem;
    color: var(--light-text);
  }

  .remote-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--success);
    font-weight: 500;

    .iconify {
      font-size: 1em;
    }
  }
}

/* Number display for salary */
.number-display {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0;
}

/* Posted date */
.posted-date {
  font-size: 0.85rem;
  color: var(--light-text);
}

/* Tags styling */
.tag {
  font-size: 0.75rem;
  font-weight: 500;

  &.is-light {
    background: var(--primary-light);
    color: var(--primary);
  }
}

/* Loading and error states */
.loading-state,
.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  text-align: center;
  color: var(--light-text);
  font-size: 0.95rem;
}

.error-state {
  color: var(--danger);
}

/* See more button */
.see-more-action {
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  .button {
    min-width: 200px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;

    .iconify {
      font-size: 1.2em;
      transition: transform 0.2s ease;
    }

    &:hover {
      .iconify {
        transform: translateY(4px);
      }
    }
  }
}

/* Responsive table wrapper */
:deep(.table-wrapper) {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;

    &:hover {
      background: #666;
    }
  }
}
</style>
