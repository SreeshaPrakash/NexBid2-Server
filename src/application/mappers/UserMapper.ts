
import { UserDto } from "../dto/client.dto";
import { AdminUserListDto } from "../dto/admin.dto";

export const mapUserToDto = (user: any): UserDto => {
  const roles = user.roles ?? [];

  return {
    id: user.id || user._id?.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    country: user.country ?? "",
    state: user.state ?? "",
    roles,
    role: roles[0],

    status: user.isBlocked ? "block" : "active",
    isEmailVerified: user.isEmailVerified ?? false,
    isBlocked: user.isBlocked ?? false,

    profileImage: user.profileImage,

    createdAt: user.createdAt,
    updatedAt: user.updatedAt,

    isAdmin: roles.includes("admin"),
  };
};

export const mapUsersToDto = (users: any[]): UserDto[] =>
  users.map(mapUserToDto);

export const mapUserToAdminListDto = (
  user: any
): AdminUserListDto => ({
  id: user.id || user._id?.toString(),
  name: user.name,
  email: user.email,
  roles: user.roles ?? [],
  isVerified: user.isEmailVerified ?? false,
  isBlocked: user.isBlocked ?? false,
  createdAt: user.createdAt ?? new Date(),
});

export const mapUsersToAdminListDTO = (
  users: any[]
): AdminUserListDto[] =>
  users.map(mapUserToAdminListDto);

