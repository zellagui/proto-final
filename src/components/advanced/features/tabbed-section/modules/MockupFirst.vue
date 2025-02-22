<script setup lang="ts">
const boardCount = 5
const jobsPerBoard = 6
const boards = Array(boardCount).fill(null).map((_, i) => ({
  id: i,
  active: Math.random() > 0.2,
  pulseDelay: `${i * 0.8}s`
}))

const jobs = Array(jobsPerBoard).fill(null).map((_, i) => ({
  id: i,
  position: i * (360 / jobsPerBoard),
  delay: `${i * 0.3}s`
}))
</script>

<template>
  <div class="ui-mockup">
    <!-- Job Boards Orbital System -->
    <div class="orbital-system">
      <!-- Central Monitor -->
      <div class="monitor-core">
        <div class="core-pulse">
          <img src="/assets/logo/ghostjobsLOGO.png" alt="GhostJobs Logo">
        </div>
        <div class="core-ring"></div>
        <div class="core-ring outer"></div>
      </div>

      <!-- Job Board Orbits -->
      <div v-for="board in boards" :key="board.id" class="board-orbit" :style="{
        transform: `rotate(${board.id * (360 / boardCount)}deg) scale(${1 + board.id * 0.15})`,
        animationDelay: board.pulseDelay
      }">
        <div class="board-node" :class="{ active: board.active }">
          <!-- Abstract Job Cards -->
          <div v-for="job in jobs" :key="job.id" class="job-indicator" :style="{
            transform: `rotate(${job.position}deg) translateX(${10 + board.id * 2}px)`,
            animationDelay: job.delay
          }">
          </div>
        </div>
        <div class="orbit-path"></div>
      </div>

      <!-- Scanning Effect -->
      <div class="scan-line"></div>
    </div>

    <!-- Monitoring Metrics -->
    <div class="metrics-grid">
      <div v-for="i in 3" :key="i" class="metric-bar" :style="{ animationDelay: `${i * 0.2}s` }">
        <div class="bar-progress"></div>
        <div class="bar-pulse"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ui-mockup {
  position: relative;
  width: 100%;
  min-height: 300px;
  height: clamp(300px, 50vh, 400px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 3vw, 2rem);
  margin: 0 auto;


  @media (max-width: 768px) {
    min-height: 280px;
    padding: 0.5rem;
  }
}

.orbital-system {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: min(500px, 90vw);
  aspect-ratio: 1;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-width: min(280px, 90vw);
  }
}

.monitor-core {
  position: relative;
  width: clamp(60px, 15vw, 80px);
  height: clamp(60px, 15vw, 80px);
  z-index: 2;

  .core-pulse {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 50%;
    animation: corePulse 2s ease-in-out infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 30px var(--primary-light-15);

    img {
      width: 85%;
      height: 85%;
      object-fit: contain;
      animation: logoFloat 3s ease-in-out infinite;
      filter: drop-shadow(0 0 8px var(--primary));
    }
  }

  .core-ring {
    position: absolute;
    inset: -6px;
    border: 2px solid var(--primary-light-15);
    border-radius: 50%;
    opacity: 0.7;
    animation: ringRotate 10s linear infinite;

    &.outer {
      inset: -12px;
      border-width: 1px;
      opacity: 0.3;
      animation: ringRotate 15s linear infinite reverse;
    }
  }
}

.board-orbit {
  position: absolute;
  width: 100%;
  height: 100%;
  animation: orbitPulse 4s ease-in-out infinite;
  transform-origin: center center;

  &:hover {
    animation-play-state: paused;

    .board-node {
      transform: scale(1.2);
    }
  }

  .orbit-path {
    position: absolute;
    top: 50%;
    left: 50%;
    width: clamp(120px, 30vw, 160px);
    height: clamp(120px, 30vw, 160px);
    transform: translate(-50%, -50%);
    border: 1px solid var(--primary-light-15);
    border-radius: 50%;
    opacity: 0.4;
  }

  .board-node {
    position: absolute;
    top: calc(50% - 8px);
    right: calc(50% - clamp(66px, 16vw, 88px));
    width: clamp(12px, 3vw, 16px);
    height: clamp(12px, 3vw, 16px);
    background: var(--wrap-muted-color);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    transition: all 0.5s ease;
    transform-origin: center center;
    animation: nodeFloat 3s ease-in-out infinite;

    &.active {
      background: var(--primary-light-15);
      border-color: var(--primary);
      box-shadow: 0 0 15px var(--primary-light-15);
      animation: activeNodePulse 2s ease-in-out infinite;
    }
  }

  .job-indicator {
    position: absolute;
    width: clamp(3px, 0.8vw, 4px);
    height: clamp(3px, 0.8vw, 4px);
    background: var(--primary);
    border-radius: 50%;
    opacity: 0.6;
    animation: jobPulse 2s ease-in-out infinite;
  }
}

.scan-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg,
      transparent,
      var(--primary-light-15) 20%,
      var(--primary) 50%,
      var(--primary-light-15) 80%,
      transparent);
  opacity: 0.3;
  animation: scanRotate 4s linear infinite;
  transform-origin: center;
}

.metrics-grid {
  display: none;
}

@keyframes corePulse {

  0%,
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

@keyframes ringRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes orbitPulse {

  0%,
  100% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
  }
}

@keyframes jobPulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
}

@keyframes scanRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes progressPulse {
  0% {
    width: 0%;
  }

  50% {
    width: 75%;
  }

  100% {
    width: 0%;
  }
}

@keyframes barPulse {
  0% {
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(0);
    opacity: 0.1;
  }

  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes systemFloat {

  0%,
  100% {
    transform: scale(0.9) translateY(0);
  }

  50% {
    transform: scale(0.9) translateY(-10px);
  }
}

@keyframes nodeFloat {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

@keyframes activeNodePulse {

  0%,
  100% {
    box-shadow: 0 0 15px var(--primary-light-15);
    transform: scale(1);
  }

  50% {
    box-shadow: 0 0 25px var(--primary-light-15);
    transform: scale(1.2);
  }
}

@keyframes logoFloat {

  0%,
  100% {
    transform: scale(1) rotate(0deg);
  }

  50% {
    transform: scale(1.1) rotate(5deg);
  }
}
</style>
