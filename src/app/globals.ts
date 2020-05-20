export const mockUser: User = {
  name: 'Joel',
  email: 'e',
  password: 'e',
  tweets: [],
  follows: [],
};
export class Globals {
  public static currentUser: ShortUser = null;
  // TODO Cache the users, convert to User[], move tweets to individual user.
}

export const COOKIE_NAMES = {
  CURRENT_USER: 'current-user',
  GLOBAL_USERS: 'global-users',
};

export interface ShortUser {
  name: string;
  email: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  tweets: Tweet[];
  follows: string[];
}

export interface Tweet {
  id: number;
  author: ShortUser;
  message: string;
  likes: string[];
  date: Date;
  comments: Comment[];
}

export interface Comment {
  author: ShortUser;
  message: string;
  date: Date;
}
