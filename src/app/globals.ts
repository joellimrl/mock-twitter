import { Tweet } from './tweet';

export class Globals{
    public static loginStatus:boolean = false;
    public static user:string = "";
    public static users = [{user: "admin", password: "password"}]

    public static tweets: Tweet[] = [];
}