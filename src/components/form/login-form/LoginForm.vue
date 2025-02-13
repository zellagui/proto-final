<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signIn, fetchAuthSession } from 'aws-amplify/auth'
import { useUserSession } from '/@src/stores/userSession'

const userSession = useUserSession()
const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleSignIn = async (event: Event) => {
  event.preventDefault()
  error.value = ''
  loading.value = true
  try {
    const { nextStep } = await signIn({ username: username.value, password: password.value })
    if (nextStep.signInStep === 'DONE') {
      // User is signed in. Fetch session and store token.
      const session = await fetchAuthSession()
      userSession.setToken(session.tokens.idToken)
      await userSession.initializeSession()
      console.log('User Session:', userSession.user)
      router.push('/')
    } else if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
      router.push('/auth/ConfirmSignUp?username=' + encodeURIComponent(username.value))
    } else {
      error.value = 'Additional sign-in steps required.'
    }
  } catch (err: any) {
    error.value = err.message || 'An error occurred while signing in.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSignIn">
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
        Sign In
      </Button>
    </Control>

    <div
      v-if="error"
      class="notification is-danger mt-2"
    >
      {{ error }}
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
