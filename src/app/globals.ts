import { Tweet } from './tweet';

export const mockUser: User = {
  name: 'Joel',
  email: 'e',
  password: 'e',
  tweets: [],
  follows: ['e'],
};
export class Globals {
  public static loginStatus = false;
  public static currentUser: User;
  // TODO Cache the users, convert to User[], move tweets to individual user.
  public static users: User[] = [mockUser];

  // public static tweets: Tweet[] = [];

  public static COOKIE_NAMES: {} = {
    CURRENT_USER: 'current-user',
    LOGIN_STATUS: 'login-status',
    GLOBAL_USERS: 'global-users',
  };
}

export const COOKIE_NAMES = {
  CURRENT_USER: 'current-user',
  LOGIN_STATUS: 'login-status',
  GLOBAL_USERS: 'global-users',
};

export interface CurrentUser {
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
