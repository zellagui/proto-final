// src/stores/selectedCompany.ts

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Company } from '/@src/types/company'

export const useSelectedCompanyStore = defineStore('selectedCompany', () => {
  const company = ref<Company | null>(null)

  function setCompany(newCompany: Company) {
    company.value = newCompany
  }

  function clearCompany() {
    company.value = null
  }

  return {
    company,
    setCompany,
    clearCompany,
  }
})
