<script setup lang="ts">
import { testimonials } from '/@src/data/blocks/advanced/testimonials'

</script>

<template>
  <div class="pb-6">
    <div class="globe-stats">
      <div class="globe-holder">
        <div class="globe-inner">
          <Globe :size="1080" :map-samples="11098.83" />
        </div>
      </div>
      <div class="stats-block">
        <div class="stat-block">
          <div class="block-inner">
            <Title tag="h3" :size="4" weight="bold" narrow>
              <span />
              <Counter :number="23" />
              <span>M+</span>
            </Title>
            <p class="paragraph is-upper">
              Jobs per month
            </p>
          </div>
        </div>
        <div class="stat-block">
          <div class="block-inner">
            <Title tag="h3" :size="4" weight="bold" narrow>
              <span />
              <Counter :number="15" />
              <span>M+</span>
            </Title>
            <p class="paragraph is-upper">
              co
            </p>
          </div>
        </div>
        <div class="stat-block">
          <div class="block-inner">
            <Title tag="h3" :size="4" weight="bold" narrow>
              <span />
              <Counter :number="250" />
              <span>TB</span>
            </Title>
            <p class="paragraph is-upper">
              Data Served
            </p>
          </div>
        </div>
        <div class="stat-block">
          <div class="block-inner">
            <Title tag="h3" :size="4" weight="bold" narrow>
              <span />
              <Counter :number="40" />
              <span>K+</span>
            </Title>
            <p class="paragraph is-upper">
              Customers
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.globe-stats {
  position: relative;

  .globe-holder {
    height: 300px;
    width: 100%;
    margin-top: -100px;
    overflow: hidden;

    .globe-inner {
      overflow: hidden;
      margin: 0 auto;
      display: grid;
      place-items: center;
      place-content: center;
    }
  }

  .stats-block {
    display: flex;
    justify-content: center;
    border-bottom: 1px solid var(--wrap-border-color);

    .stat-block {
      text-align: center;
      flex: 1 1 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 150px;
      border-left: 1px solid var(--wrap-border-color);

      .block-inner {
        p {
          text-transform: uppercase;
        }
      }

      &:last-child {
        border-right: 1px solid var(--wrap-border-color);
      }
    }
  }
}

@media only screen and (width <=767px) {
  .globe-stats {
    margin-left: -1.5rem;
    margin-right: -1.5rem;

    .stats-block {
      flex-wrap: wrap;

      .stat-block {
        flex: none;
        width: 50%;

        &:first-child,
        &:nth-child(2) {
          border-bottom: 1px solid var(--wrap-border-color);
        }

        &:first-child,
        &:nth-child(3) {
          border-left: none;
        }

        &:nth-child(2),
        &:nth-child(4) {
          border-left: 1px solid var(--wrap-border-color);
          border-right: none;
        }

        :deep(.title) {
          font-size: 2rem;
        }
      }
    }
  }
}

@media only screen and (width >=768px) and (width <=1024px) and (orientation: portrait) {
  .globe-stats {
    margin-left: -1.5rem;
    margin-right: -1.5rem;

    .stats-block {
      .stat-block {
        :deep(.title) {
          font-size: 2.5rem;
        }
      }
    }
  }
}
</style>
