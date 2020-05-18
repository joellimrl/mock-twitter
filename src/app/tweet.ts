export interface Tweet {
  author: string;
  message: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  author: string;
  message: string;
}