export interface User {
    id: string;
    username: string;
    email: string;
  }
  
  export interface RegisterPayload {
    username: string;
    email: string;
    password: string;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;  // JWT token
    user: User;
  }
  