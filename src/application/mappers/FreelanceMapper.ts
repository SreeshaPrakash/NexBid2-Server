import { Freelancer } from "../../domain/entities/Freelancer";

import { FreelancerDTO } from "../dto/freelancer.dto";

export class FreelancerMapper {
  static toDomain(raw: any): Freelancer {
    return {
      id: raw._id.toString(),
      userId: raw.userId._id.toString(),

      // User fields
      name: raw.userId.name,
      email: raw.userId.email,
      roles: raw.userId.roles,
      isBlocked: raw.userId.isBlocked,
      isEmailVerified: raw.userId.isEmailVerified,
      profileImage: raw.userId.profileImage,
      phone: raw.userId.phone,
      country: raw.userId.country,
      state: raw.userId.state,

      // Freelancer fields
      title: raw.title,
      bio: raw.bio,
      skills: raw.skills,
      rating: raw.rating,
      totalReviews: raw.totalReviews,
      completedProjects: raw.completedProjects,
      experienceInYears: raw.experienceInYears,
      experiences: raw.experiences || [],
      portfolio: raw.portfolio,
      previousWorks: raw.previousWorks,
      gitHubUrl: raw.gitHubUrl,
      linkedinUrl: raw.linkedinUrl,
      isActive: raw.isActive,
      verificationStatus: raw.verificationStatus,
      rejectionReason: raw.rejectionReason,

      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }

  static toDto(freelancer: Freelancer): FreelancerDTO {
    return {
      id: freelancer.id,
      userId: freelancer.userId,
      name: freelancer.name,
      email: freelancer.email,
      roles: freelancer.roles || [],
      isBlocked: freelancer.isBlocked,
      isEmailVerified: freelancer.isEmailVerified,
      profileImage: freelancer.profileImage,
      phone: freelancer.phone,
      country: freelancer.country,
      state: freelancer.state,
      title: freelancer.title,
      bio: freelancer.bio,
      skills: freelancer.skills || [],
      rating: freelancer.rating || 0,
      totalReviews: freelancer.totalReviews || 0,
      completedProjects: freelancer.completedProjects || 0,
      experienceInYears: freelancer.experienceInYears,
      experiences: freelancer.experiences || [],
      portfolio: freelancer.portfolio,
      previousWorks: freelancer.previousWorks || [],
      gitHubUrl: freelancer.gitHubUrl,
      linkedinUrl: freelancer.linkedinUrl,
      isActive: freelancer.isActive,
      verificationStatus: freelancer.verificationStatus,
      rejectionReason: freelancer.rejectionReason,
      createdAt: freelancer.createdAt,
      updatedAt: freelancer.updatedAt,
    };
  }

  static toDtoList(freelancers: Freelancer[]): FreelancerDTO[] {
    return freelancers.map(this.toDto);
  }
}

