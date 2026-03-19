import { Freelancer } from "../../domain/entities/Freelancer";

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
      hourlyRate: raw.hourlyRate,
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
}
