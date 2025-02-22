import type { HeroAvatar } from '/@src/components/layout/hero/modules/HeroAvatars.vue'
import type { BaseFeature } from '/@src/types'

export const heroAvatars: HeroAvatar[] = [
  {
    id: 0,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'left',
    order: 1,
    size: '',
  },
  {
    id: 1,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'left',
    order: 2,
    size: 'medium',
  },
  {
    id: 2,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'left',
    order: 3,
    size: 'large',
  },
  {
    id: 3,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'left',
    order: 4,
    size: 'big',
  },
  {
    id: 4,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'left',
    order: 5,
    size: '',
  },
  {
    id: 5,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'left',
    order: 6,
    size: 'medium',
  },
  {
    id: 6,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'right',
    order: 1,
    size: '',
  },
  {
    id: 7,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'right',
    order: 2,
    size: 'medium',
  },
  {
    id: 8,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'right',
    order: 3,
    size: 'large',
  },
  {
    id: 9,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'right',
    order: 4,
    size: 'big',
  },
  {
    id: 10,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'right',
    order: 5,
    size: '',
  },
  {
    id: 11,
    picture: 'data:image/gif;base64,replace_with_your_image',
    orientation: 'right',
    order: 6,
    size: 'medium',
  },
]

export const appFeatures: BaseFeature[] = [
  {
    title: 'AI Powered',
    text: 'Our AI handles every complex operation, letting you focus.',
  },
  {
    title: 'Real-Time Data',
    text: 'All your data is processed in real-time, for better performance.',
  },
  {
    title: 'Fast and Secure',
    text: 'Your data is virtually unhackable compared to traditional net.',
  },
]

export const tabbedProcess = {
  steps: [
    {
      id: 0,
      icon: '/assets/icons/abstract/1.svg',
      title: 'Multi-Source Aggregation',
      content:
        'Pull real-time job listings from dozens of job boards and millions of corporate sites, consolidating all postings into a single feed. Never miss an opportunity, no matter where it’s posted.',
    },
    {
      id: 1,
      icon: '/assets/icons/abstract/2.svg',
      title: 'Company Hiring History',
      content:
        'Track and store each organization’s hiring data over time. Gain insights into trends, layoffs, and growth patterns that can inform your career decisions.',
    },
    {
      id: 2,
      icon: '/assets/icons/abstract/3.svg',
      title: 'Verification & Quality Control',
      content:
        'Filter out ghost jobs, scams, and misleading postings before they ever reach your feed. Our system flags suspicious patterns and removes duplicates to ensure accurate, reliable listings.',
    },
    {
      id: 3,
      icon: '/assets/icons/abstract/4.svg',
      title: 'Real-Time Alerts & Transparent Records',
      content:
        'Receive immediate notifications when new roles or trends surface. Explore an open, ledger-like record of each company’s hiring practices, so you always have the facts you need to stay ahead in a shifting market.',
    },
  ],
  images: [
    {
      id: 0,
      url: '/assets/illustrations/placeholder/placeholder-process-1.png',
      darkUrl: '/assets/illustrations/placeholder/placeholder-process-1-dark.png',
    },
    {
      id: 1,
      url: '/assets/illustrations/placeholder/placeholder-process-2.png',
      darkUrl: '/assets/illustrations/placeholder/placeholder-process-2-dark.png',
    },
    {
      id: 2,
      url: '/assets/illustrations/placeholder/placeholder-process-3.png',
      darkUrl: '/assets/illustrations/placeholder/placeholder-process-3-dark.png',
    },
    {
      id: 3,
      url: '/assets/illustrations/placeholder/placeholder-process-4.png',
      darkUrl: '/assets/illustrations/placeholder/placeholder-process-4-dark.png',
    },
  ],
}


export const marketingProcess = {
  steps: [
    {
      id: 0,
      icon: '/assets/icons/abstract/1.svg',
      title: 'Flag & Review',
      content:
        'Collaboratively identify and discuss potential job posting red flags with a community of like-minded job seekers.',
      image: '/assets/illustrations/workflow/workflow-1.png',
      imageDark: '/assets/illustrations/workflow/workflow-1-dark.png',
    },
    {
      id: 1,
      icon: '/assets/icons/abstract/2.svg',
      title: 'Company historical data & Job Analytics',
      content:
        'Get detailed insights into job postings, helping you make informed decisions before you apply.',
      image: '/assets/illustrations/workflow/workflow-2.png',
      imageDark: '/assets/illustrations/workflow/workflow-2-dark.png',
    },
    {
      id: 2,
      icon: '/assets/icons/abstract/3.svg',
      title: 'Job Search Hacking',
      content:
        'Optimize your keywords for sales growth and profitability. Automatically capture new converting keywords while negating ones that are hurting performance.',
      image: '/assets/illustrations/workflow/workflow-3.png',
      imageDark: '/assets/illustrations/workflow/workflow-3-dark.png',
    },
    {
      id: 3,
      icon: '/assets/icons/abstract/4.svg',
      title: 'Custom Analytics',
      content:
        'Track progress to your goals. Understand your total business performance with individual and combined product, campaign, and profitability metrics.',
      image: '/assets/illustrations/workflow/workflow-4.png',
      imageDark: '/assets/illustrations/workflow/workflow-4-dark.png',
    },
  ],
}

export const marketingStats = [
  {
    id: 0,
    prefix: '',
    suffix: 'TB',
    value: 40,
    text: 'Of annual data processed',
  },
  {
    id: 1,
    prefix: '$',
    suffix: 'B',
    value: 7,
    text: 'Amazon & Walmart.com sales optimized annually',
  },
  {
    id: 2,
    prefix: '',
    suffix: 'M',
    value: 750,
    text: 'Monthly bid changes executed',
  },
  {
    id: 3,
    prefix: '$',
    suffix: 'M',
    value: 450,
    text: 'Managed ad spend annually on automated campaigns',
  },
]

export const testimonials = [
  {
    id: 0,
    customer: {
      name: 'Mike Williams',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Covenant',
    },
    logo: '/assets/brands/covenant.svg',
    content:
      'Vulk software is notably robust, and their analysts have helped us both maximize profitability and truly understand the incremental value of our web Ads.',
  },
  {
    id: 1,
    customer: {
      name: 'Tara Reed',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'CFO @Kromo',
    },
    logo: '/assets/brands/kromo.svg',
    content:
      'Not only are our metrics and performance up and exceeding expectations, but I’ve been really impressed with the way that they manage our business.',
  },
  {
    id: 2,
    customer: {
      name: 'Nelly Olsen',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Infinite',
    },
    logo: '/assets/brands/infinite.svg',
    content:
      'Vulk has definitely made the management of our web advertising better. By combining the convenience of managing keywords and bids, along with being able to.',
  },
  {
    id: 3,
    customer: {
      name: 'Adrian Felks',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Grubspot',
    },
    logo: '/assets/brands/grubspot.svg',
    content:
      'Bringing on Vulk has been a tremendous asset to our web business. NatureWise’s sales velocity has increased substantially, and we’re excited to.',
  },
  {
    id: 4,
    customer: {
      name: 'Barry Wilks',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'CEO @Phasekit',
    },
    logo: '/assets/brands/phasekit.svg',
    content:
      "Within three months of starting with Vulk, we had our best month ever in terms of both profits and sales. We're definitely not changing tools as this is the real deal!",
  },
  {
    id: 5,
    customer: {
      name: 'Emma Spencer',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Marketing Associate @Tribe',
    },
    logo: '/assets/brands/tribe.svg',
    content:
      'Not only are our metrics and performance up and exceeding expectations, but I’ve been really impressed with the way that they manage our business.',
  },
  {
    id: 6,
    customer: {
      name: 'Alan Smith',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Manager @Proactive',
    },
    logo: '/assets/brands/proactive.svg',
    content:
      "Once you see the algorithm in action, you see how awesome Vulk and their technology really are! I can't wait to get back working on my project!",
  },
  {
    id: 7,
    customer: {
      name: 'Lana Henriks',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Live Talk',
    },
    logo: '/assets/brands/livetalk.svg',
    content:
      'Vulk has definitely made the management of our web advertising better. By combining the convenience of managing keywords and bids, along with being able to.',
  },
  {
    id: 8,
    customer: {
      name: 'Helen Watts',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Gutwork',
    },
    logo: '/assets/brands/gutwork.svg',
    content:
      'Vulk came in with a very clear perspective on how to drive brand growth on web, powerful AI systems and a strong managed services team.',
  },
]

export const testimonialsMarquee = [
  {
    id: 0,
    customer: {
      name: 'Mike Williams',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Covenant',
    },
    logo: '/assets/brands/covenant.svg',
    content:
      'Vulk software is notably robust, and their analysts have helped us both maximize profitability and truly understand the incremental value of our web Ads.',
  },
  {
    id: 1,
    customer: {
      name: 'Tara Reed',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'CFO @Kromo',
    },
    logo: '/assets/brands/kromo.svg',
    content:
      'Not only are our metrics and performance up and exceeding expectations, but I’ve been really impressed with the way that they manage our business.',
  },
  {
    id: 2,
    customer: {
      name: 'Nelly Olsen',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Infinite',
    },
    logo: '/assets/brands/infinite.svg',
    content:
      'Vulk has definitely made the management of our web advertising better. By combining the convenience of managing keywords and bids, along with being able to track our ongoing results, Vulk has given us more control over our web advertising than we’ve ever had before.',
  },
  {
    id: 3,
    customer: {
      name: 'Adrian Felks',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Grubspot',
    },
    logo: '/assets/brands/grubspot.svg',
    content:
      'Bringing on Vulk has been a tremendous asset to our web business. NatureWise’s sales velocity has increased substantially, and we’re excited to continue on that path with web DSP.',
  },
  {
    id: 4,
    customer: {
      name: 'Barry Wilks',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'CEO @Phasekit',
    },
    logo: '/assets/brands/phasekit.svg',
    content:
      'Within three months of starting with Vulk, we had our best month ever in terms of both profits and sales.',
  },
  {
    id: 5,
    customer: {
      name: 'Emma Spencer',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Marketing Associate @Tribe',
    },
    logo: '/assets/brands/tribe.svg',
    content:
      'Not only are our metrics and performance up and exceeding expectations, but I’ve been really impressed with the way that they manage our business.',
  },
  {
    id: 6,
    customer: {
      name: 'Alan Smith',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Manager @Proactive',
    },
    logo: '/assets/brands/proactive.svg',
    content:
      'Once you see the algorithm in action, you see how awesome Vulk and their technology really are!',
  },
  {
    id: 7,
    customer: {
      name: 'Lana Henriks',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Live Talk',
    },
    logo: '/assets/brands/livetalk.svg',
    content:
      'Vulk has definitely made the management of our web advertising better. By combining the convenience of managing keywords and bids, along with being able to track our ongoing results, Vulk has given us more control over our web advertising than we’ve ever had before.',
  },
  {
    id: 8,
    customer: {
      name: 'Helen Watts',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Gutwork',
    },
    logo: '/assets/brands/gutwork.svg',
    content:
      'Vulk came in with a very clear perspective on how to drive brand growth on web, powerful AI systems and a strong managed services team.',
  },
  {
    id: 9,
    customer: {
      name: 'John Bigsby',
      photo: 'data:image/gif;base64,replace_with_your_image',
      position: 'Founder @Bitbreaker',
    },
    logo: '/assets/brands/bitbreaker.svg',
    content:
      'Within three months of starting with Vulk, we had our best month ever in terms of both profits and sales.',
  },
]

export const marketingIconFeatures = [
  {
    id: 0,
    icon: '/assets/icons/colored/chat.svg',
    title: 'Flag & Review',
    content:
      'Collaboratively identify and discuss potential job posting red flags with a community of like-minded job seekers.',
  },
  {
    id: 1,
    icon: '/assets/icons/colored/clock.svg',
    title: 'Historical Data & Insights',
    content:
      'Get historical data & insights into job postings, helping you make informed decisions before you apply.',
  },
  {
    id: 2,
    icon: '/assets/icons/colored/certificate.svg',
    title: 'Job Search Hacking',
    content:
      'Leverage job seeker tools and resources to effectively land your next career.',
  },
]
