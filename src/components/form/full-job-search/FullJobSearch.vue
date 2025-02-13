<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside, useDebounceFn, useDark } from '@vueuse/core'
import { useSelectedCompanyStore } from '/@src/stores/selectedCompany'
import all_companies from '/@src/data/all_companies.json' // <-- Your new JSON data
import { industryColorMap } from './industryColors' // Adjust if necessary
import { useUserSession } from '/@src/stores/userSession'

const usersession = useUserSession()
console.log('session display', usersession)

/**
 * If you already declared these in your store, you can import them from there.
 * Otherwise, here's an example interface for your updated new_companies.json
 */
interface CompanyUpdate {
  text: string
  likes: string
  comments: string
  timestamp: string
  media: string[] | string
}

interface Employee {
  name: string | null
  role: string | null
  profile_url: string | null
}

interface Company {
  company_id: string
  url: string
  name: string
  sphere?: string
  followers?: string
  logo?: string
  image?: string
  employeesAmountInLinkedin?: string
  about?: string
  website?: string | null
  locations?: string[]
  employees?: Employee[]
  updates?: CompanyUpdate[]
  slogan?: string | null
  headquarters?: string
  type?: string
  specialties?: string | null
}

// Use your new JSON data
const companyData: Company[] = all_companies as Company[]

const isDark = useDark()

const searchTerm = ref('')
const showSuggestions = ref(false)
const container = ref<null | HTMLElement>(null)

const selectedCompanyStore = useSelectedCompanyStore()
const router = useRouter()

/**
 * Adapt the old parseSize logic to parse the string-based "followers" field.
 * If you prefer to parse employeesAmountInLinkedin, just adapt accordingly.
 */
function parseFollowers(str?: string): number {
  if (!str) return 0
  // Example: just parse out digits. Or you can adapt the old K/M logic if needed.
  return parseInt(str.replace(/\D/g, '')) || 0
}

/**
 * Reuse the old industry color logic but call it getIndustryColorForSphere now
 * because your new data uses "sphere" instead of "industry."
 */
function getIndustryColorForSphere(sphere?: string): string {
  if (!sphere) {
    console.warn('sphere is undefined. Using default color.')
    return '#007BFF'
  }
  const lowerSphere = sphere.toLowerCase()
  for (const [key, color] of Object.entries(industryColorMap)) {
    if (lowerSphere.includes(key.toLowerCase())) {
      return color
    }
  }
  console.warn(`No match found for sphere "${sphere}". Using fallback color.`)
  return '#7F8C8D'
}

const filteredCompanies = computed(() => {
  if (!searchTerm.value.trim()) return []
  const lowerTerm = searchTerm.value.toLowerCase()
  const results = companyData.filter((co: Company) => {
    // Safely handle potential null fields:
    const coName = co.name?.toLowerCase() ?? ''
    const coWebsite = co.website?.toLowerCase() ?? ''
    return coName.includes(lowerTerm) || coWebsite.includes(lowerTerm)
  })

  // Sort by # of followers (descending), similar to the old "size" logic
  results.sort(
    (a: Company, b: Company) =>
      parseFollowers(b.followers) - parseFollowers(a.followers)
  )
  return results.slice(0, 10)
})

// ---- New API Logic Start ----
const isLoading = ref(false)
const error = ref<string | null>(null)

/**
 * Given a LinkedIn-style URL, fetch company details from your API.
 */
async function fetchCompanyDetails(url: string) {
  if (!url) {
    error.value = 'Invalid URL. Please provide a valid LinkedIn URL.'
    return null
  }

  try {
    const idToken = usersession.token
    if (!idToken) {
      throw new Error('User is not authenticated. Please log in.')
    }

    isLoading.value = true
    error.value = null

    console.log(`Fetching company details for URL: ${url}`)

    const response = await fetch(
      'https://03a0071hz3.execute-api.us-east-1.amazonaws.com/ghost-api/v1/company',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ company_profile_url: url }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to fetch company details: ${errorText}`)
    }

    const data = await response.json()
    console.log('Fetched company details:', data)
    return data
  } catch (err: any) {
    console.error('Error fetching company details:', err)
    if (err.message.includes('Unauthorized')) {
      error.value = 'You are not authorized to access this resource. Please log in again.'
      await usersession.logoutUser()
      router.push('/login')
    } else {
      error.value = err.message || 'Failed to fetch company details. Please try again later.'
    }
    return null
  } finally {
    isLoading.value = false
  }
}
// ---- New API Logic End ----

/**
 * Called when user selects one of the companies from the suggestion list.
 */
async function selectCompany(company: Company) {
  // Use the company's "url" field rather than "handle"
  let cleanURL = company.url || ''
  if (cleanURL.includes('?')) {
    cleanURL = cleanURL.split('?')[0]
  }
  console.log('company!!:', company)

  // If it's already an absolute URL, use it; otherwise prefix with LinkedIn:
  const finalURL = cleanURL.startsWith('http')
    ? cleanURL
    : `https://www.linkedin.com/company/${cleanURL}/`

  const fetchedData = await fetchCompanyDetails(finalURL)
  if (fetchedData && fetchedData.company) {
    selectedCompanyStore.setCompanyData({
      company: fetchedData.company,
      reports: fetchedData.reports || [],
      jobs: fetchedData.jobs || [],
    })

    router.push({
      path: `/company/profile/${encodeURIComponent(fetchedData.company.name)}`,
    })
  } else {
    console.log('Could not fetch details for this company.')
  }
}

/**
 * Handles the form submission when the user searches for a company.
 */
async function handleSubmit() {
  const inputVal = searchTerm.value.trim()
  if (inputVal) {
    let url = inputVal
    if (!url.startsWith('http')) {
      url = `https://www.linkedin.com/company/${url}`
    }
    await fetchCompanyDetails(url)

    if (selectedCompanyStore.company) {
      console.log('User entered a company URL:', selectedCompanyStore.company.name)
      router.push({
        path: `/company/profile/${encodeURIComponent(
          selectedCompanyStore.company.name
        )}`,
      })
    } else {
      console.log('No valid company details found from the entered URL.')
    }
  } else {
    console.log('No input provided to search.')
  }
}

// Debounce for showing suggestions
const debouncedShowSuggestions = useDebounceFn(() => {
  showSuggestions.value = !!searchTerm.value.trim()
}, 300)

// Close suggestions when clicking outside
onClickOutside(container, () => {
  showSuggestions.value = false
})
</script>
<template>
  <div
    ref="container"
    class="search-bar-container"
    :class="{ 'is-dark': isDark }"
  >
    <form
      class="search-form"
      @submit.prevent="handleSubmit"
    >
      <div class="input-wrapper">
        <span class="search-icon">
          <iconify-icon icon="feather:search" />
        </span>
        <VInput
          v-model="searchTerm"
          placeholder="Enter company name or LinkedIn URL..."
          class="search-input"
          @focus="showSuggestions = true"
          @input="debouncedShowSuggestions"
        />
        <Button
          color="primary"
          icon-right="feather:arrow-right"
          :long="1"
          class="search-button"
          type="submit"
        >
          Search
        </Button>
      </div>

      <!-- Suggestions List -->
      <ul
        v-if="showSuggestions && filteredCompanies.length"
        class="suggestions-list"
      >
        <li
          v-for="(company, index) in filteredCompanies"
          :key="company.company_id || index"
          class="suggestion-item"
        >
          <button
            class="suggestion-button"
            type="button"
            @click.prevent="selectCompany(company)"
          >
            <!-- Use the company’s logo if present -->
            <img
              v-if="company.logo"
              :src="company.logo"
              alt="Company Logo"
              class="company-logo"
            >
            <!-- If you want to fallback to a letter if there's no logo, you can do this:
                 else
                 <div class="fallback-logo">
                   {{ company.name.charAt(0).toUpperCase() }}
                 </div>
            -->

            <div class="company-info">
              <div class="company-name">
                {{ company.name }}
              </div>
              <div class="company-industry">
                {{ company.sphere || 'Unknown Industry' }}
              </div>
            </div>
          </button>
        </li>
      </ul>
    </form>

    <!-- Loading and Error States -->
    <div
      v-if="isLoading"
      class="loading-state"
    >
      <p>Loading company details...</p>
    </div>
    <div
      v-if="error"
      class="error-state"
    >
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-bar-container {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
  background: var(--background-color, #fff);
  color: var(--text-color, #333);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s, color 0.3s;

  &.is-dark {
    --background-color: #1e1e1e;
    --text-color: #eee;
    --border-color: #444;
    --input-bg: #2c2c2c;
    --input-border-color: #555;
    --suggestion-bg: #2c2c2c;
    --suggestion-hover-bg: #3a3a3a;
    --company-name-color: #fff;
    --company-industry-color: #ccc;
    --button-bg: #1e90ff;
    --button-bg-secondary: #5a5a5a;
  }
}

.search-form {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--input-bg, #fff);
  border: 1px solid var(--input-border-color, #ccc);
  border-radius: 8px 8px 0 0;

  .search-input {
    flex: 1;
    border: none;
    padding-left: 40px;
    height: 48px;
    font-size: 16px;
    color: var(--text-color, #333);
    background: transparent;
    outline: none;

    &::placeholder {
      color: #888;
    }
  }

  .search-icon {
    position: absolute;
    left: 12px;
    pointer-events: none;
    color: #888;
    display: flex;
    align-items: center;
    height: 100%;

    .iconify-icon {
      font-size: 20px;
    }
  }

  .search-button {
    height: 48px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    font-size: 14px;
    transition: background 0.3s, color 0.3s;
    background: var(--button-bg, #007BFF);
    color: #fff;
    border-radius: 0 8px 0 0;
  }
}

.suggestions-list {
  border: 1px solid var(--border-color, #ccc);
  border-radius: 0 0 8px 8px;
  background: var(--suggestion-bg, #fff);
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin: 0;
  list-style: none;
  margin-top: -1px;
  transition: background 0.3s, border-color 0.3s;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid var(--border-color, #f0f0f0);
  text-align: left;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: var(--suggestion-hover-bg, #f9f9f9);
  }

  .suggestion-button {
    display: flex;
    align-items: center;
    width: 100%;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    cursor: pointer;

    &:focus {
      outline: 2px solid #007BFF;
      outline-offset: 2px;
    }

    /* Logo styling */
    .company-logo {
      width: 32px;
      height: 32px;
      object-fit: cover;
      border-radius: 4px;
      margin-right: 10px;
    }
  }

  /* If you have a fallback for no-logo, you can style that below:
  .fallback-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #007bff;
    color: #fff;
    margin-right: 10px;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  */

  .company-info {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    text-align: left;

    .company-name {
      font-size: 14px;
      font-weight: 600;
      color: var(--company-name-color, #333);
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1.2;
      margin-bottom: 2px;
    }

    .company-industry {
      font-size: 12px;
      color: var(--company-industry-color, #555);
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1.2;
    }
  }
}

.loading-state,
.error-state {
  text-align: center;
  padding: 20px;
}

.error-state {
  color: red;
}
</style>
