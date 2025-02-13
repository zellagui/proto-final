export interface Company {
  company_id: string
  url: string
  name: string
  sphere?: string
  followers?: string
  logo?: string
  image?: string
  employeesAmountInLinkedin?: string
  about?: string
  website?: string
  industry?: string
  type?: string
  headquarters?: string
  founded?: string
  specialties?: string | string[]
  updates?: Array<{
    text: string
    timestamp: string
    likes: number
    comments: number
  }>
}
