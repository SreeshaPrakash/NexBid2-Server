export interface CreateFreelancerProfileDTO {
  title: string
  bio: string
  skills: string[]
  experienceInYears: number
  hourlyRate: number
  portfolio?: string
  gitHubUrl?: string
  linkedinUrl?: string
  previousWorks?: string[]
  phone?: string
  name?: string
  email?: string
  country?: string
  state?: string
}

export interface UpdateFreelancerProfileDTO {
  title?: string
  bio?: string
  skills?: string[]
  experienceInYears?: number
  hourlyRate?: number
  portfolio?: string
  gitHubUrl?: string
  linkedinUrl?: string
  previousWorks?: string[]
  phone?: string
  name?: string
  email?: string
  country?: string
  state?: string
}













