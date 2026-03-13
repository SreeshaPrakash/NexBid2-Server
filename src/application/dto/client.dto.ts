import { UserRole } from "../../domain/entities/User";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: "client" | "freelancer" | "admin";
  roles: string[];
  status?: "active" | "block";
  isEmailVerified?: boolean;
  isBlocked?: boolean;
  country : string;
  state : string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isAdmin?: boolean;
}



