<script setup lang="ts"></script>

<template>
  <div class="pt-6">
    <div class="timeline">
      <!--Timeline item-->
      <div class="timeline-item">
        <div class="item-left">
          <TimelineCodeWindow />
        </div>
        <div class="item-dot" />
        <div class="item-right">
          <div class="max-w-4">
            <Title tag="h2" :size="4" weight="bold" leading>
              <span>New way to search jobs</span>
            </Title>
            <p class="paragraph">
              The most advanced job search engine in the world.

            </p>
          </div>
        </div>
      </div>
      <!--Timeline item-->
      <div class="timeline-item">
        <div class="item-left">
          <TimelinePreviewWindow />
        </div>
        <div class="item-dot" />
        <div class="item-right">
          <div class="max-w-4">
            <Title tag="h2" :size="4" weight="bold" leading>
              <span>Your own workflow and layout</span>
            </Title>
            <p class="paragraph">
              Why every job search engine is the same? what about you specific
              needs?
              <br>
              <br>
              You can now customize the workflows of you job search and arrange the layout how you want.
            </p>
          </div>
        </div>
      </div>
      <!--Timeline item-->
      <div class="timeline-item">
        <div class="item-left">
          <TimelineConversation />
        </div>
        <div class="item-dot" />
        <div class="item-right">
          <div class="max-w-4">
            <Title tag="h2" :size="4" weight="bold" leading>
              <span>Ghost jobs, Scams? Not on Our Watch
              </span>
            </Title>
            <p class="paragraph">
              Every listing on our platform undergoes verification to ensure authenticity.
              Say goodbye to deceptive posts and hidden scams – we filter out the noise so you only see real,
              trusted opportunities. .
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  .timeline-item {
    position: relative;
    display: flex;
    align-items: center;

    .item-left {
      position: relative;
      flex-grow: 2;
      padding: 0 3rem;
      width: calc(50% - 1px);
      z-index: 1;
    }

    .item-dot {
      position: relative;
      height: 10px;
      width: 10px;
      min-width: 10px;
      max-width: 10px;
      border-radius: 50%;
      border: 2px solid var(--wrap-border-color);
      background: var(--section-bg-color);
      z-index: 1;
    }

    .item-right {
      position: relative;
      flex-grow: 2;
      padding: 0 3rem;
      width: calc(50% - 1px);
      z-index: 1;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100%;
      width: 1px;
      margin: 0 auto;
      border-right: 1px solid var(--wrap-border-color);
      z-index: 0;
    }

    &:not(:last-child) {
      padding-bottom: 10rem;
    }

    &:last-child {
      padding-bottom: 5rem;
    }
  }
}

@media only screen and (width <=767px) {
  .timeline {
    .timeline-item {
      flex-direction: column;

      .item-left,
      .item-right,
      .item-dot {
        width: 100%;
      }

      .item-left {
        padding: 1rem 0;
        background: var(--section-bg-color);
      }

      .item-right {
        padding: 1rem 0;
        background: var(--section-bg-color);
        text-align: center;
      }

      .item-dot {
        margin: 5rem 0;
      }
    }
  }
}

@media only screen and (width >=768px) and (width <=1024px) and (orientation: portrait) {
  .timeline {
    .timeline-item {
      .item-left {
        padding-left: 0;
      }

      .item-right {
        padding-right: 0;
      }
    }
  }
}
</style>
