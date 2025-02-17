<template>
  <Card class="trends-card">
    <div class="trends-card-head">
      <div class="title-wrap">
        <h3>Job Posting Trends</h3>
        <p class="subtitle">
          Number of positions posted over time
        </p>
      </div>
    </div>

    <div class="trends-card-body">
      <div class="chart-container">
        <ApexChart type="area" height="250" :options="chartOptions" :series="chartSeries" />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import ApexChart from 'vue3-apexcharts';

const props = defineProps({
  companyReport: {
    type: Object,
    required: true
  }
});

// Transform date distribution data for the chart
const trendData = computed(() => {
  if (!props.companyReport?.time_trends?.date_distribution) return [];

  return props.companyReport.time_trends.date_distribution
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(item => ({
      x: new Date(item.date).getTime(),
      y: item.count
    }));
});

// Chart series
const chartSeries = computed(() => [{
  name: 'Job Postings',
  data: trendData.value
}]);

// Chart options
const chartOptions = ref({
  chart: {
    type: 'area',
    height: 250,
    toolbar: {
      show: false
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    },
    background: 'transparent',
    events: {
      mounted: function (chartContext: any) {
        // Make all touch event listeners passive
        const chartElement = chartContext.el;
        const touchElements = chartElement.querySelectorAll('[data-touchstart]');
        touchElements.forEach((el: HTMLElement) => {
          el.addEventListener('touchstart', () => { }, { passive: true });
        });
      }
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [50, 100]
    }
  },
  colors: ['#818cf8'], // Indigo color
  grid: {
    borderColor: 'var(--border-color, #eee)',
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: true
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    labels: {
      style: {
        colors: 'var(--light-text)',
        fontSize: '0.9rem',
        fontFamily: 'var(--font)'
      },
      format: 'MMM dd'
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: 'var(--light-text)',
        fontSize: '0.9rem',
        fontFamily: 'var(--font)'
      },
      formatter: (value) => Math.round(value)
    },
    title: {
      text: 'Jobs Posted',
      style: {
        color: 'var(--light-text)',
        fontSize: '0.9rem',
        fontFamily: 'var(--font)',
        fontWeight: 500
      }
    }
  },
  tooltip: {
    theme: 'light',
    x: {
      format: 'MMM dd, yyyy'
    },
    y: {
      formatter: (value) => `${Math.round(value)} jobs`
    }
  }
});
</script>

<style lang="scss" scoped>
.trends-card {
  margin-bottom: 1.5rem;
}

.trends-card-head {
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

.trends-card-body {
  padding: 1.5rem;
}

.chart-container {
  background: var(--card-bg-color-secondary, #f5f5f5);
  border-radius: 12px;
  border: 1px solid var(--border-color, #eee);
  padding: 1.5rem;
}
</style>
