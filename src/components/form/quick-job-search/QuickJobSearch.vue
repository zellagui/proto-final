<script setup lang="ts">
import { ref } from 'vue';

const options = [
  {
    value: 'job posting',
    label: 'job posting',
  },
  {
    value: 'company',
    label: 'company',
  },
  {
    value: 'recruiters',
    label: 'recruiters',
  },
];

const name = ref('');
const selectedOption = ref(options[0].value);

const submitForm = async () => {
  const payload = {
    name: name.value,
    option: selectedOption.value,
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

    // If the submission is successful, open the URL in a new tab
    window.open('https://forms.gle/7kY88Jh5Z8FfCWR87', '_blank');
  } catch (error) {
    console.error('Error submitting the form:', error);
    alert('There was an error submitting your report.');
  }
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="flex-form is-relative z-1">
      <img
        src="/images/fresh.svg"
        width="500"
        height="500"
        alt="hero-image"
        @error.once="
          (event) => viaPlaceholderErrorHandler(event, `500x500`)
        "
      >
      <div>
        <Button
          type="submit"
          color="primary"
          bold
          raised
          fullwidth
        >
          Report
        </Button>
      </div>
    </div>
  </form>
</template>
