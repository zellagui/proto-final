// ... existing code ...
export const routes = [
  {
    path: '/company/profile/:companyName',
    name: 'company-profile',
    component: () => import('/@src/pages/company/profile/[companyName].vue'),
    props: true,
    children: [
      {
        path: 'jobs/:jobId',
        name: 'job-details',
        component: () => import('/@src/pages/company/profile/job_details.vue'),
        props: true
      }
    ]
  },
  {
    path: '/legal',
    component: () => import('/@src/layouts/default.vue'),
    children: [
      {
        path: 'disclaimer',
        name: 'legal-disclaimer',
        component: () => import('/@src/pages/legal/disclaimer.vue'),
        meta: {
          navbar: {
            enabled: true
          }
        }
      },
      {
        path: 'privacy',
        name: 'legal-privacy',
        component: () => import('/@src/pages/legal/privacy.vue'),
      },
      {
        path: 'terms',
        name: 'legal-terms',
        component: () => import('/@src/pages/legal/terms.vue'),
      },
      {
        path: '/legal/cookies',
        name: 'legal-cookies',
        component: () => import('/@src/pages/legal/cookies.vue'),
        meta: {
          navbar: {
            enabled: true,
          },
        },
      },
      {
        path: 'accessibility',
        name: 'legal-accessibility',
        component: () => import('/@src/pages/legal/accessibility.vue'),
      },
    ],
  },
  // ... existing code ...
]
