<script setup lang="ts">
import config from '/@src/app.config'
</script>

<template>
  <div>
    <div class="error-nav">
      <Container>
        <div class="error-nav-inner">
          <div class="left">
            <DarkImage
              class="navbar-logo"
              :src="config.logo.src"
              :src-dark="config.logo.srcDark"
              alt=""
              :width="config.logo.width"
              :height="config.logo.height"
            />
          </div>
          <div class="right">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </div>

    <div class="error-wrapper">
      <div class="error-wrapper-inner">
        <div class="underlay">
          <span>404</span>
        </div>
        <div class="error-image">
          <DarkImage
            src="/assets/illustrations/error/error-1.svg"
            src-dark="/assets/illustrations/error/error-1.svg"
            alt=""
          />
        </div>
        <div class="error-content">
          <Title
            tag="h2"
            :size="3"
            weight="bold"
            leading
          >
            <span>Page Not Found</span>
          </Title>
          <p class="paragraph rem-115 mx-auto max-w-4 mb-4">
            Oops, something went wrong and we couldn't find that page. Please
            try again later.
          </p>
          <Buttons alignment="centered">
            <Button
              to="/"
              :long="3"
              color="primary"
              raised
              bold
            >
              Homepage
            </Button>
            <Button
              :long="3"
              color="primary"
              outlined
              bold
              @click.prevent="$router.back()"
              @keydown.space.prevent="() => $router.back()"
            >
              Back
            </Button>
          </Buttons>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.error-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;

  .error-nav-inner {
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      .navbar-logo:deep(img) {
        min-height: 40px;
      }
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
}

.error-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 0;

  .error-wrapper-inner {
    position: relative;
    width: 100%;

    .underlay {
      position: absolute;
      top: 41%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: var(--font);
      font-weight: 900;
      font-size: 26rem;
      color: var(--title-color);
      opacity: 0.1;
      z-index: 0;
    }

    .error-image {
      position: relative;
      z-index: 1;

      :deep(img) {
        width: 100%;
        max-width: 510px;
        margin: 0 auto;
      }
    }

    .error-content {
      margin-top: 1rem;
      text-align: center;
    }
  }
}

@media only screen and (width <= 767px) {
  .error-nav {
    .error-nav-inner {
      padding: 0 1rem;
    }
  }

  .error-wrapper {
    :deep(.title) {
      font-size: 2rem;
    }

    .paragraph {
      font-size: 1rem !important;
    }

    .error-wrapper-inner {
      .underlay {
        top: 36%;
        font-size: 12rem;
      }
    }
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .error-nav {
    .error-nav-inner {
      padding: 0 1rem;
    }
  }
}
</style>
