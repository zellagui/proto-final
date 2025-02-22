<route lang="yaml">
  meta:
    transition: no-transition
    footer:
      enabled: false
</route>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
// Commenting out unused imports
// import { profileProjects, profileSkills, profileEducation, profileExperiences } from '/@src/data/blocks/advanced/profile'
import { useSelectedCompanyStore } from '/@src/stores/selectedCompany';
import { useRouter } from 'vue-router';
import SalaryOverview from './salary_overview.vue';
import LocationOverview from './location_overview.vue';
import JobTrends from './job_trends.vue';
import EducationRequirements from './education_requirements.vue';
import BenefitsOverview from './benefits_overview.vue';
import JobBoards from './job_boards.vue';
import JobsList from '../jobs_list.vue'

// Import analysis files
const analysisFiles = import.meta.glob('../../../../data/beta-data/company-reports-v2 copy/*_analysis.json', { as: 'raw' })

// Debug available files
console.log('Available analysis files:', Object.keys(analysisFiles))

const selectedCompanyStore = useSelectedCompanyStore();
const router = useRouter();
const companyReport = ref<any>(null);

// Redirect if no company selected
if (!selectedCompanyStore.company) {
  router.push('/');
}

const company = computed(() => selectedCompanyStore.company);
// Commenting out undefined store properties
// const reports = computed(() => selectedCompanyStore.reports);
// const jobs = computed(() => selectedCompanyStore.jobs);

// Remove console logs
// console.log(company.value)
// console.log(reports.value)
// console.log(jobs.value)

interface ProfileSkill {
  title: string
  subtitle: string
  skills: string[]
}

interface ProfileExperienceCompany {
  name: string
  logo: string
}

interface ProfileExperience {
  role: string
  type: string
  duration: string
  summary: string
  company: ProfileExperienceCompany
}

// Commenting out unused refs
// const bio = ref("Lorem ipsum dolor sit amet...")
// const showFullDescription = ref(false)
// const showFullAbout = ref(false)

// const skills = profileSkills as ProfileSkill[]
// const experiences = profileExperiences as ProfileExperience[]

// Function to format company name for file path
const formatCompanyNameForFile = (name: string): string => {
  const normalized = name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '_')
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

  return nameMap[normalized] || normalized;
};

// Load company report
const loadCompanyReport = async () => {
  if (!company.value?.name) return;

  try {
    const formattedName = formatCompanyNameForFile(company.value.name);
    console.log('Loading report for:', formattedName);

    // Construct the file path
    const filePath = `../../../../data/beta-data/company-reports-v2 copy/${formattedName}_analysis.json`
    console.log('Looking for file:', filePath);
    console.log('Available paths:', Object.keys(analysisFiles));

    if (filePath in analysisFiles) {
      const rawData = await analysisFiles[filePath]()
      const data = JSON.parse(rawData)
      companyReport.value = data;
    } else {
      console.error('Analysis file not found for:', formattedName);
      console.error('Available files:', Object.keys(analysisFiles));
      companyReport.value = null;
    }
  } catch (error) {
    console.error('Error loading company report:', error);
    companyReport.value = null;
  }
};

// Computed properties for company stats
const jobsCount = computed(() => {
  return companyReport.value?.location_analysis?.total_jobs || 0;
});

const remoteJobsPercentage = computed(() => {
  if (!companyReport.value?.location_analysis) return 0;

  const remoteJobs = companyReport.value.location_analysis.remote_jobs?.percentage ||
    companyReport.value.location_analysis.remote_jobs || 0;

  // If it's already a percentage (between 0 and 100)
  if (remoteJobs <= 100) {
    return remoteJobs.toFixed(2);
  }

  // If we need to calculate the percentage
  const totalJobs = companyReport.value.location_analysis.total_jobs || 1;
  return ((remoteJobs / totalJobs) * 100).toFixed(2);
});

const averageSalaryRange = computed(() => {
  if (!companyReport.value?.compensation) return { min: 'N/A', max: 'N/A' };

  // Try to get from min/max salary stats first
  if (companyReport.value.compensation.min_salary_stats?.mean &&
    companyReport.value.compensation.max_salary_stats?.mean) {
    return {
      min: `$${Math.round(companyReport.value.compensation.min_salary_stats.mean).toLocaleString()}`,
      max: `$${Math.round(companyReport.value.compensation.max_salary_stats.mean).toLocaleString()}`
    };
  }

  // Fallback to salary spread if available
  if (companyReport.value.compensation.salary_spread?.mean_spread) {
    const meanSpread = companyReport.value.compensation.salary_spread.mean_spread;
    const midPoint = companyReport.value.compensation.min_salary_stats?.mean || 0;
    return {
      min: `$${Math.round(midPoint - (meanSpread / 2)).toLocaleString()}`,
      max: `$${Math.round(midPoint + (meanSpread / 2)).toLocaleString()}`
    };
  }

  // Final fallback to bands if available
  if (companyReport.value.compensation.bands) {
    const bands = companyReport.value.compensation.bands;
    const allRanges = [
      bands.entry_level?.range || [],
      bands.mid_level?.range || [],
      bands.senior_level?.range || []
    ].flat().filter(val => val !== undefined && val !== null);

    if (allRanges.length > 0) {
      return {
        min: `$${Math.round(Math.min(...allRanges)).toLocaleString()}`,
        max: `$${Math.round(Math.max(...allRanges)).toLocaleString()}`
      };
    }
  }

  return { min: 'N/A', max: 'N/A' };
});


const salaryBands = computed(() => {
  if (!companyReport.value?.compensation?.bands) return null;
  const bands = companyReport.value.compensation.bands;
  return {
    entryLevel: {
      range: bands.entry_level.range.map((val: number) => `$${Math.round(val).toLocaleString()}`),
      count: bands.entry_level.count
    },
    midLevel: {
      range: bands.mid_level.range.map((val: number) => `$${Math.round(val).toLocaleString()}`),
      count: bands.mid_level.count
    },
    seniorLevel: {
      range: bands.senior_level.range.map((val: number) => `$${Math.round(val).toLocaleString()}`),
      count: bands.senior_level.count
    }
  };
});

const jobCategories = computed(() => {
  return companyReport.value?.job_categories || []
})

const benefits = computed(() => {
  return companyReport.value?.benefits_analysis || {}
})

onMounted(() => {
  loadCompanyReport();
});
</script>

<template>
  <Section color="grey">
    <div v-if="company" class="profile-wrapper">
      <!-- Profile Bio (About Box) -->
      <Card class="bio-card">
        <div class="bio-card-head">
          <h3>About {{ company.name }}</h3>
        </div>
        <div class="bio-card-body">
          <!-- Company Description -->
          <div class="about-field company-description">
            <strong class="field-label">Description:</strong>
            <p>{{ companyReport?.company_profile?.company_description || company.about || 'No description available' }}
            </p>
          </div>

          <!-- Job Boards Overview -->
          <JobBoards v-if="companyReport" :company-report="companyReport" />

          <!-- Company Stats Grid -->
          <div class="stats-grid">
            <!-- Active Jobs -->
            <div class="stat-box">
              <i class="iconify" data-icon="ph:briefcase-duotone" />
              <div class="stat-content">
                <span class="stat-value">{{ jobsCount }}</span>
                <span class="stat-label">Active Jobs</span>
              </div>
            </div>

            <!-- Remote Work -->
            <div class="stat-box">
              <i class="iconify" data-icon="ph:house-duotone" />
              <div class="stat-content">
                <span class="stat-value">{{ remoteJobsPercentage }}{{ remoteJobsPercentage !== 'N/A' ? '%' : ''
                }}</span>
                <span class="stat-label">Remote Jobs</span>
              </div>
            </div>

            <!-- Average Salary -->
            <div class="stat-box">
              <i class="iconify" data-icon="ph:money-duotone" />
              <div class="stat-content">
                <span class="stat-value">{{ averageSalaryRange.min }} - {{ averageSalaryRange.max }}</span>
                <span class="stat-label">Avg. Salary Range</span>
              </div>
            </div>

            <!-- Main Location -->
            <div class="stat-box">
              <i class="iconify" data-icon="ph:map-pin-duotone" />
              <div class="stat-content">
                <span class="stat-value">{{ company.headquarters || 'N/A' }}</span>
                <span class="stat-label">Headquarters</span>
              </div>
            </div>

            <!-- Company Size -->
            <div class="stat-box">
              <i class="iconify" data-icon="ph:users-duotone" />
              <div class="stat-content">
                <span class="stat-value">{{ company.employeesAmountInLinkedin || 'N/A' }}</span>
                <span class="stat-label">Employees</span>
              </div>
            </div>

            <!-- Company Type -->
            <div class="stat-box">
              <i class="iconify" data-icon="ph:buildings-duotone" />
              <div class="stat-content">
                <span class="stat-value">{{ company.type || 'N/A' }}</span>
                <span class="stat-label">Company Type</span>
              </div>
            </div>
          </div>

          <!-- Job Categories -->
          <div v-if="jobCategories.length > 0" class="about-field">
            <strong class="field-label">Top Job Categories:</strong>
            <div class="categories-grid">
              <div v-for="category in jobCategories" :key="category.name" class="category-box">
                <span class="category-name">{{ category.name }}</span>
                <div class="category-stats">
                  <span class="category-value">{{ category.percentage }}%</span>
                  <span class="category-detail">{{ category.salaryRange }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Culture & Benefits -->
          <div v-if="Object.keys(benefits).length > 0" class="about-field">
            <strong class="field-label">Culture & Benefits:</strong>
            <div class="benefits-grid">
              <div v-for="(value, key) in benefits" :key="key" class="benefit-box">
                <i class="iconify" data-icon="ph:heart-duotone" />
                <span>{{ key }}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Job Posting Trends -->
      <JobTrends v-if="companyReport" :company-report="companyReport" />

      <!-- Education Requirements -->
      <EducationRequirements v-if="companyReport" :company-report="companyReport" />

      <!-- Benefits Overview -->
      <BenefitsOverview v-if="companyReport" :company-report="companyReport" />

      <!-- Salary Overview -->
      <SalaryOverview v-if="companyReport" :company-report="companyReport" />

      <!-- Location Overview -->
      <LocationOverview v-if="companyReport" :company-report="companyReport" />

      <!-- Jobs List -->
      <!-- <JobsList v-if="companyReport" :company-report="companyReport" /> -->

      <!-- Commenting out unused sections -->
      <!-- Profile Skills -->
      <!-- <Card class="skills-card">...</Card> -->

      <!-- Profile Experience -->
      <!-- <Card class="experience-card">...</Card> -->
    </div>
    <div v-else class="profile-wrapper">
      <Card class="bio-card">
        <div class="bio-card-body">
          <p>Loading company information...</p>
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

.bio-card {
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .bio-card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-family: var(--font-alt);
      font-size: 1rem;
      font-weight: 600;
      color: var(--title-color);
    }
  }

  .bio-card-body {
    >p {
      color: var(--light-text);
    }

    .about-field {
      margin-bottom: 1rem;
      font-size: 0.95rem;
      color: var(--light-text);

      .field-label {
        display: inline-block;
        font-weight: 600;
        margin-right: 0.5rem;
        color: var(--title-color);
      }

      p {
        margin: 0.5rem 0 0;
      }
    }

    .company-name {
      font-size: 1.05rem;
      color: var(--title-color);
      font-weight: 600;
      margin-bottom: 1rem;

      .field-label {
        margin-right: 0.5rem;
      }
    }

    .view-more-button {
      background: none;
      border: none;
      padding: 0;
      margin-top: 0.25rem;
      font-size: 0.9rem;
      font-family: var(--font);
      font-weight: 500;
      color: var(--primary);
      cursor: pointer;
    }

    .truncated {
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      max-height: 7.5em;
    }
  }
}

.skills-card {
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .skills-card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-family: var(--font-alt);
      font-size: 1rem;
      font-weight: 600;
      color: var(--title-color);
    }

    >a {
      font-size: 0.9rem;
      font-family: var(--font);
      font-weight: 500;
      color: var(--primary);
    }
  }

  .skills-card-body {
    .skills {
      .skill-box {
        border: 1px solid var(--wrap-border-color);
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;

        h3 {
          font-family: var(--font-alt);
          font-size: 1rem;
          font-weight: 600;
          color: var(--title-color);
          margin-bottom: 0.75rem;
        }

        p {
          font-size: 0.9rem;
          font-family: var(--font);
          color: var(--light-text);
          margin-bottom: 0.75rem;
        }

        .skill-list {
          display: flex;
          align-items: center;
          padding: 0.75rem 0 0;

          img {
            display: block;
            height: 26px;
            width: 26px;
            border-radius: 50%;
            margin: 0 0.35rem;
          }
        }
      }
    }
  }
}

.experience-card {
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }

  .experience-card-head {
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

    >a {
      font-size: 0.9rem;
      font-family: var(--font);
      font-weight: 500;
      color: var(--primary);
    }
  }

  .experience-card-body {
    .experiences {
      .experience {
        display: flex;
        align-items: flex-start;

        +.experience {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--wrap-border-color);
        }

        >img {
          display: block;
          height: 44px;
          width: 44px;
          border-radius: 50%;
        }

        .meta {
          margin-left: 1rem;

          h3 {
            font-family: var(--font-alt);
            font-size: 1.1rem;
            color: var(--title-color);
          }

          span {
            display: block;
            font-size: 0.9rem;
            font-family: var(--font);
            color: var(--light-text);
          }

          p {
            color: var(--medium-text);
            font-size: 0.95rem;
          }
        }
      }
    }
  }
}

.stats-list,
.categories-list {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    color: var(--light-text);

    &:before {
      content: "•";
      position: absolute;
      left: 0.5rem;
      color: var(--primary);
    }
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.stat-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--card-bg-color-secondary, #f5f5f5);
  border-radius: 12px;
  border: 1px solid var(--border-color, #e0e0e0);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .iconify {
    font-size: 2rem;
    color: var(--primary);
  }

  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-value {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--title-color);
  }

  .stat-label {
    font-size: 0.85rem;
    color: var(--light-text);
  }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 0.75rem;
}

.category-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: var(--card-bg-color-secondary, #f5f5f5);
  border-radius: 8px;
  border: 1px solid var(--border-color, #e0e0e0);

  .category-name {
    font-size: 0.9rem;
    color: var(--light-text);
  }

  .category-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .category-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary);
  }

  .category-detail {
    font-size: 0.8rem;
    color: var(--light-text);
  }
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 0.75rem;
}

.benefit-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--card-bg-color-secondary, #f5f5f5);
  border-radius: 8px;
  border: 1px solid var(--border-color, #e0e0e0);

  .iconify {
    font-size: 1.5rem;
    color: var(--primary);
  }

  span {
    font-size: 0.9rem;
    color: var(--light-text);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .categories-grid,
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
