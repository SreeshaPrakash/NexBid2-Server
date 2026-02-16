
export interface RegisterDTO {
  name: string
  email: string
  password: string
  // phone ?: number
}


export interface VerifyOtpDTO {
  email: string;
  otp: string;
}


export interface VerifyOtpResponse {
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
    isEmailVerified: boolean;
  };
  //   accessToken: string;
  //   refreshToken: string;
}


export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
    isEmailVerified: boolean
  },
  accessToken: string;
  refreshToken: string
}


export interface AuthResponse {
  success: boolean;
  message: string;
  data?: any;
}


export interface GoogleLoginResponse {
  user: {
    id: string
    email: string
    name: string
    roles: string[]
    isEmailVerified: boolean
  }
  accessToken: string,
  refreshToken: string,
  isNewUser: boolean
}

export interface ResetPasswordDTO {
  email: string,
  otp: string,
  newPassword: string
}


export interface RefreshTokenResponse {
  accessToken: string,
  refreshToken: string
}

export interface SwitchRoleResponse {
  accessToken: string,
  refreshToken: string,
  hasProfile: boolean
}


export interface UserDto {
  id: string;
  name: string;
  email: string;
  phone?: number;
  role?: "client" | "freelancer" | "admin";
  roles: string[];
  status?: "active" | "block";
  isEmailVerified?: boolean;
  isBlocked?: boolean;
  imageUrl?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  isAdmin?: boolean;
}