<template>
  <Card class="location-card">
    <div class="location-card-head">
      <div class="title-wrap">
        <h3>Location Overview</h3>
        <p class="subtitle">
          Geographic distribution of positions
        </p>
      </div>
    </div>

    <div class="location-card-body">
      <!-- Top Locations List -->
      <div
        v-if="topLocations.length"
        class="top-locations"
      >
        <div class="locations-grid">
          <div
            v-for="(location, index) in topLocations.slice(0, 3)"
            :key="index"
            class="location-item"
          >
            <div class="location-info">
              <div class="location-icon">
                <i
                  class="iconify"
                  data-icon="ph:map-pin-duotone"
                />
                <span class="rank-badge">{{ index + 1 }}</span>
              </div>
              <div class="location-details">
                <h5>{{ location[0] }}</h5>
                <span class="position-count">{{ location[1] }} positions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- State Distribution Treemap -->
      <div
        v-if="stateDistributionData.length"
        class="state-distribution"
      >
        <div class="chart-container">
          <ApexChart
            type="treemap"
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

// Transform state distribution data for treemap
const stateDistributionData = computed(() => {
  if (!props.companyReport?.location_analysis?.state_distribution) return [];

  return Object.entries(props.companyReport.location_analysis.state_distribution)
    .map(([state, count]) => ({
      x: state,
      y: count
    }))
    .sort((a, b) => b.y - a.y);
});

// Get top locations
const topLocations = computed(() => {
  return props.companyReport?.location_analysis?.top_locations || [];
});

// Chart series
const chartSeries = computed(() => [{
  data: stateDistributionData.value
}]);

// Chart options
const chartOptions = computed(() => ({
  chart: {
    type: 'treemap',
    height: 350,
    toolbar: {
      show: false
    },
    background: 'transparent',
    animations: {
      enabled: true,
      speed: 400
    }
  },
  plotOptions: {
    treemap: {
      distributed: true,
      enableShades: true,
      shadeIntensity: 0.5,
      reverseNegativeShade: true,
      colorScale: {
        ranges: [
          {
            from: 0,
            to: 20,
            color: '#818cf8' // Indigo
          },
          {
            from: 21,
            to: 50,
            color: '#6366f1' // Darker indigo
          },
          {
            from: 51,
            to: 1000,
            color: '#4f46e5' // Even darker indigo
          }
        ]
      }
    }
  },
  legend: {
    show: false
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '14px',
      fontFamily: 'var(--font)',
      fontWeight: 600,
      colors: ['#fff']
    },
    formatter: function(text, op) {
      return [
        text,
        op.value > 1 ? `${op.value} jobs` : `${op.value} job`
      ]
    }
  },
  tooltip: {
    theme: 'dark',
    style: {
      fontSize: '14px',
      fontFamily: 'var(--font)'
    },
    y: {
      formatter: (value) => `${value} ${value > 1 ? 'positions' : 'position'}`
    },
    x: {
      show: true,
      formatter: (value) => `State: ${value}`
    }
  }
}));
</script>

<style lang="scss" scoped>
.location-card {
  margin-bottom: 1.5rem;
}

.location-card-head {
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

.location-card-body {
  padding: 1.5rem;
}

.top-locations {
  margin-bottom: 2rem;

  .locations-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .location-item {
    padding: 1.25rem;
    background: var(--card-bg-color-secondary, #f5f5f5);
    border-radius: 12px;
    border: 1px solid var(--border-color, #eee);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    .location-info {
      display: flex;
      align-items: center;
      gap: 1rem;

      .location-icon {
        position: relative;

        .iconify {
          font-size: 1.75rem;
          color: var(--primary);
        }

        .rank-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 600;
        }
      }

      .location-details {
        h5 {
          margin: 0;
          font-size: 1rem;
          color: var(--title-color);
        }

        .position-count {
          font-size: 0.85rem;
          color: var(--light-text);
          margin-top: 0.25rem;
          display: block;
        }
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
  .locations-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
