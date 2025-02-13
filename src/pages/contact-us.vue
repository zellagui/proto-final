<script setup lang="ts">
import { ref } from 'vue';
import { socialLinks } from '/@src/data/blocks/advanced/social';

const active = ref('');
setTimeout(() => {
  active.value = 'is-active';
}, 750);

// Add refs for form fields
const name = ref('');
const email = ref('');
const message = ref('');
const subscribe = ref(false);

const submitForm = async () => {
  const payload = {
    name: name.value,
    Email: email.value,
    message: message.value,
    subscribe: subscribe.value,
  };

  try {
    const response = await fetch('https://hook.us1.make.com/tjgxlhgou1pv32hbjn4vw5nyjmo5xoey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to send data to the webhook');
    }

    // If the submission is successful, you can show a success message
    alert('Your message has been sent successfully.');
    // Optionally, reset the form fields
    name.value = '';
    email.value = '';
    message.value = '';
    subscribe.value = false;
  } catch (error) {
    console.error('Error submitting the form:', error);
    alert('There was an error submitting your message.');
  }
};
</script>

<template>
  <Hero
    class="car-hero"
    size="fullheight"
    mask="slant"
  >
    <template #body>
      <div class="columns is-vcentered">
        <div class="column is-5">
          <div class="hero-form-container">
            <div class="hero-form">
              <Title
                tag="h2"
                :size="4"
                weight="semi"
              >
                Contact us
              </Title>
              <form @submit.prevent="submitForm">
                <Field>
                  <FieldLabel label="Full Name" />
                  <Control icon="ph:user-duotone">
                    <VInput
                      v-model="name"
                      placeholder="First and last name"
                    />
                  </Control>
                </Field>
                <Field>
                  <FieldLabel label="Email Address" />
                  <Control icon="ph:envelope-duotone">
                    <VInput
                      v-model="email"
                      placeholder="Your email address"
                    />
                  </Control>
                </Field>
                <Field>
                  <FieldLabel label="Message" />
                  <Control>
                    <VTextarea
                      v-model="message"
                      placeholder="Write something..."
                    />
                  </Control>
                </Field>
                <Field>
                  <Control>
                    <div class="py-2">
                      <Checkbox
                        v-model="subscribe"
                        name="checkbox-1"
                        label="I want to subscribe to the newsletter."
                        color="default"
                      />
                    </div>
                  </Control>
                </Field>
                <Field>
                  <Control>
                    <div class="py-2">
                      <Button
                        color="primary"
                        fullwidth
                        bold
                        raised
                        type="submit"
                      >
                        <span>Send</span>
                      </Button>
                    </div>
                  </Control>
                </Field>
              </form>
            </div>
          </div>
        </div>
        <div class="column is-7">
          <div class="car-hero-composition mt-6">
            <img
              class="main-image"
              src="/images/contact.svg"
              alt="Car hero image"
              width="1000"
              height="857"
            >
            <img
              class="left-image"
              :class="active"
              src="/images/contact.svg"
              alt="Car hero image"
              width="1000"
              height="857"
            >
            <img
              class="right-image"
              :class="active"
              src="/images/contact.svg"
              alt="Car hero image"
              width="1000"
              height="857"
            >
          </div>
        </div>
      </div>
    </template>
  </Hero>
  <FooterA
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Negare
                non possum. Apparet statim, quae sint officia, quae actiones."
    color="gray"
    :social-links="socialLinks"
  />
</template>

<style lang="scss" scoped>
.car-hero-composition {
  position: relative;

  .main-image {
    opacity: 0;
    pointer-events: none;
  }

  .left-image,
  .right-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .right-image {
    z-index: 0;

    &.is-active {
      transform: translate(-44px, -40px);
    }

    transition: all 0.55s ease-out;
  }

  .left-image {
    top: -4rem;
    z-index: 1;

    &.is-active {
      transform: translate(44px, 44px);
    }

    transition: all 0.55s ease-out;
  }
}

.hero-form-container {
  position: relative;

  .hero-form {
    background: var(--card-bg-color);
    border: 1px solid var(--card-border-color);
    box-shadow: var(--light-box-shadow);
    border-radius: 1rem;
    padding: 2.5rem;
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
  }
}

@media only screen and (width <= 767px) {
  .car-hero {
    text-align: center;

    :deep(.title) {
      &.is-2 {
        font-size: 2rem;
      }
    }

    .buttons {
      justify-content: center;
    }
  }

  .hero-form-container {
    margin-top: 3rem;
  }
}

@media only screen and (width >= 768px) and (width <= 1024px) and (orientation: portrait) {
  .car-hero {
    text-align: center;

    :deep(.title) {
      font-size: 2.25rem;
      margin-left: auto;
      margin-right: auto;
      max-width: 580px;
    }

    :deep(.subtitle) {
      margin-left: auto;
      margin-right: auto;
      max-width: 580px;
    }

    .buttons {
      justify-content: center;
    }
  }

  .hero-form-container {
    margin-top: 3rem;
  }
}
</style>
