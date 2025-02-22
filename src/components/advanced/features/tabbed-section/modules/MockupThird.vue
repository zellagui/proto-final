<script setup lang="ts">
import { ref } from 'vue'

const jobTypes = [
  { id: 1, status: 'verified', title: 'Senior Software Engineer', company: 'TechCorp', flags: [] },
  { id: 2, status: 'suspicious', title: 'Remote Developer', company: 'Unknown Corp', flags: ['location_mismatch', 'salary_hidden'] },
  { id: 3, status: 'duplicate', title: 'Frontend Developer', company: 'WebTech', flags: ['duplicate_posting'] },
  { id: 4, status: 'scam', title: 'Urgent Hiring - Work From Home', company: 'Quick Jobs', flags: ['urgent_suspicious', 'no_company_info'] }
]

const activeFilters = ref(['suspicious', 'scam', 'duplicate'])

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'verified': return 'ph:check-circle-duotone'
    case 'suspicious': return 'ph:warning-circle-duotone'
    case 'duplicate': return 'ph:copy-duotone'
    case 'scam': return 'ph:prohibit-duotone'
    default: return 'ph:question-duotone'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'success'
    case 'suspicious': return 'warning'
    case 'duplicate': return 'info'
    case 'scam': return 'danger'
    default: return 'light'
  }
}

const getFlagIcon = (flag: string) => {
  switch (flag) {
    case 'location_mismatch': return 'ph:map-pin-line-duotone'
    case 'salary_hidden': return 'ph:money-duotone'
    case 'duplicate_posting': return 'ph:files-duotone'
    case 'urgent_suspicious': return 'ph:clock-countdown-duotone'
    case 'no_company_info': return 'ph:buildings-duotone'
    default: return 'ph:info-duotone'
  }
}
</script>

<template>
  <div class="ui-mockup is-verification">
    <div class="verification-header">
      <div class="status-indicator">
        <div class="pulse-dot"></div>
        <span>Live Verification</span>
      </div>
      <div class="filter-badges">
        <span v-for="filter in activeFilters" :key="filter" class="filter-badge" :class="filter">
          <Icon :icon="getStatusIcon(filter)" />
          {{ filter }}
        </span>
      </div>
    </div>

    <div class="verification-feed">
      <div v-for="job in jobTypes" :key="job.id" class="job-card" :class="job.status">
        <div class="status-bar">
          <Icon :icon="getStatusIcon(job.status)" :class="getStatusColor(job.status)" />
          <span class="status-text">{{ job.status }}</span>
        </div>

        <div class="job-content">
          <h4>{{ job.title }}</h4>
          <p>{{ job.company }}</p>

          <div v-if="job.flags.length" class="flag-container">
            <div v-for="flag in job.flags" :key="flag" class="flag-item">
              <Icon :icon="getFlagIcon(flag)" />
              <span>{{ flag.replace('_', ' ') }}</span>
            </div>
          </div>
        </div>

        <div class="verification-progress" v-if="job.status === 'verified'">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="verification-stats">
      <div class="stat-item">
        <Icon icon="ph:shield-check-duotone" class="has-text-success" />
        <div class="stat-content">
          <span class="stat-value">98%</span>
          <span class="stat-label">Accuracy Rate</span>
        </div>
      </div>
      <div class="stat-item">
        <Icon icon="ph:clock-countdown-duotone" class="has-text-info" />
        <div class="stat-content">
          <span class="stat-value">&lt;30s</span>
          <span class="stat-label">Verification Time</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-mockup.is-verification {
  background: var(--white);
  border-radius: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1rem, 3vw, 1.5rem);
  height: clamp(250px, 50vh, 300px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 24px rgb(0 0 0 / 6%);

  @media (max-width: 768px) {
    height: 280px;
    padding: 1rem;
  }
}

.verification-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--dark-text);
    font-weight: 500;

    .pulse-dot {
      width: 8px;
      height: 8px;
      background: var(--success);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
  }

  .filter-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;

    .filter-badge {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      border-radius: 1rem;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: capitalize;

      &.suspicious {
        background: var(--warning-light);
        color: var(--warning-dark);
      }

      &.scam {
        background: var(--danger-light);
        color: var(--danger-dark);
      }

      &.duplicate {
        background: var(--info-light);
        color: var(--info-dark);
      }

      :deep(svg) {
        width: 1rem;
        height: 1rem;
      }
    }
  }
}

.verification-feed {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 2px;
  }
}

.job-card {
  background: var(--white);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 0.75rem;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    border-color: var(--primary-light);
  }

  &.verified {
    border-color: var(--success-light);
    background: linear-gradient(to right, var(--success-light-15), transparent);
  }

  &.suspicious {
    border-color: var(--warning-light);
    background: linear-gradient(to right, var(--warning-light-15), transparent);
  }

  &.scam {
    border-color: var(--danger-light);
    background: linear-gradient(to right, var(--danger-light-15), transparent);
  }

  &.duplicate {
    border-color: var(--info-light);
    background: linear-gradient(to right, var(--info-light-15), transparent);
  }

  .status-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    :deep(svg) {
      width: 1.25rem;
      height: 1.25rem;

      &.success {
        color: var(--success);
      }

      &.warning {
        color: var(--warning);
      }

      &.danger {
        color: var(--danger);
      }

      &.info {
        color: var(--info);
      }
    }

    .status-text {
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: capitalize;
      color: var(--light-text);
    }
  }

  .job-content {
    h4 {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--dark-text);
      margin: 0 0 0.25rem;
    }

    p {
      font-size: 0.85rem;
      color: var(--light-text);
      margin: 0;
    }
  }

  .flag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;

    .flag-item {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.2rem 0.4rem;
      background: var(--wrap-muted-color);
      border-radius: 0.5rem;
      font-size: 0.75rem;
      color: var(--light-text);
      text-transform: capitalize;

      :deep(svg) {
        width: 1rem;
        height: 1rem;
        opacity: 0.7;
      }
    }
  }

  .verification-progress {
    margin-top: 0.5rem;

    .progress-bar {
      height: 4px;
      background: var(--success-light);
      border-radius: 2px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        background: var(--success);
        width: 0;
        animation: progress 1.5s ease-in-out infinite;
      }
    }
  }
}

.verification-stats {
  display: flex;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-color);

  .stat-item {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: var(--wrap-muted-color);
    border-radius: 0.75rem;

    :deep(svg) {
      width: 1.5rem;
      height: 1.5rem;
    }

    .stat-content {
      display: flex;
      flex-direction: column;

      .stat-value {
        font-size: 1rem;
        font-weight: 600;
        color: var(--dark-text);
      }

      .stat-label {
        font-size: 0.75rem;
        color: var(--light-text);
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(var(--success-rgb), 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(var(--success-rgb), 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(var(--success-rgb), 0);
  }
}

@keyframes progress {
  0% {
    width: 0;
    opacity: 1;
  }

  50% {
    width: 100%;
    opacity: 0.5;
  }

  100% {
    width: 0;
    opacity: 1;
  }
}
</style>
