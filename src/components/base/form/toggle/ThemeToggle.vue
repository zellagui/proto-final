<script setup lang="ts">
import config from '/@src/app.config'
import { useDarkmode } from '/@src/stores/darkmode'

const props = withDefaults(
  defineProps<{
    /**
     * Disables transitions when toggling between light and dark mode.
     */
    disableTransitions?: boolean
  }>(),
  {
    disableTransitions: undefined,
  },
)

const darkmode = useDarkmode()
const isDark = computed({
  get() {
    return darkmode.isDark
  },
  set(value) {
    // disable transitions
    if (
      !import.meta.env.SSR &&
      (props.disableTransitions ?? config.theme.disableTransitions)
    ) {
      document.documentElement.classList.add('disable-transitions')
    }

    darkmode.isDark = value

    // re-enable transitions
    if (
      !import.meta.env.SSR &&
      (props.disableTransitions ?? config.theme.disableTransitions)
    ) {
      setTimeout(() => {
        document.documentElement.classList.remove('disable-transitions')
      }, 0)
    }
  },
})
</script>

<template>
  <label
    v-if="config.theme.toggle ?? true"
    for="theme-toggle"
    class="vulk-theme-toggle"
  >
    <input
      id="theme-toggle"
      v-model="isDark"
      type="checkbox"
    >
    <div class="no-margin">
      <div class="track">
        <div class="track-inner" />
        <div class="track-knob">
          <i-feather-sun class="inactive iconify" />
          <i-feather-moon class="active iconify" />
        </div>
      </div>
    </div>
  </label>
</template>

<style>
.disable-transitions *:not(.track-knob) {
  transition-property: none !important;
  transition-duration: 0 !important;
}
</style>

<style lang="scss">
.vulk-theme-toggle input:checked,
.is-dark .vulk-theme-toggle input {
  + * .track {
    .track-knob {
      margin-left: 22px;
      transform: rotate(360deg);
      background: var(--primary);
      border-color: var(--primary);
      box-shadow: var(--primary-box-shadow);

      i {
        opacity: 1;
      }

      svg {
        &.inactive {
          display: none;
          stroke-width: var(--dark-text);
        }

        &.active {
          display: block;
          stroke: var(--white-smoke);
          color: var(--white-smoke);
        }
      }
    }
  }
}

.vulk-theme-toggle {
  position: relative;
  cursor: pointer;

  input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
  }

  .track {
    position: relative;

    .track-inner {
      height: 11px;
      width: 42px;
      background: var(--custom-toggle-track-bg);
      border-radius: 100px;
    }

    .track-knob {
      position: absolute;
      top: -8px;
      left: -2px;
      height: 26px;
      width: 26px;
      border-radius: 50%;
      border: 1px solid var(--border);
      box-shadow: var(--light-box-shadow);
      background: var(--white);
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(0);
      transition: all 0.3s;

      i {
        color: var(--white);
        opacity: 0;
        transition: all 0.3s;
      }

      svg {
        height: 14px;
        width: 14px;
        stroke-width: 2px;
        stroke: var(--dark-text);

        &.inactive {
          display: block;
          color: var(--dark-text);
        }

        &.active {
          display: none;
        }
      }
    }
  }
}
</style>
