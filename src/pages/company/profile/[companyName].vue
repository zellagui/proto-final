# route lang="yaml"
meta:
  layout: default
---

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Company } from '/@src/types/company'
import { useSelectedCompanyStore } from '/@src/stores/selectedCompany'
import { useWindowSize, useMediaQuery } from '@vueuse/core'
import Overview from './profileOverview.vue/overview.vue'
import report from './ProfileReport/report.vue'
import jobs from './profileJob/jobs.vue'

const route = useRoute()
const company = ref<Company | null>(null)
const companyReport = ref<any>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Function to format company name for comparison
function formatCompanyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

// Function to format company name for file path
function formatCompanyNameForFile(name: string): string {
  // First normalize the name
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')  // Use underscore for consistency
    .replace(/^_+|_+$/g, '')
    .toLowerCase();

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

  // Return mapped name if it exists, otherwise return normalized name
  return nameMap[normalized] || normalized;
}

const selectedCompanyStore = useSelectedCompanyStore()

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await fetch('/src/prototype-data-v1 copy/10-companies copy.jsonl')
    if (!response.ok) throw new Error('Failed to load companies data');

    const text = await response.text()
    const lines = text.trim().split('\n')
    const companies = lines.map(line => JSON.parse(line))

    // Find company by formatted name
    const urlName = route.params.companyName as string
    console.log('Looking for company:', urlName);

    const foundCompany = companies.find(c =>
      formatCompanyName(c.name) === formatCompanyName(urlName)
    )

    if (foundCompany) {
      company.value = foundCompany
      selectedCompanyStore.setCompany(foundCompany)

      // Load company report
      try {
        const formattedName = formatCompanyNameForFile(foundCompany.name);
        console.log('Loading report for:', formattedName);
        const reportPath = `/src/prototype-data-v1 copy/company-reports-v2 copy/${formattedName}_analysis.json`;
        console.log('Report path:', reportPath);

        const reportResponse = await fetch(reportPath);
        if (reportResponse.ok) {
          const reportData = await reportResponse.json();

          // Process the report data
          if (reportData) {
            // Format job counts
            if (reportData.location_analysis?.total_jobs) {
              reportData.location_analysis.total_jobs = parseInt(reportData.location_analysis.total_jobs);
            }

            // Format remote percentage
            if (reportData.location_analysis?.remote_jobs) {
              const remoteJobs = parseInt(reportData.location_analysis.remote_jobs);
              const totalJobs = parseInt(reportData.location_analysis.total_jobs);
              reportData.location_analysis.remote_percentage = totalJobs > 0 ?
                ((remoteJobs / totalJobs) * 100).toFixed(2) : 0;
            }

            // Format salary bands
            if (reportData.compensation?.bands) {
              const bands = reportData.compensation.bands;
              ['entry_level', 'mid_level', 'senior_level'].forEach(level => {
                if (bands[level]) {
                  bands[level].range = bands[level].range.map((val: number) =>
                    Math.round(val).toLocaleString()
                  );
                  bands[level].count = parseInt(bands[level].count);
                }
              });
            }
          }

          companyReport.value = reportData;
          selectedCompanyStore.setReport?.(reportData);
        } else {
          console.error('Failed to load company report:', reportResponse.status, reportPath);
        }
      } catch (reportErr) {
        console.error('Error loading company report:', reportErr);
      }
    } else {
      error.value = 'Company not found'
      console.error('Company not found:', urlName);
    }
  } catch (err) {
    error.value = 'Failed to load company data'
    console.error('Error:', err)
  } finally {
    isLoading.value = false
  }
})

// Tabs logic
const activeTab = ref('overview')
const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Reports', value: 'reports' },
  { label: 'Jobs', value: 'jobs' },
  { label: 'Discussion', value: 'discussion' },
]

// Responsiveness
const { width } = useWindowSize()
const isMobile = useMediaQuery('(max-width: 768px)')
</script>

<template>
  <div v-if="company">
    <!-- Company Header -->
    <div class="profile-header">
      <div class="profile-header-inner">
        <div class="profile-avatar">
          <img
            :src="company.logo || '/placeholder-logo.png'"
            :alt="company.name + ' logo'"
            class="avatar"
          >
          <h2 class="company-name">
            {{ company.name }}
          </h2>
          <p class="company-sphere">
            {{ company.sphere || 'Unknown Industry' }}
          </p>
        </div>
      </div>
    </div>

    <div class="profile-content">
      <!-- Tabs -->
      <Tabs
        v-model:selected="activeTab"
        :tabs="tabs"
        alignment="centered"
      >
        <template #tab="{ activeValue }">
          <!-- Overview Content -->
          <div v-if="activeValue === 'overview'">
            <Overview
              :company="company"
              :company-report="companyReport"
            />
          </div>

          <!-- Reports Content -->
          <div v-else-if="activeValue === 'reports'">
            <report :company="company" />
          </div>

          <!-- Jobs Content -->
          <div
            v-else-if="activeValue === 'jobs'"
            class="jobs-section"
          >
            <jobs :company="company" />
          </div>

          <!-- Discussion Content -->
          <div
            v-else-if="activeValue === 'discussion'"
            class="discussion-section"
          >
            <div class="placeholder-content">
              <h3>Discussion Coming Soon</h3>
              <p>This feature will be available in a future update.</p>
            </div>
          </div>
        </template>
      </Tabs>
    </div>
  </div>

  <div
    v-else-if="error"
    class="error-state"
  >
    <p>{{ error }}</p>
  </div>

  <div
    v-else
    class="loading-state"
  >
    <p>Loading company details...</p>
  </div>
</template>

<style lang="scss" scoped>
.profile-header {
  background: var(--wrap-bg-color, #f5f5f5);
  padding: 7% 0 1%;
  margin-bottom: 2rem;
}

.profile-header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.profile-avatar {
  text-align: center;

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  }

  .company-name {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: var(--title-color, #2c3e50);
  }

  .company-sphere {
    font-size: 1.2rem;
    color: var(--light-text, #666);
    margin-top: 0.5rem;
  }
}

.profile-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.placeholder-content {
  text-align: center;
  padding: 3rem 1rem;
  background: var(--card-bg-color, #fff);
  border-radius: 8px;
  margin: 1rem 0;

  h3 {
    color: var(--title-color, #2c3e50);
    margin-bottom: 1rem;
  }

  p {
    color: var(--light-text, #666);
  }
}

.error-state,
.loading-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-color, #2c3e50);
}

.error-state {
  color: var(--error-color, #dc3545);
}

@media (max-width: 768px) {
  .profile-header {
    padding: 15% 0 5%;
  }

  .profile-avatar {
    .avatar {
      width: 100px;
      height: 100px;
    }

    .company-name {
      font-size: 1.5rem;
    }

    .company-sphere {
      font-size: 1rem;
    }
  }
}
</style>
