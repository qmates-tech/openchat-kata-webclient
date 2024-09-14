import { Post } from "../Post.ts";

export type PostFromAPI = {
  postId: string,
  userId: string,
  text: string,
  dateTime: string
}

export function parseToPost(postFromAPI: PostFromAPI): Post {
  return {
    id: postFromAPI.postId,
    userId: postFromAPI.userId,
    text: postFromAPI.text,
    dateTime: postFromAPI.dateTime
  }
}
