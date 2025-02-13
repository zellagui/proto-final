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
  // ... existing code ...
]
