export interface CreateFreelancerProfileDTO {
  title: string
  bio: string
  skills: string[]
  experienceInYears: number
  experiences: { title: string; description: string }[]
  portfolio?: string
  gitHubUrl?: string
  linkedinUrl?: string
  previousWorks?: string[]
  name?: string
  email?: string
  country?: string
  state?: string
  phone?: string
  profileImage : string
}

export interface UpdateFreelancerProfileDTO {
  title?: string
  bio?: string
  skills?: string[]
  experienceInYears?: number
  experiences?: { title: string; description: string }[]
  portfolio?: string
  gitHubUrl?: string
  linkedinUrl?: string
  previousWorks?: string[]
  phone?: string
  name?: string
  email?: string
  country?: string
  state?: string
  profileImage ?: string
}

export interface FreelancerDTO {
  id: string;
  userId: string;
  name: string;
  email: string;
  roles: string[];
  isBlocked: boolean;
  isEmailVerified: boolean;
  profileImage?: string;
  phone?: string;
  country?: string;
  state?: string;
  title: string;
  bio: string;
  skills: string[];
  rating: number;
  totalReviews: number;
  completedProjects: number;
  experienceInYears: number;
  experiences: { title: string; description: string }[];
  portfolio?: string;
  previousWorks: string[];
  gitHubUrl?: string;
  linkedinUrl?: string;
  isActive: boolean;
  verificationStatus: 'unverified' | 'pending' | 'verified' | 'rejected';
  rejectionReason?: string;
  createdAt?: Date;
  updatedAt?: Date;
}















