<template>
  <Card class="benefits-card">
    <div class="benefits-card-head">
      <div class="title-wrap">
        <h3>Benefits Overview</h3>
        <p class="subtitle">
          Percentage of positions offering each benefit
        </p>
      </div>
    </div>

    <div class="benefits-card-body">
      <!-- Benefits Stats Grid -->
      <div class="benefits-stats">
        <div
          v-for="(data, benefit) in benefitsData"
          :key="benefit"
          class="stat-item"
        >
          <div class="stat-icon">
            <i
              class="iconify"
              :data-icon="getBenefitIcon(benefit)"
            />
          </div>
          <div class="stat-content">
            <div class="stat-header">
              <span class="stat-label">{{ formatBenefitName(benefit) }}</span>
              <span class="stat-percentage">{{ Math.round(data.percentage) }}%</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress"
                :style="{ width: `${data.percentage}%` }"
              />
            </div>
            <span class="stat-count">{{ data.count }} positions</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { computed } from 'vue';
import ApexChart from 'vue3-apexcharts';

const props = defineProps({
  companyReport: {
    type: Object,
    required: true
  }
});

// Compute benefits data
const benefitsData = computed(() => {
  if (!props.companyReport?.culture_and_benefits?.benefits_offered) return {};

  const benefits = props.companyReport.culture_and_benefits.benefits_offered;
  return {
    healthcare: benefits.healthcare || { count: 0, percentage: 0 },
    retirement: benefits.retirement || { count: 0, percentage: 0 },
    vacation: benefits.vacation || { count: 0, percentage: 0 },
    disability: benefits.disability || { count: 0, percentage: 0 },
    life_insurance: benefits.life_insurance || { count: 0, percentage: 0 }
  };
});

// Format benefit name for display
const formatBenefitName = (benefit) => {
  const formats = {
    healthcare: 'Healthcare',
    retirement: 'Retirement',
    vacation: 'Vacation',
    disability: 'Disability',
    life_insurance: 'Life Insurance'
  };
  return formats[benefit] || benefit;
};

// Get icon for benefit
const getBenefitIcon = (benefit) => {
  const icons = {
    healthcare: 'ph:heart-duotone',
    retirement: 'ph:piggy-bank-duotone',
    vacation: 'ph:palm-tree-duotone',
    disability: 'ph:wheelchair-duotone',
    life_insurance: 'ph:shield-plus-duotone'
  };
  return icons[benefit] || 'ph:heart-duotone';
};

// Chart series
const chartSeries = computed(() => [{
  name: 'Positions Offering',
  data: Object.values(benefitsData.value).map(b => b.percentage)
}]);

// Chart options
const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    },
    background: 'transparent'
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 6,
      dataLabels: {
        position: 'end',
        formatter: (val) => `${Math.round(val)}%`
      }
    }
  },
  colors: ['#818cf8'], // Indigo color
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontFamily: 'var(--font)',
      fontWeight: 500,
      colors: ['var(--title-color)']
    }
  },
  xaxis: {
    categories: Object.keys(benefitsData.value).map(formatBenefitName),
    labels: {
      style: {
        fontSize: '0.9rem',
        fontFamily: 'var(--font)',
        colors: 'var(--light-text)'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    max: 100,
    labels: {
      style: {
        fontSize: '0.9rem',
        fontFamily: 'var(--font)',
        colors: 'var(--light-text)'
      }
    }
  },
  grid: {
    borderColor: 'var(--border-color, #eee)',
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: true
      }
    }
  },
  tooltip: {
    theme: 'light',
    y: {
      formatter: (val) => `${Math.round(val)}% of positions`
    }
  }
}));
</script>

<style lang="scss" scoped>
.benefits-card {
  margin-bottom: 1.5rem;
}

.benefits-card-head {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color, #eee);

  .title-wrap {
    h3 {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 600;
      color: var(--title-color);
    }

    .subtitle {
      margin-top: 0.5rem;
      font-size: 0.95rem;
      color: var(--light-text);
    }
  }
}

.benefits-card-body {
  padding: 1.5rem;
}

.benefits-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  .stat-item {
    padding: 1.25rem;
    background: var(--card-bg-color-secondary, #f5f5f5);
    border-radius: 12px;
    border: 1px solid var(--border-color, #eee);
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .stat-icon {
      .iconify {
        font-size: 1.75rem;
        color: var(--primary);
      }
    }

    .stat-content {
      flex: 1;

      .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      .stat-label {
        font-size: 1rem;
        color: var(--title-color);
        font-weight: 500;
      }

      .stat-percentage {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--primary);
      }

      .progress-bar {
        height: 8px;
        background: var(--border-color, #eee);
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 0.5rem;

        .progress {
          height: 100%;
          background: var(--primary);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
      }

      .stat-count {
        font-size: 0.85rem;
        color: var(--light-text);
      }
    }
  }
}

.chart-container {
  background: var(--card-bg-color-secondary, #f5f5f5);
  border-radius: 12px;
  border: 1px solid var(--border-color, #eee);
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .benefits-stats {
    grid-template-columns: 1fr;
  }
}
</style>
