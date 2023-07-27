export type PostType = {
  title: string;
  id: string;
  updatedAt: string;
  user: {
    email: string;
    name: string;
    id: string;
    image: string;
  };
  Comment: {
    createdAt: string;
    id: string;
    postId: string;
    userId: string;
    title: string;
    user: {
      email: string;
      name: string;
      id: string;
      image: string;
    };
  }[];
};
