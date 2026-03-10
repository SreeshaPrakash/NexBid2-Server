import { UserRole } from "../../domain/entities/User";

export interface UserDto {
  id: string;
  name: string;
  email: string;
  phone?: number;
    role?: "client" | "freelancer" | "admin";
    roles: string[];
//   roles : UserRole[]
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



