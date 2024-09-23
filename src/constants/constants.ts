export const Colors = {
  PRIMARYBLUE: '#003366',
  PRIMARYGREEN: '#016433',
  PRIMARYRED: '#FF0000',
  PRIMARYSLATE: '#718096',
};
export enum NavbarTitles {
  HOME = 'Home',
  PLANNING = 'Planning',
  STATISTICS = 'Statistics',
  SETTINGS = 'Settings',
  CONTACT = 'Contact',
  SIGNUPNOW = 'Sign Up Now',
  SIGNIN = 'Sign In',
}

export enum Pages {
  HOME = '/',
  PLANNING = '/planning',
  STATISTICS = '/statistics',
  SETTINGS = '/settings',
  TASKS = '/tasks',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  FORGOTPASSWORD = '/signin/forgotpassword',
  NEWPASSWORD = '/signin/forgotpassword/newpassword',
  CONTACT = '/contact',
}
export interface SignUpErrors {
  firstName: string;
  surName: string;
  countryName: string;
  phoneNumber: string;
  email: string;
  countryCode: string;
}
export interface SignInErrors {
  email: string;
  password: string;
}
export interface ForgotPasswordErrors {
  password: string;
  confirmPassword: string;
}
