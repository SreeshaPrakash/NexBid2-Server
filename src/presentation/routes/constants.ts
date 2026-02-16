

export enum UserRoute  {
  SIGNUP = "/signup",
  VERIFY_OTP = '/verify-otp',
  LOGIN = '/login',
  RESEND_OTP = '/resend-otp',
  GOOGLE_LOGIN = '/auth/google',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password',
  REFRESH_TOKEN = '/refresh-token',
  SWITCH_ROLE = '/switch-role'

};


export enum AdminRoute  {
  LOGIN = '/login',
  GET_ALL_USERS = '/getAllUsers',
  GET_USER = '/getUserById/:id',
  TOGGLE_BLOCK_STATUS = '/block-status/:id'
  
}

export enum FreelancerRoute  {

  FREELANCER_PROFILE  = '/freelancerProfile',
  VERIFY_REQUEST = '/verify-request'
  
}