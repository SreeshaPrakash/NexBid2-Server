export interface CreateFreelancerProfileDTO {
  title: string
  bio: string
  skills: string[]
  experienceInYears: number
  hourlyRate: number
  portfolioUrls?: string[]
  location?: string
  gitHubUrl ?: string
  linkedinUrl ?: string
}

export interface UpdateFreelancerProfileDTO {
  title?: string
  bio?: string
  skills?: string[]
  experienceInYears?: number
  hourlyRate?: number
  portfolioUrls?: string[]
  location?: string
}
