import { Freelancer } from './../../domain/entities/Freelancer';

export class FreelancerMapper {
  static toDomain(raw: any): Freelancer {
    const user = raw.userId; 

    return {
      id: raw._id.toString(),
      userId: user?._id?.toString() || raw.userId,

      email: user?.email || raw.email,
      name: user?.name || raw.name,
      roles: user?.roles || raw.roles || ["FREELANCER"],

      isBlocked: user?.isBlocked ?? raw.isBlocked ?? false,
      isEmailVerified: user?.isEmailVerified ?? raw.isEmailVerified ?? false,
      profileImage: user?.profileImage ?? raw.profileImage ?? null,
      phone: user?.phone ?? raw.phone ?? null,
      country: user?.country ?? raw.country ?? "",
      state: user?.state ?? raw.state ?? "",

      // Freelancer-specific
      title: raw.title ?? "",
      bio: raw.bio ?? "",
      skills: raw.skills ?? [],

      rating: raw.rating ?? 0,
      totalReviews: raw.totalReviews ?? 0,
      completedProjects: raw.completedProjects ?? 0,
      experienceInYears: raw.experienceInYears ?? 0,
      hourlyRate: raw.hourlyRate ?? 0,

      gitHubUrl: raw.gitHubUrl ?? "",
      linkedinUrl: raw.linkedinUrl ?? "",
      portfolio: raw.portfolio ?? "",
      previousWorks: raw.previousWorks ?? [],
      isActive: raw.isActive ?? false,

      status: raw.status ?? 'unverified',
      rejectionReason: raw.rejectionReason,

      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}









// import { Freelancer } from "../../domain/entities/Freelancer";

// export class FreelancerMapper {
//   static toDomain(raw: any): Freelancer {
//     return {
//       id: raw._id.toString(),
//       userId: raw.userId._id.toString(),

//       // User fields
//       name: raw.userId.name,
//       email: raw.userId.email,
//       roles: raw.userId.roles,
//       isBlocked: raw.userId.isBlocked,
//       isEmailVerified: raw.userId.isEmailVerified,
//       profileImage: raw.userId.profileImage,
//       phone: raw.userId.phone,

//       // Freelancer fields
//       title: raw.title,
//       bio: raw.bio,
//       skills: raw.skills,
//       rating: raw.rating,
//       totalReview: raw.totalReview,
//       completedProjects: raw.completedProjects,
//       gitHubUrl: raw.gitHubUrl,
//       linkedinUrl: raw.linkedinUrl,
//       isActive: raw.isActive,
//       status: raw.status,
//       rejectionReason: raw.rejectionReason,

//       createdAt: raw.createdAt,
//       updatedAt: raw.updatedAt,
//     };
//   }
// }
