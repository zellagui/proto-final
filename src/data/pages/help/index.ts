import {article_cover} from './application-category/article_cover'
import { article_application } from './application-category/article_application_master'
import { article_resume101 } from './application-category/articles_resume101'
import { article_prep } from './application-category/article_prep'
import { article_portfolio } from './application-category/article_portfolio'
import { article_career_tips } from './career-category/article_career-tips'
import { article_linkedin_tips } from './career-category/article_linkedin_tips'

import { article_ideal_career } from './career-category/article_ideal_career'
export const markdownObject = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.

#### Choose a plan first

Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

*   Discovery pricing
*   Business pricing

#### Activate your account

Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.

#### Perform initial setup

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum.

*   Create a company
*   Add users to your team
*   Start working
`



export const helpCenterTopics = [
  {
    icon: 'ph:files-duotone',
    iconColor: 'primary',
    title: 'Documentation',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '/',
  },
  {
    icon: 'ph:atom-duotone',
    iconColor: 'success',
    title: 'User Guides',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '/',
  },
  {
    icon: 'ph:swap-duotone',
    iconColor: 'secondary',
    title: 'API',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '/',
  },
  {
    icon: 'ph:circles-three-duotone',
    iconColor: 'warning',
    title: 'Components',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: '/',
  },
]

export const helpCenterCategories = [
  {
    slug: 'welcome-category',
    icon: 'ph:hand-waving-duotone',
    iconColor: 'yellow',
    name: 'Community Guideline',
    text: 'Tap into our resources, connect with the community, and join the movement.',
    contributors: [
      {
        name: 'Edwin Tyler',
        picture: 'data:image/gif;base64,replace_with_your_image',
      },
      {
        name: 'Helen Miller',
        picture: 'data:image/gif;base64,replace_with_your_image',
      },
      {
        name: 'Jake Rowland',
        picture: 'data:image/gif;base64,replace_with_your_image',
      },
    ],
    articles: [
      {
        slug: 'making-your-first-steps',
        title: 'Getting started',
        subtitle: 'Making your first steps with our application',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'one week ago',
        author: {
          name: 'Jake Rowland',
          picture: 'data:image/gif;base64,replace_with_your_image',
        },
        content: markdownObject,
      },
      {
        slug: 'configuration-options',
        title: 'Configuration options',
        subtitle: 'Explore configuration options based on your requirements',
        abstract:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quorum altera prosunt, nocent altera. Restinguet citius, si ardentem acceperit inde igitur inquit.',
        updated: 'about 2 days ago',
        author: {
          name: 'Edwin Tyler',
          picture: 'data:image/gif;base64,replace_with_your_image',
        },
        content: markdownObject,
      },
    ],
  },
  {
    slug: 'career-networking',
    icon: 'ph:users-four',
    iconColor: 'success',
    name: 'Career Development and Networking',
    text: 'Grow your career with networking strategies, online presence tips, and ethical job guidance.',
    contributors: [
      {
        name: 'Jake Rowland',
        picture: 'data:image/gif;base64,replace_with_your_image',
      },
      {
        name: 'Helen Miller',
        picture: 'data:image/gif;base64,replace_with_your_image',
      },
    ],
    articles: [
      {
        slug: 'networking-for-career-success',
        title: 'Networking for Career Success',
        subtitle: 'Master the art of networking with effective outreach strategies',
        abstract:
          'Networking is a powerful tool for career advancement. Learn how to effectively reach out to new connections through cold, warm, and hot outreach, and explore tips to expand your professional network.',
        updated: 'recently',
        author: {
          name: 'Your Name',  // Replace with your actual name
          picture: 'data:image/gif;base64,replace_with_your_image',  // Replace with your actual image data
        },
        content: article_career_tips,
      },
      {
        slug: 'optimizing-your-linkedin-profile',
        title: 'Optimizing Your LinkedIn Profile',
        subtitle: 'Enhance your LinkedIn profile to attract recruiters and job opportunities',
        abstract: 'Learn how to optimize your LinkedIn profile to increase visibility and attract recruiters with key tips and strategies.',
        updated: 'recently',
        author: {
          name: 'Your Name',  // Replace with your actual name
          picture: 'data:image/gif;base64,replace_with_your_image',  // Replace with your actual image data
        },
        content: article_linkedin_tips,
      },
      {
        slug: 'finding-your-ideal-next-career',
        title: 'Your Ideal Next Career: How to Find the Right Company',
        subtitle: 'Steps to identify the right company and position that aligns with your career goals',
        abstract: 'Learn how to define your ideal company, identify the right skills for your next position.',
        updated: 'recently',
        author: {
          name: 'Your Name',  // Replace with your actual name
          picture: 'data:image/gif;base64,replace_with_your_image',  // Replace with your actual image data
        },
        content: article_ideal_career,
      }
    ],
  },
  {
    slug: 'job-application-interview',
    icon: 'ph:read-cv-logo',
    iconColor: 'secondary',
    name: 'Job Application and Interview',
    text: 'Expert tips on resumes, cover letters, interviews, and portfolios to boost your job hunt.',
    contributors: [
      {
        name: 'Christina Chu',
        picture: 'data:image/gif;base64,replace_with_your_image',
      },
      {
        name: 'Ina Volkov',
        picture: 'data:image/gif;base64,replace_with_your_image',
      },
      {
        name: 'Pete Jackson',
        picture: 'data:image/gif;base64,replace_with_your_image',
      },
    ],
    articles: [
      {
        slug: 'cover-letters',
        title: 'Cover Letters',
        subtitle: 'Cover Letters: Should You Use Them? When and How to Make Them Work for You',
        abstract:
          'Cover Letters: Should You Use Them? When and How to Make Them Work for You',
        updated: '3 weeks ago',
        author: {
          name: 'Christina Chu',
          picture: 'data:image/gif;base64,replace_with_your_image',
        },
        content: article_cover,
      },
      {
        slug: 'master-application-process',
        title: 'Mastering the Job Application Process',
        subtitle: 'Advanced Tips, Tools, and Strategies for Success',
        abstract:
          'Mastering the Job Application Process: Advanced Tips, Tools, and Strategies for Success',
        updated: 'one week ago',
        author: {
          name: 'Pete Jackson',
          picture: 'data:image/gif;base64,replace_with_your_image',
        },
        content: article_application,
      },
      {
        slug: 'resume-101',
        title: 'Resumes 101: Best Practices',
        subtitle: 'Unlock the Secrets to Crafting a Resume That Stands Out to Recruiters and ATS Systems Alike',
        abstract:
          'Unlock the Secrets to Crafting a Resume That Stands Out to Recruiters and ATS Systems Alike',
        updated: 'one week ago',
        author: {
          name: 'Pete Jackson',
          picture: 'data:image/gif;base64,replace_with_your_image',
        },
        content: article_resume101,
      },
      {
        "slug": "interview-preparation",
        "title": "Interview Preparation: Navigating Different Interview Types",
        "subtitle": "Master the Art of Interviews with Targeted Strategies for Every Interview Type",
        "abstract": "Learn how to excel in various interview formats with targeted strategies and common questions answered.",
        "updated": "one week ago",
        "author": {
          "name": "Pete Jackson",
          "picture": "data:image/gif;base64,replace_with_your_image"
        },
        "content": article_prep
      },
      {
        "slug": "online-portfolio",
        "title": "Creating an Online Portfolio: Your Guide to Building a Personal Website",
        "subtitle": "Build a Professional Online Portfolio That Showcases Your Work and Personal Brand",
        "abstract": "A step-by-step guide to creating a professional online portfolio, including essential elements, tools, and best practices.",
        "updated": "one week ago",
        "author": {
          "name": "Pete Jackson",
          "picture": "data:image/gif;base64,replace_with_your_image"
        },
        "content": article_portfolio
      },
    ],
  },
]
