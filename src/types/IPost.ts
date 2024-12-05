import { IComment } from "./Coment"

export interface IPost {
  url: string;
  title: string;
  caption: string;
  permalink: string;
  comments: IComment[];
}