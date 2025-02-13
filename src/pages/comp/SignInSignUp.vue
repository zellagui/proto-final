<template>
  <div>
    <!-- CTA Block with Buttons -->

    <CtaBlockJ
      small-text="Ready To Join Us ?"
    >
      <i
        class="iconify"
        data-icon="ph:arrow-down-bold"
      />
      <br>
      <br>

      <Buttons alignment="centered">
        <!-- Button to open "Get Started" modal -->
        <Button
          color="primary"
          :long="2"
          bold
          raised
          @click="modalGetStartedOpen = true"
        >
          Get Started
        </Button>

        <!-- Button to open "Sign In" modal -->
        <Button
          :long="2"
          bold
          raised
          @click="modalSignInOpen = true"
        >
          Sign In
        </Button>
      </Buttons>
    </CtaBlockJ>

    <!-- Modal for "Get Started" -->
    <Modal
      title="Get Started"
      :open="modalGetStartedOpen"
      actions="center"
      noscroll
      @close="modalGetStartedOpen = false"
    >
      <template #content>
        <!-- Include the SignupForm component here -->
        <div class="auth-wrapper is-single">
          <div class="auth-nav">
            <div class="left" />
            <div class="center">
              <RouterLink
                to="/"
                class="header-item"
              >
                <DarkImage
                  :src="config.logo.src"
                  :src-dark="config.logo.srcDark"
                  alt=""
                  :width="config.logo.width"
                  :height="config.logo.height"
                />
              </RouterLink>
            </div>
            <div class="right" />
          </div>

          <div class="single-form-wrap">
            <div class="inner-wrap">
              <div class="auth-head">
                <Title
                  tag="h2"
                  :size="3"
                  weight="thin"
                  narrow
                >
                  Create an Account.
                </Title>
                <p>Please fill in required info</p>
              </div>

              <div class="form-card">
                <SignupForm />
              </div>

              <div class="forgot-link has-text-centered">
                <RouterLink to="/auth/">
                  I already have an account
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- Optional: Add modal actions if needed -->
      <template #action>
        <!-- For example, a Close button -->
        <Button
          color="primary"
          :long="2"
          raised
          @click="modalGetStartedOpen = false"
        >
          Close
        </Button>
      </template>
    </Modal>

    <!-- Modal for "Sign In" -->
    <Modal
      title="Sign In"
      :open="modalSignInOpen"
      actions="center"
      noscroll
      @close="modalSignInOpen = false"
    >
      <template #content>
        <!-- Include the LoginForm component here -->
        <div class="auth-wrapper is-single">
          <div class="auth-nav">
            <div class="left" />
            <div class="center">
              <RouterLink
                to="/"
                class="header-item"
              >
                <DarkImage
                  :src="config.logo.src"
                  :src-dark="config.logo.srcDark"
                  alt=""
                  :width="config.logo.width"
                  :height="config.logo.height"
                />
              </RouterLink>
            </div>
            <div class="right" />
          </div>

          <div class="single-form-wrap">
            <div class="inner-wrap">
              <div class="auth-head">
                <Title
                  tag="h2"
                  :size="3"
                  weight="thin"
                  narrow
                >
                  Welcome Back.
                </Title>
                <p>Please sign in to your account</p>
                <RouterLink to="/auth/signup-1/">
                  I do not have an account yet
                </RouterLink>
              </div>

              <div class="form-card">
                <LoginForm />
              </div>

              <div class="forgot-link has-text-centered">
                <RouterLink to="/auth/signup-1/">
                  Forgot Password?
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- Optional: Add modal actions if needed -->
      <template #action>
        <!-- For example, a Close button -->
        <Button
          color="primary"
          :long="2"
          raised
          @click="modalSignInOpen = false"
        >
          Close
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import config from '/@src/app.config'

// Import necessary components

// Define reactive references for modal state
const modalGetStartedOpen = ref(false) // Modal state for "Get Started"
const modalSignInOpen = ref(false) // Modal state for "Sign In"
</script>

<style scoped lang="scss">
/* Include your existing styles here */

/* Styles for the modal forms */
.auth-nav {
  position: relative;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;

  .left,
  .right {
    display: flex;
    align-items: center;
    width: 20%;
  }

  .right {
    justify-content: flex-end;

    .dark-mode {
      transform: scale(0.7);
    }
  }

  .center {
    flex-grow: 2;

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      :deep(img) {
        width: 100%;
        max-width: 40px;
      }
    }
  }
}

.auth-wrapper {
  width: 100%;
  padding: 0;
  margin: 0;


  .single-form-wrap {
    display: flex;
    align-items: center;
    justify-content: center;

    .inner-wrap {
      width: 100%;
      max-width: 400px;

      .auth-head {
        max-width: 320px;
        width: 100%;
        margin: 0 auto;
        margin-bottom: 1.5rem;
        text-align: center;

        p {
          font-size: 1rem;
          margin-bottom: 8px;
          color: var(--medium-text);
        }

        a {
          font-size: 0.8rem;
          font-family: var(--font-alt);
          font-weight: 500;
          color: var(--primary);
        }
      }

      .form-card {
        background: var(--card-bg-color);
        border: 1px solid var(--card-border-color);
        border-radius: 0.9rem;
        padding: 3.25rem;
        margin-bottom: 1rem;
      }
    }
  }

  .forgot-link {
    margin-top: 0.75rem;

    a {
      font-family: var(--font-alt);
      font-size: 0.9rem;
      color: var(--light-text);
      transition: color 0.3s;

      &:hover {
        color: var(--primary);
      }
    }
  }
}
</style>
