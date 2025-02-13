<script setup lang="ts">
import { computed } from 'vue'
import { useSelectedCompanyStore } from '/@src/stores/selectedCompany'
import { useRouter } from 'vue-router'
import { VueDataUi, type VueUiStackbarDatasetItem, type VueUiStackbarConfig } from 'vue-data-ui'
import 'vue-data-ui/style.css'

const selectedCompanyStore = useSelectedCompanyStore()
const router = useRouter()

if (!selectedCompanyStore.company) {
  router.push('/') // Adjust if needed
}

const company = computed(() => selectedCompanyStore.company)
const jobs = computed(() => selectedCompanyStore.jobs)
const storeReports = computed(() => selectedCompanyStore.reports)

// Compute reports per job
const reportCountByJob = computed(() => {
  const counts: Record<string, number> = {}
  storeReports.value?.forEach((report: any) => {
    if (report.job_id) {
      counts[report.job_id] = (counts[report.job_id] || 0) + 1
    }
  })
  return counts
})

function formatJobDate(dateString: string): string {
  if (!dateString) return 'Unknown Date'
  return dateString
}

// Compute monthly reports for last 6 months
function getLastSixMonths(): Date[] {
  const months: Date[] = []
  const now = new Date()
  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push(d)
  }
  return months.reverse()
}

const lastSixMonths = computed(() => getLastSixMonths())
const lastSixMonthsLabels = computed(() =>
  lastSixMonths.value.map((date) =>
    date.toLocaleString('default', { month: 'short', year: '2-digit' })
  )
)

const lastSixMonthsData = computed(() => {
  const counts = lastSixMonths.value.map(() => 0)
  storeReports.value?.forEach((report: any) => {
    const rDate = new Date(report.created_at)
    lastSixMonths.value.forEach((monthDate, idx) => {
      if (
        rDate.getFullYear() === monthDate.getFullYear() &&
        rDate.getMonth() === monthDate.getMonth()
      ) {
        counts[idx] += 1
      }
    })
  })
  return counts
})

// Prepare dataset for the monthly reports bar chart
const reportsStackbarDataset = computed<VueUiStackbarDatasetItem[]>(() => [
  {
    name: 'Reports',
    series: lastSixMonthsData.value,
  },
])

// Basic config for the stackbar
const reportsStackbarConfig = computed<VueUiStackbarConfig>(() => ({
  orientation: 'vertical',
  // If you want tooltips, legends, etc., configure here
  showTooltip: true,
  // Add labels or other config as needed
}))
</script>

<template>
  <Section color="grey">
    <div class="profile-wrapper">
      <!-- Monthly Reports Chart Card -->
      <Card class="chart-card">
        <div class="chart-card-head">
          <h3>Monthly Reports</h3>
        </div>
        <div class="chart-card-body">
          <p class="chart-description">
            The bar chart below shows the number of reports over the last 6 months.
          </p>
          <div class="chart-container">
            <VueDataUi
              component="VueUiStackbar"
              :dataset="reportsStackbarDataset"
              :config="reportsStackbarConfig"
            />
            <div class="chart-axis-labels">
              <span
                v-for="(label, idx) in lastSixMonthsLabels"
                :key="idx"
                class="chart-axis-label"
              >
                {{ label }}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <!-- Overview Chart Placeholder Card -->
      <Card class="chart-card">
        <div class="chart-card-head">
          <h3>Jobs Overview</h3>
        </div>
        <div class="chart-card-body">
          <p class="chart-description">
            Below is a snapshot of the current job openings. (Chart not implemented yet)
          </p>
          <div class="chart-placeholder">
            <div class="placeholder-box">
              [ Chart Placeholder ]
            </div>
          </div>
        </div>
      </Card>

      <!-- Jobs List Card -->
      <Card class="jobs-card">
        <div class="jobs-card-head">
          <h3>Job Postings</h3>
          <RouterLink to="/jobs/">
            View All
          </RouterLink>
        </div>
        <div class="jobs-card-body">
          <div class="jobs">
            <div
              v-if="!jobs || jobs.length === 0"
              class="no-jobs"
            >
              <p>No job postings found for this company.</p>
            </div>
            <div
              v-for="(job, index) in jobs"
              v-else
              :key="index"
              class="job"
            >
              <img
                :src="company.logo_url || 'path_to_default_logo.png'"
                alt="Company logo"
              >
              <div class="meta">
                <h3>{{ job.title || 'No Title' }}</h3>
                <span>
                  {{ job.employment_type || 'Full-time' }}
                  <small>{{ job.applicant_count || 0 }} Applicants</small>
                </span>
                <span>{{ formatJobDate(job.posted_at) }} - {{ job.location || 'Unknown Location' }}</span>
                <p>Reports Linked: {{ reportCountByJob[job.job_id] || 0 }}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </Section>
</template>

<style scoped lang="scss">
.profile-wrapper {
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem; /* spacing between cards */
}

/* General Card Styling for charts */
.chart-card, .jobs-card {
  border: 1px solid var(--wrap-border-color);
  border-radius: 8px;
  background: #fff;
  padding: 1.5rem;
}

.chart-card-head, .jobs-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    font-family: var(--font-alt);
    font-size: 1rem;
    font-weight: 600;
    color: var(--title-color);
    margin: 0;
  }

  > a {
    font-size: 0.9rem;
    font-family: var(--font);
    font-weight: 500;
    color: var(--primary);
    text-decoration: none;
  }
}

.chart-card-body, .jobs-card-body {
  .chart-description {
    font-size: 0.9rem;
    font-family: var(--font);
    color: var(--light-text);
    margin-bottom: 1rem;
  }
}

/* Chart specific styles */
.chart-container {
  position: relative;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
}

.chart-axis-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;

  .chart-axis-label {
    font-size: 0.8rem;
    font-family: var(--font);
    color: var(--medium-text);
  }
}

.chart-placeholder {
  .placeholder-box {
    width: 100%;
    height: 200px;
    background: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    font-size: 0.9rem;
    border-radius: 8px;
  }
}

/* Jobs List Styling */
.jobs {
  .no-jobs {
    p {
      font-size: 0.9rem;
      font-family: var(--font);
      color: var(--light-text);
    }
  }

  .job {
    display: flex;
    align-items: flex-start;

    + .job {
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid var(--wrap-border-color);
    }

    > img {
      display: block;
      height: 44px;
      width: 44px;
      border-radius: 50%;
      object-fit: cover;
    }

    .meta {
      margin-left: 1rem;

      h3 {
        font-family: var(--font-alt);
        font-size: 1.1rem;
        color: var(--title-color);
        margin-bottom: 0.5rem;
      }

      span {
        display: block;
        font-size: 0.9rem;
        font-family: var(--font);
        color: var(--light-text);

        small {
          margin-left: 0.5rem;
          color: var(--medium-text);
          font-size: 0.8rem;
        }
      }

      p {
        color: var(--medium-text);
        font-size: 0.95rem;
        margin-top: 0.75rem;
      }
    }
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-wrapper {
    padding-bottom: 3rem;
  }

  .job {
    flex-direction: column;
    align-items: flex-start;

    > img {
      margin-bottom: 0.75rem;
    }

    .meta {
      margin-left: 0;
    }
  }
}
</style>
