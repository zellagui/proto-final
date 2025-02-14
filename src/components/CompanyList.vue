<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Company } from '/@src/types/company'
// The employee table data is still imported if needed elsewhere.
// import { table } from '/@src/data/blocks/table'

interface Props {
  limit?: number
}

interface CompanyAnalysis {
  company_name: string;
  location_analysis: {
    total_jobs: number;
  };
}

const props = withDefaults(defineProps<Props>(), {
  limit: 12 // Increased from 6 to 12 to show more companies
})

// Job boards data
const jobBoards = {
  linkedin: {
    name: 'LinkedIn',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png',
    url: 'https://linkedin.com'
  },
  indeed: {
    name: 'Indeed',
    logo: 'https://user-images.githubusercontent.com/23087690/67604687-19cf8780-f731-11e9-9217-9e8fccac3b69.jpg',
    url: 'https://indeed.com'
  },
  glassdoor: {
    name: 'Glassdoor',
    logo: 'https://static-00.iconduck.com/assets.00/glassdoor-icon-1024x1024-qn0ai0xz.png',
    url: 'https://glassdoor.com'
  },
  ziprecruiter: {
    name: 'ZipRecruiter',
    logo: 'https://www.ziprecruiter.com/favicon-144x144.png',
    url: 'https://ziprecruiter.com'
  },
  monster: {
    name: 'Monster',
    logo: 'https://play-lh.googleusercontent.com/YqM8H7Vip-UqQmsKXeJKxlvw8UcEc9v7oMEoPOe-8VDh1wKUudK6rdQ5TEaGjv8BkWA=w240-h480-rw',
    url: 'https://monster.com'
  }
}

// Function to get active job boards for a company (currently returning all as active)
function getActiveJobBoards(_companyName: string) {  // Added underscore to fix unused parameter warning
  return Object.values(jobBoards).map(board => ({
    picture: board.logo,
    name: board.name,
    url: board.url
  }))
}

const companies = ref<Company[]>([])
const companyAnalysis = ref<Record<string, CompanyAnalysis>>({})
const isLoading = ref(true)
const error = ref<string | null>(null)

// Function to format company name for file path
function formatCompanyNameForFile(name: string): string {
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
}

async function loadCompanyAnalysis(companyName: string) {
  try {
    const formattedName = formatCompanyNameForFile(companyName);
    console.log('Loading analysis for the company:', formattedName);

    const response = await fetch(`/src/data/prototype-data-v1 copy 2/company-reports-v2 copy/${formattedName}_analysis.json`);
    if (response.ok) {
      const data = await response.json();
      if (data?.location_analysis?.total_jobs) {
        companyAnalysis.value[companyName] = {
          company_name: companyName,
          location_analysis: {
            total_jobs: parseInt(data.location_analysis.total_jobs)
          }
        };
      }
    } else {
      console.error('Failed to load analysis for:', formattedName);
    }
  } catch (err) {
    console.error('Error loading company analysis:', err);
  }
}

onMounted(async () => {
  try {
    const response = await fetch('src/data/10-companies.jsonl')
    if (!response.ok) {
      throw new Error('Failed to fetch companies data')
    }

    const text = await response.text()
    const lines = text.trim().split('\n')
    console.log('Number of companies in file:', lines.length)

    const parsedCompanies = lines
      .map(line => {
        try {
          return JSON.parse(line)
        } catch (e) {
          console.error('Error parsing company line:', line, e)
          return null
        }
      })
      .filter(company => company !== null)

    console.log('Number of successfully parsed companies:', parsedCompanies.length)
    companies.value = parsedCompanies

    // Load analysis data for each company
    await Promise.all(companies.value.map(async company => {
      try {
        await loadCompanyAnalysis(company.name)
      } catch (err) {
        console.error(`Error loading analysis for ${company.name}:`, err)
      }
    }))

    isLoading.value = false
  } catch (err) {
    console.error('Error loading companies:', err)
    error.value = 'Failed to load companies'
    isLoading.value = false
  }
})
</script>

<template>
  <div class="py-6">
    <div v-if="isLoading" class="has-text-centered py-4">
      Loading companies...
    </div>
    <div v-else-if="error" class="has-text-centered py-4 has-text-danger">
      {{ error }}
    </div>
    <div v-else>
      <!-- Company List Table -->
      <SimpleTable :bordered="false">
        <SimpleTableRow>
          <SimpleTableHeader>Company</SimpleTableHeader>
          <SimpleTableHeader>Open Positions</SimpleTableHeader>
          <SimpleTableHeader>Hiring Status</SimpleTableHeader>
          <SimpleTableHeader>Employees</SimpleTableHeader>
          <SimpleTableHeader>Job Boards*</SimpleTableHeader>
          <SimpleTableHeader>Action</SimpleTableHeader>
        </SimpleTableRow>

        <SimpleTableRow v-for="company in companies.slice(0, props.limit)" :key="company.company_id">
          <!-- Company Column (Logo, Name, Sphere) -->
          <SimpleTableCell>
            <SimpleTableCellFlex>
              <template #media>
                <img :src="company.logo" :alt="company.name" class="company-logo-small">
              </template>
              <template #content>
                <Title tag="h3" :size="7" weight="semi" narrow>
                  {{ company.name }}
                </Title>
                <p class="paragraph rem-75">
                  {{ company.sphere || 'N/A' }}
                </p>
              </template>
            </SimpleTableCellFlex>
          </SimpleTableCell>

          <!-- Open Positions Column (from analysis data) -->
          <SimpleTableCell>
            <p class="number-display">
              {{ companyAnalysis[company.name]?.location_analysis?.total_jobs || 0 }}
            </p>
          </SimpleTableCell>

          <!-- Hiring Status Column -->
          <SimpleTableCell>
            <span class="tag"
              :class="companyAnalysis[company.name]?.location_analysis?.total_jobs > 0 ? 'is-success' : 'is-danger'">
              {{ companyAnalysis[company.name]?.location_analysis?.total_jobs > 0 ? 'Hiring' : 'Not Hiring' }}
            </span>
          </SimpleTableCell>

          <!-- Employees Column -->
          <SimpleTableCell>
            <p class="number-display">
              {{ company.employeesAmountInLinkedin || '0' }}
            </p>
          </SimpleTableCell>

          <!-- Job Boards Column -->
          <SimpleTableCell class="job-boards-cell">
            <AvatarGroup size="small" :avatars="getActiveJobBoards(company.name)" :limit="5" compact />
          </SimpleTableCell>

          <!-- Action Column -->
          <SimpleTableCell>
            <RouterLink :to="`/company/profile/${formatCompanyNameForFile(company.name)}`"
              class="link has-underline is-reversed rem-90">
              View Profile
            </RouterLink>
          </SimpleTableCell>
        </SimpleTableRow>
      </SimpleTable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Company logo styling */
.company-logo-small {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 50%;
}

/* Number display styling */
.number-display {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0;
  text-align: center;
}

/* Responsive table styles */
:deep(.table) {
  width: 100%;
  min-width: 800px; // Minimum width before horizontal scroll

  @media screen and (max-width: 1023px) {
    .job-boards-cell {
      min-width: 150px; // Ensure job board icons have enough space
    }

    td,
    th {
      padding: 0.75rem 0.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;

    .number-display {
      font-size: 1rem;
    }

    td,
    th {
      padding: 0.5rem 0.25rem;
    }
  }
}

/* Ensure table container is responsive */
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

/* Tag styling improvements */
.tag {
  padding: 0.5rem 1rem;
  font-weight: 500;

  &.is-success {
    background-color: var(--success);
    color: white;
  }

  &.is-danger {
    background-color: var(--danger);
    color: white;
  }
}
</style>
