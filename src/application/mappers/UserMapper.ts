
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
    country: user.country ?? "",
    state: user.state ?? "",
    roles,
    role: roles[0],

    status: user.isBlocked ? "block" : "active",
    isEmailVerified: user.isEmailVerified,
    isBlocked: user.isBlocked,

    profileImage: user.profileImage,

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
