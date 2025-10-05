export interface Blog {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    authorId: string;
    author: {
      id: string;
      username: string;
    };
  }
  