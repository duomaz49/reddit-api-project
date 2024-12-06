import type { IComment } from "./Coment"

export interface IPost {
  url: string;
  title: string;
  caption: string;
  permalink: string;
  thumbnail: string;
  created_utc: number;
  author: string;
  comments: IComment[];
}