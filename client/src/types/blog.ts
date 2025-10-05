export interface User {
    id: string;
    username: string;
  }
  
  export interface Blog {
    comments: Comment[];
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: string;
    updatedAt?: string;
  }

  export type BlogCreatePayload = {
    title: string;
    content: string;
  };
  
  export type BlogUpdatePayload = {
    title: string;
    content: string;
  };
  