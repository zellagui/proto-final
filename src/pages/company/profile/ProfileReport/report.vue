<script setup lang="ts">
import { computed } from 'vue'
import { useSelectedCompanyStore } from '/@src/stores/selectedCompany'
import { useRouter } from 'vue-router'
import { VueDataUi, type VueUiDonutDatasetItem, type VueUiDonutConfig } from 'vue-data-ui'
import 'vue-data-ui/style.css'

const selectedCompanyStore = useSelectedCompanyStore()
const router = useRouter()

// Redirect if no company is selected (optional)
if (!selectedCompanyStore.company) {
  router.push('/') // Adjust the path if needed
}

// Computed properties to get company and reports from store
const company = computed(() => selectedCompanyStore.company)
const reports = computed(() => selectedCompanyStore.reports)

// Compute frequency of each suspicious reason
const reasonCounts = computed(() => {
  const counts: Record<string, number> = {}
  if (reports.value) {
    reports.value.forEach((report: any) => {
      const reasons = report?.suspicion_details?.reasons || []
      reasons.forEach((r: string) => {
        counts[r] = (counts[r] || 0) + 1
      })
    })
  }
  return counts
})

const chartLabels = computed(() => Object.keys(reasonCounts.value))
const chartDataValues = computed(() => Object.values(reasonCounts.value))

// Color palette for donut segments
const vibrantPalette = [
  '#FF6B6B', // red
  '#4ECDC4', // teal
  '#FFD93D', // yellow
  '#5C7AEA', // blue
  '#FF9F1C', // orange
  '#FF6BBF', // pink
  '#9B5DE5', // purple
  '#00C851', // green
]

// Prepare dataset for VueUiDonut
const donutDataset = computed<VueUiDonutDatasetItem[]>(() =>
  chartLabels.value.map((label, i) => ({
    name: label,
    values: [chartDataValues.value[i]],
    color: vibrantPalette[i % vibrantPalette.length],
  }))
)

// Donut chart configuration (adjust as needed)
const donutConfig = computed<VueUiDonutConfig>(() => ({
  innerRadius: 1, // makes a donut (60% inner radius)
  showLabels: false, // no internal labels, we have our own legend
  tooltip: false, // handling display in a custom manner
}))

// Compute percentages for each reason
const reasonPercentages = computed(() => {
  const counts = reasonCounts.value
  const total = Object.values(counts).reduce((sum, val) => sum + val, 0)
  return chartLabels.value.map((label, i) => {
    const value = counts[label]
    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0'
    return {
      label,
      color: vibrantPalette[i % vibrantPalette.length],
      percentage,
    }
  })
})

// Utility function to format report date
function formatReportDate(dateString: string): string {
  if (!dateString) return 'Unknown Date'
  const date = new Date(dateString)
  return date.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
}
</script>

<template>
  <Section color="grey">
    <div class="profile-wrapper">
      <!-- Reports Card -->
      <Card class="reports-card">
        <div class="reports-card-head">
          <h3>Reports</h3>
          <!-- Optional View All link -->
          <RouterLink to="/reports/">
            View All
          </RouterLink>
        </div>

        <div class="reports-card-body">
          <!-- Chart Section -->
          <div class="chart-section">
            <h4>Reports Overview</h4>
            <p class="chart-description">
              Below is a quick visualization of the reasons behind the reports.
            </p>

            <!-- Donut Chart -->
            <div class="donut-chart-container">
              <VueDataUi
                component="VueUiDonut"
                :dataset="donutDataset"
                :config="donutConfig"
                class="donut-chart"
              />
            </div>
          </div>

          <!-- Reports List -->
          <div class="reports">
            <!-- If no reports -->
            <div
              v-if="!reports || reports.length === 0"
              class="no-reports"
            >
              <p>No reports found for this company.</p>
            </div>

            <!-- If reports are available -->
            <div
              v-for="(report, index) in reports"
              v-else
              :key="report.report_id"
              class="report"
            >
              <img
                :src="company.logo_url || 'path_to_default_logo.png'"
                alt="Company logo"
              >
              <div class="meta">
                <h3>Report: {{ report.report_type || 'Unknown Type' }}</h3>
                <span>
                  User ID: {{ report.user_id || 'Anonymous User' }}
                  <small>{{ report.status || 'Status Unknown' }}</small>
                </span>
                <span>{{ formatReportDate(report.created_at) }}</span>
                <p class="job-info">
                  Job ID: {{ report.job_id || 'Not provided' }}
                </p>
                <p class="comments">
                  {{ report.suspicion_details?.additionalComments?.trim() || 'No additional comments provided.' }}
                </p>
                <div class="suspicion-details">
                  <strong>Suspicion Reasons:</strong>
                  <ul>
                    <li
                      v-for="(reason, i) in report.suspicion_details?.reasons || []"
                      :key="i"
                    >
                      {{ reason }}
                    </li>
                  </ul>
                  <div v-if="report.suspicion_details?.otherReason?.trim()">
                    <strong>Other Reason:</strong>
                    <p>{{ report.suspicion_details.otherReason }}</p>
                  </div>
                </div>
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
}

/* Reports Card Styling */
.reports-card {
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .reports-card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h3 {
      font-family: var(--font-alt);
      font-size: 1rem;
      font-weight: 600;
      color: var(--title-color);
    }

    > a {
      font-size: 0.9rem;
      font-family: var(--font);
      font-weight: 500;
      color: var(--primary);
    }
  }

  .reports-card-body {
    .chart-section {
      margin-bottom: 2rem;

      h4 {
        font-family: var(--font-alt);
        font-size: 1rem;
        font-weight: 600;
        color: var(--title-color);
        margin-bottom: 0.5rem;
      }

      .chart-description {
        font-size: 0.9rem;
        font-family: var(--font);
        color: var(--light-text);
        margin-bottom: 1rem;
      }

      .donut-chart-container {
        max-width: 360px;
        margin: 0 auto 1rem;
      }

      .reason-legend {
        margin-top: 1rem;

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr;
          row-gap: 0.5rem;

          li {
            display: flex;
            align-items: center;
            font-size: 0.9rem;
            font-family: var(--font);
            color: var(--title-color);

            .color-block {
              display: inline-block;
              width: 10px;
              height: 10px;
              border-radius: 2px;
              margin-right: 0.5rem;
            }

            .label {
              flex: 1;
            }

            .percentage {
              color: var(--medium-text);
              font-size: 0.85rem;
            }
          }
        }
      }

      .no-data {
        text-align: center;
        font-size: 0.9rem;
        color: var(--light-text);
      }
    }

    .reports {
      .no-reports {
        p {
          font-size: 0.9rem;
          font-family: var(--font);
          color: var(--light-text);
        }
      }

      .report {
        display: flex;
        align-items: flex-start;

        + .report {
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

          .job-info {
            font-size: 0.9rem;
            font-family: var(--font);
            color: var(--medium-text);
            margin-top: 0.5rem;
          }

          .comments {
            color: var(--medium-text);
            font-size: 0.95rem;
            margin-top: 0.75rem;
          }

          .suspicion-details {
            margin-top: 0.75rem;
            font-size: 0.9rem;
            font-family: var(--font);

            strong {
              color: var(--title-color);
              display: block;
              margin-bottom: 0.3rem;
            }

            ul {
              list-style: disc;
              padding-left: 1.5rem;

              li {
                color: var(--medium-text);
                margin-bottom: 0.3rem;
              }
            }

            p {
              color: var(--medium-text);
              margin-top: 0.3rem;
              font-size: 0.9rem;
            }
          }
        }
      }
    }
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-wrapper {
    padding-bottom: 3rem;
  }

  .reports-card-body .reports .report {
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
