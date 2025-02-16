<script setup lang="ts">
import config from '/@src/app.config'
</script>

<template>
  <div class="py-6">
    <div class="dev-windows">
      <div class="columns">
        <div class="column is-6">
          <!--#region First browser window-->
          <div class="code-window suspicious-reasons">
            <div class="window-head">
              <div class="dots">
                <div class="dot bg-danger" />
                <div class="dot bg-yellow" />
                <div class="dot bg-success" />
              </div>
              <div class="tab">
                ghostjobs.io
              </div>
            </div>
            <div class="window-body">
              <div class="content-wrapper">
                <h2 class="custom-title">
                  Report a Job/Company Anonymously
                </h2>
                <div class="suspicious-list">
                  <div v-for="(reason, index) in [
                    { text: 'No response after 30+ days', icon: 'ph:clock-countdown-duotone', color: '#e8fff1', checked: true },
                    { text: 'Misleading job description', icon: 'ph:warning-circle-duotone', color: '#f8e8ff', checked: false },
                    { text: 'Unrealistic requirements', icon: 'ph:list-checks-duotone', color: '#e8fffa', checked: false },
                    { text: 'Position reposted multiple times', icon: 'ph:arrows-counter-clockwise-duotone', color: '#e8f5ff', checked: true },
                    { text: 'Company in hiring freeze', icon: 'ph:prohibit-duotone', color: '#fff5e8', checked: false },
                    { text: 'Job posted during layoffs', icon: 'ph:users-three-duotone', color: '#ffe8e8', checked: false }
                  ]" :key="index" class="suspicious-item" :style="{ backgroundColor: reason.color }">
                    <input type="checkbox" :checked="reason.checked" disabled class="item-checkbox">
                    <Icon :icon="reason.icon" :size="16" class="item-icon" />
                    <span class="item-text">{{ reason.text }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--#endregion -->

          <!--#region Second browser window-->
          <div class="code-window is-second">
            <div class="window-head">
              <div class="dots">
                <div class="dot bg-danger" />
                <div class="dot bg-yellow" />
                <div class="dot bg-success" />
              </div>
              <div class="address-bar">
                <span class="address">ghostjobs.io/reports</span>
                <i class="iconify" data-icon="feather:rotate-ccw" />
              </div>
            </div>
            <div class="window-body">
              <div class="fake-nav">
                <div class="fake-logo-block">
                  <div class="fake-logo">
                    <span class="logo-letter">e</span>
                  </div>
                  <div class="ml-2">
                    <h3 class="company-name">Example </h3>
                    <span class="company-status"> Hiring</span>
                  </div>
                </div>
                <div class="fake-links">
                  <span class="nav-link">Overview</span>
                  <span class="nav-link active">Reports</span>
                  <span class="nav-link">Jobs</span>
                  <span class="nav-link">Reviews</span>
                </div>
              </div>
              <div class="fake-body">
                <div class="left">
                  <div class="report-chart blur-effect">
                    <div class="pie-chart">
                      <div class="pie-segment"
                        style="transform: rotate(0deg); background: #e8fff1; clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%);">
                        <span class="segment-label">20%</span>
                      </div>
                      <div class="pie-segment"
                        style="transform: rotate(72deg); background: #fff1e8; clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%);">
                        <span class="segment-label">20%</span>
                      </div>
                      <div class="pie-segment"
                        style="transform: rotate(144deg); background: #e8f1ff; clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%);">
                        <span class="segment-label">20%</span>
                      </div>
                      <div class="pie-segment"
                        style="transform: rotate(216deg); background: #ffe8f8; clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%);">
                        <span class="segment-label">20%</span>
                      </div>
                      <div class="pie-segment"
                        style="transform: rotate(288deg); background: #f8ffe8; clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%);">
                        <span class="segment-label">20%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="stats-placeholder blur-effect">
                    <div class="stat-row">
                      <div class="stat-label">Total Reports</div>
                      <div class="stat-value">156</div>
                    </div>
                    <div class="stat-row">
                      <div class="stat-label">Last 30 Days</div>
                      <div class="stat-value">23</div>
                    </div>
                    <div class="stat-row">
                      <div class="stat-label">Trust Score</div>
                      <div class="stat-value warning">67%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--#endregion -->
        </div>

        <!--#region Columns -->
        <div class="column is-5 is-offset-1">
          <div class="text-block max-w-4">
            <Title tag="h2" :size="4" weight="bold" leading>
              <span>Report Anonymously</span>
            </Title>
            <p class="paragraph">
              Your voice matters. Report safely and anonymously—be the change you wish to see.

            </p>
          </div>
          <div class="text-block max-w-4">
            <Title tag="h2" :size="4" weight="bold" leading>
              <span>Public Discussion</span>
            </Title>
            <p class="paragraph">
              Real stories from real professionals give you the edge. Make smarter career moves through community
              insight.
            </p>
          </div>
          <div class="text-block max-w-4">
            <Title tag="h2" :size="4" weight="bold" leading>
              <span>Trust Score</span>
            </Title>
            <p class="paragraph">
              Let our open source trust score inform you. Gain full transparency into potential employers before you
              commit. </p>
          </div>
        </div>
        <!--#endregion -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dev-windows {
  .code-window {
    position: relative;
    width: 90%;
    height: 320px;
    background: var(--wrap-muted-color);
    border: 1px solid var(--card-border-color);
    border-radius: 0.5rem;
    box-shadow: var(--spread-shadow);
    overflow: hidden;

    .window-head {
      display: flex;
      align-items: center;
      height: 2.75rem;
      background: var(--card-bg-color);
      border-bottom: 1px solid var(--card-border-color);
      padding: 0 0.5rem;

      .dots {
        .dot {
          border-radius: 50%;
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-left: 0.5rem;
        }
      }

      .tab {
        position: relative;
        bottom: -5px;
        height: 2.25rem;
        background: var(--wrap-muted-color);
        border: 1px solid var(--card-border-color);
        border-bottom: none;
        border-radius: 0.5rem 0.5rem 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 1.15rem;
        margin-left: 1rem;
        font-family: var(--font);
        font-size: 0.9rem;
        color: var(--title-color);
      }

      .address-bar {
        display: flex;
        align-items: center;
        height: 1.85rem;
        padding: 0 1.25rem;
        background: var(--wrap-muted-color);
        border-radius: 0.25rem;
        margin-left: auto;
        margin-right: 35%;
        min-width: 170px;
        font-family: var(--font);
        font-size: 0.85rem;
        color: var(--title-color);

        .iconify {
          margin-left: auto;
          font-size: 0.8rem;
        }
      }
    }

    .window-body {
      height: calc(320px - 2.75rem);
      display: flex;
      align-items: stretch;

      .code-lines {
        height: 100%;
        width: 2.5rem;
        background: var(--wrap-bg-color-heavy);
        padding: 1rem 0;

        .code-line {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 1.75rem;
          font-size: 0.9rem;
          font-family: monospace;
          color: var(--title-color);
        }
      }

      .code-content {
        height: 100%;
        width: calc(100% - 2.5rem);
        padding: 1rem;

        .code-content-line {
          display: flex;
          align-items: center;
          height: 1.75rem;
          font-size: 0.9rem;
          font-family: monospace;
          color: var(--title-color);

          &.indented-1 {
            margin-left: 1.5rem;
          }

          &.indented-2 {
            margin-left: 3rem;
          }

          .bold {
            font-weight: 600;
          }
        }
      }
    }

    &.is-second {
      top: -110px;
      margin-left: 10%;
      background: var(--card-bg-color);
      z-index: 1;

      .window-body {
        display: block;
        background: var(--card-bg-color);
        padding: 0.75rem 1.25rem 1.25rem;

        .fake-nav {
          display: flex;
          align-items: center;
          height: 50px;
          width: 100%;
          margin-bottom: 1rem;

          .fake-logo-block {
            display: flex;
            align-items: center;
          }

          .fake-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 42px;
            width: 42px;
            border-radius: 50%;
            background: var(--wrap-muted-color);

            :deep(img) {
              max-width: 22px;
            }
          }

          .fake-links {
            margin-left: auto;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            >div:not(:last-child) {
              margin-right: 0.25rem;
            }
          }
        }

        .fake-body {
          display: flex;
          width: 100%;
          padding: 0.5rem;

          >div {
            width: 50%;

            &.left {
              padding-right: 0.75rem;
              max-width: 180px;
            }

            &.right {
              padding-left: 0.75rem;
              flex: 1;
            }
          }
        }
      }
    }
  }

  .text-block {
    &:not(:last-child) {
      margin-bottom: 3rem;
    }
  }
}

@media only screen and (width <=767px) {
  .dev-windows {
    margin-top: -3rem;

    .code-window {
      width: 100%;

      .window-body {
        .code-lines {
          display: none;
        }

        .code-content {
          margin: 0;
          width: 100%;
        }
      }

      &.is-second {
        .window-head {
          .address-bar {
            margin-left: auto;
            margin-right: 0;
          }
        }

        .window-body {
          .fake-nav {
            .fake-links {

              .content-shape:nth-child(3),
              .content-shape:nth-child(4) {
                display: none !important;
              }
            }
          }

          .fake-body {
            .fake-img {
              img {
                max-width: 70px;
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (width >=768px) and (width <=1024px) and (orientation: portrait) {
  .dev-windows {
    .columns {
      >.column.is-5 {
        display: flex;

        .text-block {
          padding: 0 0.5rem;
          text-align: center;

          :deep(.title) {
            font-size: 1.25rem;
          }

          .paragraph {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

/* stylelint-disable */
@media only screen and (min-device-width: 1024px) and (max-device-height: 1366px) and (-webkit-min-device-pixel-ratio: 1.5) and (orientation: portrait) {
  .dev-windows {
    .columns {
      >.column.is-5 {
        display: block;
        text-align: left !important;
      }
    }
  }
}

/* stylelint-enable */

.suspicious-reasons {
  .window-body {
    height: calc(320px - 2.75rem);
    overflow-y: auto;
    background: var(--card-bg-color);
    padding: 1.25rem;

    @media (width <=767px) {
      padding: 1rem;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 2px;
    }
  }

  .content-wrapper {
    max-width: 600px;
    margin: 0 auto;
  }

  .custom-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--dark-text);
    text-align: center;
    margin-bottom: 1.25rem;
  }

  .suspicious-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.6rem;
    max-width: 800px;
    margin: 0 auto;

    @media (width <=767px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      padding: 0 0.5rem;
    }
  }

  .suspicious-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.6rem 0.75rem;
    border-radius: 6px;
    transition: transform 0.2s ease;
    border: 1px solid rgb(0 0 0 / 3%);
    min-height: 48px;

    .item-checkbox {
      width: 16px;
      height: 16px;
      margin: 0;
      cursor: not-allowed;
      opacity: 0.8;
    }

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgb(0 0 0 / 4%);
    }

    .item-icon {
      color: #1e293b;
      opacity: 0.7;
      flex-shrink: 0;
    }

    .item-text {
      font-size: 0.85rem;
      color: #1e293b;
      font-weight: 500;
      line-height: 1.2;
      flex: 1;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.fake-logo {
  .logo-letter {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    text-transform: uppercase;
  }
}

.blur-effect {
  filter: blur(1.5px);
  opacity: 0.95;
  transition: all 0.3s ease;

  &:hover {
    filter: blur(2px);
    opacity: 0.9;
  }
}

.pie-chart {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0.75rem auto;
  border-radius: 50%;
  background: var(--card-bg-color);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  .pie-segment {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02) !important;
    }

    .segment-label {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      font-size: 0.6rem;
      color: var(--dark-text);
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease;
      font-weight: 500;
    }

    &:hover .segment-label {
      opacity: 1;
    }
  }
}

.chart-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--dark-text);
  margin-bottom: 1.5rem;
  text-align: center;
  opacity: 0.8;
}

.stats-placeholder {
  padding: 1.5rem;
  background: var(--card-bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 4%);

  .stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
      border-bottom: none;
    }

    .stat-label,
    .stat-value {
      font-size: 0.9rem;
      color: var(--dark-text);
      opacity: 0.7;
    }

    .stat-value {
      font-weight: 600;

      &.warning {
        color: var(--warning);
      }
    }
  }
}

.nav-link {
  font-size: 0.9rem;
  color: var(--light-text);
  padding: 0.5rem 1rem;
  cursor: pointer;
  opacity: 0.7;
  position: relative;
  transition: all 0.3s ease;

  &.active {
    color: var(--primary);
    font-weight: 500;
    opacity: 1;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 2px;
      background: var(--primary);
      border-radius: 2px;
    }
  }
}

.report-chart {
  background: var(--card-bg-color);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 4%);
  max-width: 100%;
  margin: 0 auto;

  .pie-chart {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0.75rem auto;
    border-radius: 50%;
    background: var(--card-bg-color);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;

    .pie-segment {
      position: absolute;
      width: 100%;
      height: 100%;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.02) !important;
      }

      .segment-label {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(-90deg);
        font-size: 0.6rem;
        color: var(--dark-text);
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-weight: 500;
      }

      &:hover .segment-label {
        opacity: 1;
      }
    }
  }
}

.report-stats {
  background: var(--card-bg-color);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 4%);

  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--dark-text);
    margin-bottom: 1rem;
  }

  .stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
      border-bottom: none;
    }

    .stat-label {
      font-size: 0.9rem;
      color: var(--light-text);
    }

    .stat-value {
      font-size: 1rem;
      font-weight: 600;
      color: var(--dark-text);

      &.warning {
        color: var(--warning);
      }
    }
  }
}

.company-name {
  font-size: 0.95rem;
  font-weight: 600;
  background: linear-gradient(135deg, var(--primary) 0%, var(--info) 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  margin: 0;
  letter-spacing: -0.3px;
}

.company-status {
  font-size: 0.7rem;
  color: var(--success);
  font-weight: 500;
  opacity: 0.85;
}
</style>
