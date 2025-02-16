<script setup lang="ts">
import { ref } from 'vue';
import { socialLinks } from '/@src/data/blocks/advanced/social'

</script>

<template>
  <div class="launch-page">
    <!-- Hero Section -->
    <Section class="launch-hero">
      <Container>
        <div class="hero-content">
          <div class="hero-badge">
            <Icon icon="ph:sparkle-duotone" class="badge-icon" />
            <span>Beta</span>
          </div>

          <Title tag="h1" :size="1" weight="bold" leading>
            <span class="gradient-text">Ghost Jobs v1</span>
          </Title>


          <!-- Enhanced Search Bar -->
          <div class="search-container">
            <div class="search-features">
              <div class="feature">
                <Icon icon="ph:shield-check-duotone" />
                <span>Privacy First</span>
              </div>
              <div class="feature">
                <Icon icon="ph:brain-duotone" />
                <span>AI Powered</span>
              </div>
              <div class="feature">
                <Icon icon="ph:chart-line-up-duotone" />
                <span>Real Data</span>
              </div>
            </div>

            <div class="search-bar disabled">
              <Icon icon="ph:magnifying-glass-duotone" class="search-icon" />
              <input type="text" placeholder="Search jobs with transparency (Coming Soon)" disabled
                class="search-input">
              <span class="coming-soon-badge">Beta Access Soon</span>
            </div>

            <div class="action-buttons">
              <button class="action-button disabled">
                <Icon icon="ph:binoculars-duotone" class="button-icon" />
                <span>Track</span>
                <span class="alpha-badge">Alpha</span>
              </button>

              <button class="action-button disabled">
                <Icon icon="ph:warning-circle-duotone" class="button-icon" />
                <span>Report</span>
                <span class="alpha-badge">Alpha</span>
              </button>

              <button class="action-button disabled">
                <Icon icon="ph:puzzle-piece-duotone" class="button-icon" />
                <span>Extension</span>
                <span class="alpha-badge">Alpha</span>
              </button>
            </div>
            <!-- <Countdown thin date="Sep 28, 2022" /> -->

          </div>
        </div>
      </Container>
    </Section>

    <!-- Companies Preview -->
    <Section class="section-companies">
      <Container>
        <div class="companies-header">
          <Title tag="h2" :size="2" weight="bold" leading>
            <span>Discover Companies</span>
          </Title>
          <p class="companies-subtitle">
            coma
          </p>
        </div>

        <Suspense>
          <template #default>
            <CompanyList :columns="4" :limit="8" size="medium" rounded />
          </template>
          <template #fallback>
            <div class="loading-placeholder">
              <Icon icon="ph:circle-notch-duotone" class="spin" />
              <span>Discovering innovative companies...</span>
            </div>
          </template>
        </Suspense>
      </Container>
    </Section>
  </div>
  <FooterA FooterColors="white"
    text="Join the movement for job search transparency. Find your next opportunity with confidence."
    :social-links="socialLinks" />
</template>

<style scoped lang="scss">
.launch-page {
  padding-top: 0;
  background: white;
}

.launch-hero {
  padding: 8rem 0 6rem;
  background: linear-gradient(to bottom, var(--wrap-muted-color), white);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, var(--primary-light-15), transparent 70%);
    opacity: 0.4;
    pointer-events: none;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--primary);
    color: white;
    padding: 0.5rem 1.25rem;
    border-radius: 2rem;
    margin-bottom: 2rem;
    font-weight: 600;
    box-shadow: 0 4px 15px rgb(var(--primary-rgb) / 25%);

    .badge-icon {
      font-size: 1.2rem;
    }
  }

  .gradient-text {
    display: block;
    background: linear-gradient(135deg, var(--primary), var(--info));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 4rem;
    margin-top: 0.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--light-text);
    margin: 1.5rem auto;
    max-width: 600px;
    line-height: 1.6;
  }
}

.search-container {
  max-width: 600px;
  margin: 3rem auto 0;
}

.search-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1.5rem;

  .feature {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--dark-text);
    font-size: 0.95rem;
    font-weight: 500;

    :deep(svg) {
      font-size: 1.2rem;
      color: var(--primary);
    }
  }
}

.search-bar {
  display: flex;
  align-items: center;
  background: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  &.disabled {
    opacity: 0.9;
    cursor: not-allowed;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 25px rgba(0, 0, 0, 0.08);

      .coming-soon-badge {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }

  .search-icon {
    font-size: 1.5rem;
    color: var(--primary);
    margin-right: 1rem;
  }

  .search-input {
    flex-grow: 1;
    border: none;
    background: none;
    font-size: 1.1rem;
    color: var(--dark-text);
    outline: none;
    font-family: var(--font);

    &::placeholder {
      color: var(--light-text);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .coming-soon-badge {
    position: absolute;
    top: -2.5rem;
    left: 50%;
    transform: translateX(-50%) translateY(0.5rem);
    background: var(--primary);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
  }
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  margin-top: 2.5rem;
  padding: 0 1rem;
}

.action-button {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.75rem;
  background: var(--card-bg-color);
  border: 1px solid var(--card-border-color);
  border-radius: 1rem;
  color: var(--dark-text);
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: not-allowed;
  opacity: 0.9;
  min-width: 140px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1rem;
    padding: 1px;
    background: linear-gradient(135deg, var(--primary), var(--info));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0.5;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgb(var(--primary-rgb) / 12%);
    background: linear-gradient(to bottom, var(--card-bg-color), var(--wrap-muted-color));

    &::before {
      opacity: 1;
    }

    .alpha-badge {
      transform: translateY(-0.75rem);
      opacity: 1;
    }

    .button-icon {
      transform: scale(1.1);
      color: var(--primary);
    }
  }

  .button-icon {
    font-size: 1.3rem;
    color: var(--light-text);
    transition: all 0.3s ease;
  }

  .alpha-badge {
    position: absolute;
    top: -1.5rem;
    left: 50%;
    transform: translateX(-50%) translateY(0.5rem);
    background: linear-gradient(135deg, var(--primary), var(--info));
    color: white;
    padding: 0.3rem 0.85rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
    box-shadow: 0 4px 15px rgb(var(--primary-rgb) / 15%);
  }

  span:not(.alpha-badge) {
    font-weight: 600;
    background: linear-gradient(135deg, var(--dark-text), var(--light-text));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.companies-header {
  text-align: center;

  :deep(.title) {
    font-size: 2.2rem;
    background: linear-gradient(135deg, var(--primary), var(--info));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 1rem;
  }

  .companies-subtitle {
    font-size: 1.15rem;
    color: var(--light-text);
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.5;
  }
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem;
  color: var(--light-text);
  font-size: 1.1rem;

  .spin {
    font-size: 1.5rem;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.section-companies {
  background: white;
  padding: 4rem 0;
}
</style>
