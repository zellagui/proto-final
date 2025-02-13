<template>
  <Card class="education-card">
    <div class="education-card-head">
      <div class="title-wrap">
        <h3>Education Requirements</h3>
        <p class="subtitle">
          Distribution of required education levels across positions
        </p>
      </div>
    </div>

    <div class="education-card-body">
      <!-- Education Stats Grid -->
      <div class="education-stats">
        <div
          v-for="(count, level) in educationData"
          :key="level"
          class="stat-item"
        >
          <div class="stat-icon">
            <i
              class="iconify"
              :data-icon="getEducationIcon(level)"
            />
          </div>
          <div class="stat-content">
            <span class="stat-value">{{ count }} positions</span>
            <span class="stat-label">{{ formatEducationLevel(level) }}</span>
            <span class="stat-percentage">{{ calculatePercentage(count) }}%</span>
          </div>
        </div>
      </div>

      <!-- Education Donut Chart -->
      <div class="chart-container">
        <ApexChart
          type="donut"
          height="300"
          :options="chartOptions"
          :series="chartSeries"
        />
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

// Compute education data
const educationData = computed(() => {
  if (!props.companyReport?.skills_and_requirements?.career_requirements?.education) return {};

  const education = props.companyReport.skills_and_requirements.career_requirements.education;
  return {
    bachelors: education.bachelors?.count || 0,
    masters: education.masters?.count || 0,
    phd: education.phd?.count || 0
  };
});

// Calculate total positions
const totalPositions = computed(() => {
  return Object.values(educationData.value).reduce((sum, count) => sum + count, 0);
});

// Calculate percentage for a given count
const calculatePercentage = (count) => {
  if (!totalPositions.value) return 0;
  return ((count / totalPositions.value) * 100).toFixed(1);
};

// Format education level for display
const formatEducationLevel = (level) => {
  const formats = {
    bachelors: "Bachelor's Degree",
    masters: "Master's Degree",
    phd: 'PhD'
  };
  return formats[level] || level;
};

// Get icon for education level
const getEducationIcon = (level) => {
  const icons = {
    bachelors: 'ph:graduation-cap-duotone',
    masters: 'ph:certificate-duotone',
    phd: 'ph:books-duotone'
  };
  return icons[level] || 'ph:graduation-cap-duotone';
};

// Chart series
const chartSeries = computed(() => Object.values(educationData.value));

// Chart options
const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    background: 'transparent'
  },
  labels: Object.keys(educationData.value).map(formatEducationLevel),
  colors: ['#818cf8', '#6366f1', '#4f46e5'], // Indigo shades
  stroke: {
    show: false
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '14px',
    fontFamily: 'var(--font)',
    labels: {
      colors: 'var(--light-text)'
    },
    markers: {
      width: 12,
      height: 12,
      radius: 6
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            fontFamily: 'var(--font)',
            color: 'var(--light-text)'
          },
          value: {
            show: true,
            fontSize: '16px',
            fontFamily: 'var(--font)',
            color: 'var(--title-color)',
            formatter: (val) => `${val} positions`
          },
          total: {
            show: true,
            label: 'Total',
            fontSize: '14px',
            fontFamily: 'var(--font)',
            color: 'var(--light-text)',
            formatter: () => `${totalPositions.value} positions`
          }
        }
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    theme: 'light',
    y: {
      formatter: (val) => `${val} positions (${((val/totalPositions.value)*100).toFixed(1)}%)`
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      legend: {
        position: 'bottom'
      }
    }
  }]
}));
</script>

<style lang="scss" scoped>
.education-card {
  margin-bottom: 1.5rem;
}

.education-card-head {
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

.education-card-body {
  padding: 1.5rem;
}

.education-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  .stat-item {
    padding: 1.25rem;
    background: var(--card-bg-color-secondary, #f5f5f5);
    border-radius: 12px;
    border: 1px solid var(--border-color, #eee);
    display: flex;
    align-items: center;
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
      display: flex;
      flex-direction: column;

      .stat-value {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--title-color);
      }

      .stat-label {
        font-size: 0.85rem;
        color: var(--light-text);
      }

      .stat-percentage {
        font-size: 0.85rem;
        color: var(--primary);
        font-weight: 500;
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
  .education-stats {
    grid-template-columns: 1fr;
  }
}
</style>
