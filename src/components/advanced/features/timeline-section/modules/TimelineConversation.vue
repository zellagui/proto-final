<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="transparency-showcase">
    <div class="showcase-item">
      <div class="item-icon">
        <Icon icon="ph:shield-check-duotone" class="privacy-icon" />
      </div>
      <div class="item-content">
        <h3>No Personal Data for Sale</h3>
        <p>Your data stays yours. We never sell or trade personal information.</p>
      </div>
      <div class="item-indicator"></div>
    </div>

    <div class="showcase-item">
      <div class="item-icon">
        <Icon icon="ph:lock-key-duotone" class="privacy-icon" />
      </div>
      <div class="item-content">
        <h3>Zero Third-Party Sharing</h3>
        <p>Direct connection. No intermediaries. No external data sharing.</p>
      </div>
      <div class="item-indicator"></div>
    </div>

    <div class="showcase-item">
      <div class="item-icon">
        <Icon icon="ph:brain-duotone" class="privacy-icon" />
      </div>
      <div class="item-content">
        <h3>Independent AI Analysis</h3>
        <p>Our AI works with public data only. No purchased datasets.</p>
      </div>
      <div class="item-indicator"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.transparency-showcase {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.showcase-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--wrap-muted-color);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(0.5rem);
    background: var(--card-bg-color);

    .item-indicator {
      opacity: 1;
      transform: translateX(0);
    }

    .privacy-icon {
      color: var(--primary);
      transform: scale(1.1);
    }
  }

  .item-icon {
    flex-shrink: 0;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--card-bg-color);
    border-radius: 0.75rem;

    .privacy-icon {
      font-size: 1.5rem;
      color: var(--light-text);
      transition: all 0.3s ease;
    }
  }

  .item-content {
    flex-grow: 1;

    h3 {
      font-family: var(--font);
      font-size: 1rem;
      font-weight: 600;
      color: var(--dark-text);
      margin-bottom: 0.25rem;
    }

    p {
      font-family: var(--font);
      font-size: 0.9rem;
      color: var(--light-text);
      line-height: 1.4;
    }
  }

  .item-indicator {
    position: absolute;
    right: 0;
    top: 0;
    width: 0.25rem;
    height: 100%;
    background: var(--primary);
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
  }

  &:nth-child(2) {
    .item-indicator {
      background: var(--info);
    }

    &:hover .privacy-icon {
      color: var(--info);
    }
  }

  &:nth-child(3) {
    .item-indicator {
      background: var(--success);
    }

    &:hover .privacy-icon {
      color: var(--success);
    }
  }
}
</style>
