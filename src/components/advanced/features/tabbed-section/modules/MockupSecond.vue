<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

// Initial data
const baseData = [
  { month: 'Dec', year: '23', hiring: 75, growth: true },
  { month: 'Jan', year: '24', hiring: 85, growth: true },
  { month: 'Feb', year: '24', hiring: 45, growth: false },
  { month: 'Mar', year: '24', hiring: 25, growth: false },
  { month: 'Apr', year: '24', hiring: 65, growth: true }
]

const historyData = ref([...baseData])
const isUpdating = ref(false)

// Responsive breakpoints
const isMobile = ref(window.innerWidth < 768)
const isTablet = ref(window.innerWidth < 1024 && window.innerWidth >= 768)

// Handle window resize
const handleResize = () => {
  isMobile.value = window.innerWidth < 768
  isTablet.value = window.innerWidth < 1024 && window.innerWidth >= 768
}

// Compute bar width based on screen size
const barWidth = computed(() => {
  if (isMobile.value) return 16
  if (isTablet.value) return 20
  return 24
})

// Simulate data updates
const updateData = () => {
  isUpdating.value = true

  const newValue = Math.floor(Math.random() * 60) + 20
  const prevValue = historyData.value[historyData.value.length - 1].hiring
  const growth = newValue > prevValue

  const newData = [...historyData.value.slice(1), {
    month: historyData.value[historyData.value.length - 1].month,
    year: historyData.value[historyData.value.length - 1].year,
    hiring: newValue,
    growth
  }]

  historyData.value = newData

  setTimeout(() => {
    isUpdating.value = false
  }, 1000)
}

onMounted(() => {
  setInterval(updateData, 3000)
  window.addEventListener('resize', handleResize)
  handleResize()
})

const getBarHeight = (value: number) => `${value}%`
const getBarColor = (growth: boolean) => growth ? 'var(--success)' : 'var(--danger)'
</script>

<template>
  <div class="ui-mockup is-history">
    <div class="history-header">
      <div class="status-group">
        <div class="company-pulse"></div>
        <span class="status-label">Live Tracking</span>
      </div>
      <span class="update-indicator" :class="{ 'is-updating': isUpdating }">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </span>
    </div>

    <div class="visualization-container">
      <!-- Hiring Activity Graph -->
      <div class="graph-container">
        <div class="graph-grid">
          <div class="grid-line" v-for="i in 4" :key="i"></div>
        </div>

        <div class="graph-bars">
          <div v-for="(data, index) in historyData" :key="data.month + index" class="bar-group"
            :class="{ 'is-updating': isUpdating }">
            <div class="bar-wrapper">
              <div class="activity-bar" :style="{
                height: getBarHeight(data.hiring),
                backgroundColor: getBarColor(data.growth),
                width: `${barWidth}px`
              }">
                <div class="bar-glow"></div>
                <div class="value-label">{{ data.hiring }}%</div>
              </div>
            </div>
            <div class="bar-label">
              <span class="month">{{ data.month }}</span>
              <span class="year">'{{ data.year }}</span>
            </div>
          </div>
        </div>

        <!-- Trend Indicators -->
        <div class="trend-indicators">
          <div class="trend up">
            <div class="indicator-dot"></div>
            <span>Hiring</span>
          </div>
          <div class="trend down">
            <div class="indicator-dot"></div>
            <span>Slowdown</span>
          </div>
        </div>
      </div>

      <!-- Pattern Overlay -->
      <div class="pattern-overlay">
        <div class="pattern-line"></div>
        <div class="pattern-line"></div>
        <div class="pattern-line"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-mockup.is-history {
  background: var(--white);
  border-radius: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1rem, 3vw, 1.5rem);
  height: clamp(250px, 50vh, 300px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 24px rgb(0 0 0 / 6%);

  @media (max-width: 768px) {
    height: 280px;
  }
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  padding: 0 0.5rem;
}

.status-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .company-pulse {
    width: clamp(8px, 1.5vw, 10px);
    height: clamp(8px, 1.5vw, 10px);
    background: var(--success);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  .status-label {
    font-size: clamp(0.75rem, 1.5vw, 0.85rem);
    color: var(--light-text);
    font-weight: 500;
  }
}

.update-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.is-updating {
    opacity: 1;
  }

  .dot {
    width: clamp(3px, 0.8vw, 4px);
    height: clamp(3px, 0.8vw, 4px);
    background: var(--primary);
    border-radius: 50%;
    animation: dotPulse 1s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

.visualization-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0.5rem;
}

.graph-container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  padding-bottom: clamp(1.5rem, 3vw, 2rem);
}

.graph-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2rem;
  opacity: 0.1;
  pointer-events: none;

  .grid-line {
    width: 100%;
    height: 1px;
    background: var(--dark);
  }
}

.graph-bars {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 100%;
  padding: 0 clamp(0.5rem, 2vw, 1rem);
  gap: clamp(0.5rem, 2vw, 1rem);
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.25rem, 1vw, 0.5rem);
  max-width: clamp(40px, 10vw, 60px);

  &.is-updating {
    .activity-bar {
      animation: barUpdate 1s ease-in-out;
    }
  }
}

.bar-wrapper {
  width: 100%;
  height: clamp(120px, 30vh, 160px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
}

.activity-bar {
  border-radius: clamp(6px, 1.5vw, 12px);
  position: relative;
  transition: height 0.5s ease-in-out, background-color 0.5s ease-in-out;
  min-height: clamp(16px, 4vw, 20px);

  .bar-glow {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    filter: blur(8px);
    opacity: 0.3;
    background: inherit;
    transition: opacity 0.3s ease;
  }

  .value-label {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: clamp(0.65rem, 1.2vw, 0.7rem);
    color: var(--light-text);
    opacity: 0;
    transition: opacity 0.3s ease;
    white-space: nowrap;
  }

  &:hover {
    transform: scaleY(1.05);

    .bar-glow {
      opacity: 0.5;
    }

    .value-label {
      opacity: 1;
    }
  }
}

.bar-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
  text-align: center;

  .month {
    font-size: clamp(0.7rem, 1.3vw, 0.8rem);
    font-weight: 600;
    color: var(--dark-text);
  }

  .year {
    font-size: clamp(0.65rem, 1.2vw, 0.7rem);
    color: var(--light-text);
  }
}

.trend-indicators {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    gap: 0.25rem;
  }

  .trend {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: clamp(0.65rem, 1.2vw, 0.75rem);
    color: var(--light-text);

    .indicator-dot {
      width: clamp(6px, 1.2vw, 8px);
      height: clamp(6px, 1.2vw, 8px);
      border-radius: 50%;
    }

    &.up .indicator-dot {
      background: var(--success);
    }

    &.down .indicator-dot {
      background: var(--danger);
    }
  }
}

.pattern-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.05;
  pointer-events: none;
}

.pattern-line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: var(--dark-text);

  &:nth-child(1) {
    top: 25%;
    transform: rotate(15deg);
  }

  &:nth-child(2) {
    top: 50%;
    transform: rotate(-15deg);
  }

  &:nth-child(3) {
    top: 75%;
    transform: rotate(15deg);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgb(var(--success-rgb) / 40%);
  }

  70% {
    box-shadow: 0 0 0 6px rgb(var(--success-rgb) / 0%);
  }

  100% {
    box-shadow: 0 0 0 0 rgb(var(--success-rgb) / 0%);
  }
}

@keyframes dotPulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

@keyframes barUpdate {

  0%,
  100% {
    filter: brightness(1);
  }

  50% {
    filter: brightness(1.2);
  }
}
</style>
