import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { skipHydrate } from 'pinia'

export type UserData = {
  username: string
  email?: string
  [key: string]: any
} | null

export const useUserSession = defineStore('userSession', () => {
  const token = useStorage('token', '')
  const user = ref<Partial<UserData>>(null)

  const isLoggedIn = computed(() => token.value !== '')

  function setUser(value: Partial<UserData>) {
    user.value = value
  }

  function setToken(value: string) {
    token.value = value
  }

  async function logoutUser() {
    user.value = null
    token.value = ''
    localStorage.removeItem('rememberMe')
    localStorage.removeItem('username')
    // If using Amplify's signOut, you can also call it here.
    // await signOut()
  }

  function decodeJWT(token: string): any {
    try {
      const payloadBase64 = token.split('.')[1]
      const payload = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'))
      const decoded = decodeURIComponent(
        payload
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      return JSON.parse(decoded)
    } catch (e) {
      console.error('Failed to decode JWT:', e)
      return {}
    }
  }

  async function initializeSession() {
    if (token.value) {
      try {
        const payload: any = decodeJWT(token.value)
        const email = payload.email
        const cognitoUsername = payload['cognito:username']
        setUser({ username: cognitoUsername, email })
      } catch (e) {
        console.error('Error decoding token:', e)
        await logoutUser()
      }
    } else {
      user.value = null
    }
  }

  return {
    user,
    token: skipHydrate(token),
    isLoggedIn,
    setUser,
    setToken,
    logoutUser,
    initializeSession,
  } as const
})
