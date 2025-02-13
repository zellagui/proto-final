<template>
  <div class="job-boards-section">
    <div class="section-head">
      <h4>Job Boards Overview</h4>
      <p class="subtitle">
        Available positions across different platforms
      </p>
    </div>

    <div class="boards-grid">
      <!-- Indeed -->
      <div class="board-item active">
        <div class="board-icon">
          <i
            class="iconify"
            data-icon="simple-icons:indeed"
          />
        </div>
        <div class="board-content">
          <h5>Indeed</h5>
          <span class="job-count">{{ jobsCount }} jobs</span>
        </div>
      </div>

      <!-- LinkedIn -->
      <div class="board-item disabled">
        <div class="board-icon">
          <i
            class="iconify"
            data-icon="mdi:linkedin"
          />
        </div>
        <div class="board-content">
          <h5>LinkedIn</h5>
          <span class="job-count">Coming soon</span>
        </div>
      </div>

      <!-- Glassdoor -->
      <div class="board-item disabled">
        <div class="board-icon">
          <i
            class="iconify"
            data-icon="simple-icons:glassdoor"
          />
        </div>
        <div class="board-content">
          <h5>Glassdoor</h5>
          <span class="job-count">Coming soon</span>
        </div>
      </div>

      <!-- ZipRecruiter -->
      <div class="board-item disabled">
        <div class="board-icon">
          <i
            class="iconify"
            data-icon="simple-icons:ziprecruiter"
          />
        </div>
        <div class="board-content">
          <h5>ZipRecruiter</h5>
          <span class="job-count">Coming soon</span>
        </div>
      </div>

      <!-- Google Jobs -->
      <div class="board-item disabled">
        <div class="board-icon">
          <i
            class="iconify"
            data-icon="simple-icons:googlejobs"
          />
        </div>
        <div class="board-content">
          <h5>Google Jobs</h5>
          <span class="job-count">Coming soon</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  companyReport: {
    type: Object,
    required: true
  }
});

const jobsCount = computed(() => {
  return props.companyReport?.location_analysis?.total_jobs || 0;
});
</script>

<style lang="scss" scoped>
.job-boards-section {
  margin: 1rem 0;

  .section-head {
    margin-bottom: 1.5rem;

    h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--title-color);
      margin: 0;
    }

    .subtitle {
      font-size: 0.95rem;
      color: var(--light-text);
      margin-top: 0.25rem;
    }
  }
}

.boards-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.board-item {
  flex: 1;
  min-width: 120px;
  padding: 1rem;
  background: var(--card-bg-color-secondary, #f5f5f5);
  border-radius: 8px;
  border: 1px solid var(--border-color, #eee);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.2s ease;

  &.active {
    background: var(--white);
    border-color: var(--primary);

    .board-icon {
      .iconify {
        color: var(--primary);
      }
    }

    &:hover {
      transform: translateY(-2px);
    }
  }

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .board-icon {
    .iconify {
      font-size: 1.5rem;
      color: var(--light-text);
    }
  }

  .board-content {
    h5 {
      margin: 0;
      font-size: 0.9rem;
      color: var(--title-color);
    }

    .job-count {
      font-size: 0.8rem;
      color: var(--light-text);
      display: block;
      margin-top: 0.25rem;
    }
  }
}

@media (max-width: 768px) {
  .boards-grid {
    flex-direction: column;
  }

  .board-item {
    width: 100%;
  }
}
</style>
