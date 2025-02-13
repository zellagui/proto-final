<script setup lang="ts">
import { ref } from 'vue'

export interface SubscriptionCompactProps {
  label: string
  placeholder: string
}

const props = defineProps<SubscriptionCompactProps>()
const email = ref('');
const emailSubmitted = ref(false); // Tracks if the email has been submitted

const webhookUrl = 'https://hook.us1.make.com/t06bdpvfy7dx2rvkq1nko81phk3julh1';

const handleSubmit = async () => {
  const formData = {
    email: email.value,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log('Email saved successfully:', formData);
    emailSubmitted.value = true; // Update state to indicate the email has been submitted
  } catch (error) {
    console.error('Error sending form data:', error);
  }
}
</script>
<template>
  <div class="subscribe-compact">
    <!-- Show form only if email hasn't been submitted -->
    <form
      v-if="!emailSubmitted"
      @submit.prevent="handleSubmit"
    >
      <Field grouped>
        <Control expanded>
          <VInput
            v-model="email"
            :placeholder="props.placeholder"
          />
        </Control>
        <Control>
          <Button
            size="form"
            color="primary"
            :long="1"
            raised
            bold
          >
            {{ props.label }}
          </Button>
        </Control>
      </Field>
    </form>

    <!-- Show success message if email has been submitted -->
    <div
      v-if="emailSubmitted"
      class="has-text-centered"
    >
      <p class="success-message">
        You will receive your invitation soon. Thank you!
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">

.subscribe-compact {
  :deep(.field) {
    border: 2px solid var(--input-base-border-color);
    padding: 0.25rem;
    border-radius: 0.85rem;
    transition:
      box-shadow 0.3s,
      border-color 0.3s;
    background-color: var(--input-base-bg-color);

    &:focus-within {
      box-shadow: var(--light-box-shadow);
      border-color: var(--primary);
    }
  }

  :deep(.control) {
    .form-icon {
      height: 48px !important;
      width: 48px !important;
      font-size: 1.15rem !important;
    }
  }

  :deep(.input) {
    height: 48px !important;
    font-size: 1.1rem !important;
    border: none;
    box-shadow: none !important;
  }

  :deep(.button) {
    height: 48px !important;
  } 
}

.success-message {
  color: var(--primary); // Adjust color as needed
  padding: 1em;
  font-size: 1.25rem; // Adjust size as needed
}
</style>
