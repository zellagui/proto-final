<script setup lang="ts">
import { defineProps } from 'vue'

interface Company {
  name: string
  website: string
  handle: string
  industry?: string
  size?: string
  city?: string
  state?: string
  country_code?: string
}

interface ProfileHeaderProps {
  company: Company
}

const props = defineProps<ProfileHeaderProps>()

// Optional: If the company has a logo, use it; otherwise, use a default image
const companyLogo = props.company.logo || 'data:image/gif;base64,replace_with_default_image'
</script>

<template>
  <div class="profile-header">
    <div class="profile-header-inner">
      <div class="profile-avatar">
        <AvatarSimple
          :picture="companyLogo"
          size="xl"
        />
        <Title
          tag="h2"
          :size="4"
          narrow
        >
          {{ props.company.name }}
        </Title>
        <p class="rem-100">
          {{ props.company.industry || 'Unknown Industry' }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-header {
  background: var(--wrap-bg-color);

  .profile-header-inner {
    position: relative;
    text-align: center;
    padding: 6rem 0 1rem;

    .profile-avatar {
      position: relative;

      .avatar {
        display: block;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        margin: 0 auto 1rem;
      }

      p {
        color: var(--light-text);
      }
    }

    .additional-info {
      margin-top: 2rem;
      p {
        margin: 0.5rem 0;
      }
      a {
        color: var(--primary);
        text-decoration: underline;
      }
    }
  }
}
</style>
