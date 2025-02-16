<script setup lang="ts"></script>

<template>
  <div class="search-fields-container">
    <div class="search-fields">
      <div class="field-list">
        <div class="field physical">Physical Requirements</div>
        <div class="field culture">Company Culture</div>
        <div class="field training">Training Provided</div>
        <div class="field career">Potential Career Path</div>
        <div class="field environment">Work Environment</div>
        <div class="field schedule">Scheduling Details</div>
        <div class="field demand">Job Demand</div>
        <div class="field priority">Recruitment Priority</div>
        <div class="field balance">Work-Life Balance</div>
        <div class="field future">Future Technology</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-fields-container {
  width: 300px;
  height: 200px;
  margin: 0 auto;
  border-radius: 1rem;
  background: var(--wrap-muted-color);
  padding: 0.5rem;
}

.search-fields {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.75rem;
}

.field-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  animation: scrollFields 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

.field {
  font-size: 0.85rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: var(--dark-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  &.physical {
    background: #f0f7ff;
  }

  &.culture {
    background: #fff0f7;
  }

  &.training {
    background: #f0fff7;
  }

  &.career {
    background: #fff7f0;
  }

  &.environment {
    background: #f7f0ff;
  }

  &.schedule {
    background: #f0fff0;
  }

  &.demand {
    background: #fff0f0;
  }

  &.priority {
    background: #f0f0ff;
  }

  &.balance {
    background: #fffff0;
  }

  &.future {
    background: #f7fff0;
  }
}

@keyframes scrollFields {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
}
</style>
