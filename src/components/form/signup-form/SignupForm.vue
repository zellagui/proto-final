<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserSession } from '/@src/stores/userSession'
import { signUp } from 'aws-amplify/auth'

// Import the user session store
const userSession = useUserSession()

// Reactive form variables
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const options = ref<string[]>([])
const error = ref<string>('')
const loading = ref<boolean>(false)
const router = useRouter()

// Display user information in console (optional)
console.log('User Session:', userSession.token)

// Handle Sign Up
const handleSignUp = async (event: Event) => {
  event.preventDefault()
  error.value = ''

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    error.value = 'All fields are required.'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.'
    return
  }
  if (!options.value.includes('terms')) {
    error.value = 'You must agree to the Terms of Service.'
    return
  }

  loading.value = true
  try {
    const { isSignUpComplete } = await signUp({
      username: username.value,
      password: password.value,
      options: {
        userAttributes: { email: email.value },
      },
    })

    if (isSignUpComplete) {
      router.push('/auth/LoginSingle')
    }
  } catch (err: any) {
    error.value = err.message || 'An unexpected error occurred.'
  } finally {
    loading.value = false
  }
}
</script>


<template>
  <form @submit.prevent="handleSignUp">
    <div class="login-form">
      <!-- Username Field -->
      <Field>
        <FieldLabel label="Username" />
        <Control icon="feather:user">
          <VInput
            v-model="username"
            placeholder="Username..."
            required
          />
        </Control>
      </Field>

      <!-- Email Field -->
      <Field>
        <FieldLabel label="Email" />
        <Control icon="feather:mail">
          <VInput
            v-model="email"
            placeholder="Email address..."
            type="email"
            required
          />
        </Control>
      </Field>

      <!-- Password Field -->
      <Field>
        <FieldLabel label="Password" />
        <Control icon="feather:lock">
          <VInput
            v-model="password"
            type="password"
            placeholder="Password..."
            required
          />
        </Control>
      </Field>

      <!-- Confirm Password Field -->
      <Field>
        <FieldLabel label="Repeat Password" />
        <Control icon="feather:lock">
          <VInput
            v-model="confirmPassword"
            type="password"
            placeholder="Repeat password..."
            required
          />
        </Control>
      </Field>

      <!-- Terms of Service Checkbox -->
      <div class="setting-item">
        <Checkbox
          v-model="options"
          color="primary"
          name="checkbox-1"
          label="I have read the Terms of Service"
          value="terms"
          required
        />
      </div>

      <!-- Submit Button -->
      <Control class="mt-4">
        <Button
          color="primary"
          fullwidth
          bold
          raised
          :disabled="loading"
          type="submit"
        >
          <span
            v-if="loading"
            class="loader"
          />
          Sign Up
        </Button>
      </Control>

      <!-- Error Message -->
      <div
        v-if="error"
        class="notification is-danger mt-2"
      >
        {{ error }}
      </div>
    </div>
  </form>
</template>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  animation: spin 1s linear infinite;
  display: inline-block;
  margin-right: 5px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.notification {
  margin-top: 1rem;
}
</style>
