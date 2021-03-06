export const mockUser: User = {
  id: 8485938374,
  name: 'Joel Lim',
  email: 'joel.lim@candelalabs.io',
  password: 'password',
  tweets: [],
  follows: [],
};

export const COOKIE_NAMES = {
  CURRENT_USER: 'current-user',
  GLOBAL_USERS: 'global-users',
};

export interface ShortUser {
  id: number;
  name: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  tweets: Tweet[];
  follows: string[];
}

export interface Tweet {
  id: string;
  author: ShortUser;
  message: string;
  likes: string[];
  date: Date;
  comments: Comment[];
}

export interface Comment {
  id: number;
  author: ShortUser;
  message: string;
  date: Date;
}

export function generateRandomID() {
  return Math.floor(Math.random() * 100000000);
}
