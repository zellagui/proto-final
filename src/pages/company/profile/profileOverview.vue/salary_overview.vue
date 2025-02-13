<template>
  <Card class="salary-card">
    <div class="salary-card-head">
      <div class="title-wrap">
        <h3>Salary Overview</h3>
        <p class="subtitle">
          Salary ranges across different experience levels
        </p>
      </div>
    </div>

    <div class="salary-card-body">
      <!-- Salary Bands -->
      <div
        v-if="salaryBands"
        class="salary-bands"
      >
        <div class="bands-grid">
          <div class="band-item entry-level">
            <div class="band-header">
              <i
                class="iconify"
                data-icon="ph:student-duotone"
              />
              <div class="band-title">
                <h5>Entry Level</h5>
                <span class="positions">{{ salaryBands.entryLevel.count }} positions</span>
              </div>
            </div>
            <div class="band-details">
              <div class="salary-range">
                <span class="range-label">Salary Range</span>
                <span class="range-value">${{ salaryBands.entryLevel.range[0] }} - ${{ salaryBands.entryLevel.range[1] }}</span>
              </div>
            </div>
          </div>

          <div class="band-item mid-level">
            <div class="band-header">
              <i
                class="iconify"
                data-icon="ph:user-focus-duotone"
              />
              <div class="band-title">
                <h5>Mid Level</h5>
                <span class="positions">{{ salaryBands.midLevel.count }} positions</span>
              </div>
            </div>
            <div class="band-details">
              <div class="salary-range">
                <span class="range-label">Salary Range</span>
                <span class="range-value">${{ salaryBands.midLevel.range[0] }} - ${{ salaryBands.midLevel.range[1] }}</span>
              </div>
            </div>
          </div>

          <div class="band-item senior-level">
            <div class="band-header">
              <i
                class="iconify"
                data-icon="ph:star-duotone"
              />
              <div class="band-title">
                <h5>Senior Level</h5>
                <span class="positions">{{ salaryBands.seniorLevel.count }} positions</span>
              </div>
            </div>
            <div class="band-details">
              <div class="salary-range">
                <span class="range-label">Salary Range</span>
                <span class="range-value">${{ salaryBands.seniorLevel.range[0] }} - ${{ salaryBands.seniorLevel.range[1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Salary Distribution Chart -->
      <div
        v-if="salaryLevelsChartData.length"
        class="salary-chart-section"
      >
        <h4 class="section-title">
          Salary Distribution
        </h4>
        <p class="section-subtitle">
          Box plot showing salary ranges and quartiles for each level
        </p>
        <div class="salary-chart">
          <ApexChart
            type="boxPlot"
            height="350"
            :options="chartOptions"
            :series="chartSeries"
          />
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

// Salary levels chart data
const salaryLevelsChartData = computed(() => {
  if (!props.companyReport?.compensation) return [];

  const comp = props.companyReport.compensation;
  const minStats = comp.min_salary_stats;
  const maxStats = comp.max_salary_stats;

  return [
    {
      name: 'Salary Distribution',
      data: [
        {
          x: 'Entry Level',
          y: [
            minStats.quartiles[0],
            minStats.quartiles[1],
            minStats.quartiles[2],
            maxStats.quartiles[0],
            maxStats.quartiles[1]
          ]
        },
        {
          x: 'Mid Level',
          y: [
            minStats.quartiles[0] * 1.5,
            minStats.quartiles[1] * 1.5,
            minStats.quartiles[2] * 1.5,
            maxStats.quartiles[0] * 1.5,
            maxStats.quartiles[1] * 1.5
          ]
        },
        {
          x: 'Senior Level',
          y: [
            minStats.quartiles[0] * 2,
            minStats.quartiles[1] * 2,
            minStats.quartiles[2] * 2,
            maxStats.quartiles[0] * 2,
            maxStats.quartiles[1] * 2
          ]
        }
      ]
    }
  ];
});

// Chart options
const chartOptions = computed(() => ({
  chart: {
    type: 'boxPlot',
    height: 350,
    background: 'transparent',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    boxPlot: {
      colors: {
        upper: '#a78bfa', // Light purple
        lower: '#93c5fd' // Light blue
      }
    }
  },
  xaxis: {
    type: 'category',
    labels: {
      style: {
        fontSize: '0.95rem',
        fontFamily: 'var(--font)',
        colors: 'var(--light-text)'
      }
    }
  },
  yaxis: {
    title: {
      text: 'Salary Range ($)',
      style: {
        fontSize: '0.95rem',
        fontFamily: 'var(--font)',
        color: 'var(--light-text)'
      }
    },
    labels: {
      formatter: (value) => {
        return value >= 1000
          ? `$${Math.round(value/1000)}k`
          : `$${Math.round(value)}`;
      },
      style: {
        fontSize: '0.9rem',
        fontFamily: 'var(--font)',
        colors: 'var(--light-text)'
      }
    }
  },
  tooltip: {
    theme: 'light',
    style: {
      fontSize: '0.9rem',
      fontFamily: 'var(--font)'
    },
    y: {
      formatter: (value) => `$${Math.round(value).toLocaleString()}`
    }
  }
}));

const chartSeries = computed(() => salaryLevelsChartData.value);

const salaryBands = computed(() => {
  if (!props.companyReport?.compensation?.bands) return null;
  const bands = props.companyReport.compensation.bands;
  return {
    entryLevel: {
      range: bands.entry_level.range.map((val) => Math.round(val).toLocaleString()),
      count: bands.entry_level.count
    },
    midLevel: {
      range: bands.mid_level.range.map((val) => Math.round(val).toLocaleString()),
      count: bands.mid_level.count
    },
    seniorLevel: {
      range: bands.senior_level.range.map((val) => Math.round(val).toLocaleString()),
      count: bands.senior_level.count
    }
  };
});
</script>

<style lang="scss" scoped>
.salary-card {
  margin-bottom: 1.5rem;
}

.salary-card-head {
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

.salary-card-body {
  padding: 1.5rem;
}

.bands-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.band-item {
  padding: 1.25rem;
  background: var(--card-bg-color-secondary, #f5f5f5);
  border-radius: 12px;
  border: 1px solid var(--border-color, #eee);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  .band-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;

    .iconify {
      font-size: 1.5rem;
      color: var(--primary);
    }

    .band-title {
      h5 {
        margin: 0;
        font-size: 1rem;
        color: var(--title-color);
      }

      .positions {
        font-size: 0.85rem;
        color: var(--light-text);
        margin-top: 0.25rem;
        display: block;
      }
    }
  }

  .band-details {
    .salary-range {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .range-label {
        font-size: 0.85rem;
        color: var(--light-text);
      }

      .range-value {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--primary);
      }
    }
  }
}

.section-title {
  font-size: 1.1rem;
  color: var(--title-color);
  margin: 0 0 1rem;
}

.section-subtitle {
  font-size: 0.9rem;
  color: var(--light-text);
  margin: -0.5rem 0 1rem;
}

.salary-chart-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color, #eee);
}

.salary-chart {
  padding: 1.5rem;
  background: var(--card-bg-color-secondary, #f5f5f5);
  border-radius: 12px;
  border: 1px solid var(--border-color, #eee);
}

@media (max-width: 768px) {
  .bands-grid {
    grid-template-columns: 1fr;
  }
}
</style>
