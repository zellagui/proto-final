<script setup lang="ts">
export interface StatsLogo {
  logo: string
}

export interface LogoStatsProps {
  title: string
  subtitle: string
  heading: string
  content: string
  logos: StatsLogo[]
  inverted?: boolean
}

const props = withDefaults(defineProps<LogoStatsProps>(), {
  logos: () => [],
  inverted: false,
})

const invertedClasses = computed(() => [props.inverted && 'is-inverted'])
</script>

<template>
  <div class="py-6">
    <div class="logo-stats">
      <div
        class="big-number"
        :class="invertedClasses"
      >
        <span>{{ props.title }}</span>
      </div>
      <p class="paragraph">
        {{ props.subtitle }}
      </p>
      <hr :class="invertedClasses">
      <div
        class="clients"
        :class="invertedClasses"
      >
        <div class="left">
          <Title
            tag="h3"
            :size="5"
            weight="semi"
            leading
            :inverted="props.inverted"
          >
            <span>70% of hiring managers</span>
          </Title>
          <p class="paragraph max-w-5">
            believe posting fake jobs is morally acceptable
          </p>
        </div>
        <div class="right">
          <Title
            tag="h3"
            :size="5"
            weight="semi"
            leading
            :inverted="props.inverted"
          >
            <span>1.8M jobs</span>
          </Title>
          <p class="paragraph max-w-5">
            posted on LinkedIn are more that a month old
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-stats {
  .big-number {
    font-family: var(--font);
    font-weight: bolder;
    font-size: 4rem;
    color: var(--title-color);

    &.is-inverted {
      color: var(--white);
    }
  }

  .clients {
    display: flex;

    .left,
    .right {
      width: 50%;
    }

    .left {
      margin-bottom: 1.5rem;
    }

    .right {
      img {
        display: block;
        min-width: 80px;
        max-width: 80px;
        margin: 0 auto;
      }
    }

    &.is-inverted {
      .right {
        img {
          filter: invert(1);
        }
      }
    }
  }
}

.is-dark {
  .logo-stats {
    .clients {
      .right {
        img {
          filter: invert(1);
        }
      }
    }
  }
}

@media only screen and (width <= 767px) {
  .logo-stats {
    .big-number {
      font-size: 2.5rem;
    }

    .clients {
      flex-direction: column;

      .left,
      .right {
        width: 100%;
      }
    }
  }
}
</style>
