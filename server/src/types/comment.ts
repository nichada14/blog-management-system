export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    blogId: string;
    userId: string;
    user: {
      id: string;
      username: string;
    };
  }
  