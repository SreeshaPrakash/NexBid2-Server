


// import { UserDto } from "../../dto/auth.dto";
// import { User } from "../../../domain/entities/User";
// import { AdminUserListDto } from "../../dto/admin.dto";


// export const mapUserToDto = (user: User | any): UserDto => {
//   const roles = user.roles || [];

//   return {
//     id: user._id?.toString() || user.id,
//     name: user.name,
//     email: user.email,
//     phone: user.phone,

//     roles,

//     // role: user.role,
//     role: roles[0],

//     // roles: user.roles,
//     status: user.isBlocked ? "block" : "active",
//     isEmailVerified: user.isEmailVerified,
//     isBlocked: user.isBlocked,

//     profileImage: user.profileImage,
//     imageUrl: user.imageUrl ?? user.profileImage,

//     createdAt: user.createdAt,
//     updatedAt: user.updatedAt,
//     lastLogin: user.lastLogin,

//     // isAdmin: user.role === "admin",
//     isAdmin: roles.includes("admin"),
//   };
// };



// export const mapUsersToDto = (users: (User | any)[]): UserDto[] => {
//   return users.map(mapUserToDto);
// };


// export const mapUserToAdminListDto = (user: User | any): AdminUserListDto => {
//   return {
//     id: user._id?.toString() || user.id,
//     name: user.name,
//     email: user.email,
//     roles: user.roles || [],
//     isVerified: user.isEmailVerified ?? false,
//     isBlocked: user.isBlocked ?? false,
//     createdAt: user.createdAt,
//   }
// }

// export const mapUsersToAdminListDTO = (
//   users: (User | any[])
// ): AdminUserListDto[] => {
//   if (!Array.isArray(users)) return [];
//   return users.map(mapUserToAdminListDto)
// }













import { UserDto } from "../dto/client.dto";
import { User } from "../../domain/entities/User";
import { AdminUserListDto } from "../dto/admin.dto";

export const mapUserToDto = (user: User): UserDto => {
  const roles = user.roles ?? [];

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,

    roles,
    role: roles[0],

    status: user.isBlocked ? "block" : "active",
    isEmailVerified: user.isEmailVerified,
    isBlocked: user.isBlocked,

    profileImage: user.profileImage,
    // imageUrl: user.profileImage,

    createdAt: user.createdAt,
    updatedAt: user.updatedAt,

    isAdmin: roles.includes("admin"),
  };
};

export const mapUsersToDto = (users: User[]): UserDto[] =>
  users.map(mapUserToDto);

export const mapUserToAdminListDto = (
  user: User
): AdminUserListDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  roles: user.roles ?? [],
  isVerified: user.isEmailVerified ?? false,
  isBlocked: user.isBlocked ?? false,
  createdAt: user.createdAt ?? new Date(),
});

export const mapUsersToAdminListDTO = (
  users: User[]
): AdminUserListDto[] =>
  users.map(mapUserToAdminListDto);
