/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum UserRoute {
  SIGNUP = "/signup",
  VERIFY_OTP = '/verify-otp',
  LOGIN = '/login',
  RESEND_OTP = '/resend-otp',
  GOOGLE_LOGIN = '/auth/google',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/api/reset-password',
  REFRESH_TOKEN = '/refresh-token',
  SWITCH_ROLE = '/switch-role',
  LOGOUT = '/logout'
};

export enum AdminRoute {
  LOGIN = '/login',
  GET_ALL_USERS = '/getAllUsers',
  GET_USER = '/getUserById/:id',
  TOGGLE_BLOCK_STATUS = '/block-status/:id',
  VERIFICATION_REQUESTS = '/verification-requests',
  APPROVE_VERIFICATION = '/approve-verification/:freelancerId',
  REJECT_VERIFICATION = '/reject-verification/:freelancerId',
  GET_FREELANCER_PROFILE = '/freelancer-profile/:id',
  LOGOUT = '/logout'
}

export enum FreelancerRoute {
  FREELANCER_PROFILE = '/freelancerProfile',
  VERIFY_REQUEST = '/verify-request',
  DASHBOARD_STATS = '/dashboard-stats'
}

export enum ClientRoute {
  CLIENTPROFILE = '/clientprofile',
  DASHBOARD_STATS = '/dashboard-stats'
}

export enum ProjectRoute {
    CREATE = "/create",
    GET_CLIENT_PROJECTS = "/list",
    GET_OPEN_PROJECTS = "/openProjects",
    GET_PROJECT_BY_ID = "/:projectId",
    UPDATE = "/update/:projectId",
    DELETE = "/:projectId",
    EXTEND = "/extend/:projectId",
    FETCH_BIDS = "/:projectId/bids",
    PLACE_BID = "/:projectId/bids",
    MY_BID = "/:projectId/my-bid",
    WITHDRAW_BID = "/bids/:bidId/withdraw",
    UPDATE_BID = "/bids/:bidId"
}
