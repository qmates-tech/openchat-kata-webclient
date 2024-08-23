import { Env } from "../Env";
import { User } from "../User/User";
import { Post } from "./Post.ts";
import { NetworkError, postRequest } from "../helpers/http.ts";

export type CreatePostAPIException = "USER_NOT_FOUND" | "INAPPROPRIATE_LANGUAGE" | NetworkError;
export type CreatePostAPI = {
  createPost(userId: User["id"], text: string): Promise<Post>;
}

export function createCreatePostAPI(baseUrl: string = Env.loginUrl): CreatePostAPI {
  return {
    async createPost(userId: User["id"], text: string): Promise<Post> {
      const response = await postRequest(`${baseUrl}/users/${userId}/timeline`, { text });

      const responseBody = await response.json();
      return {
        id: responseBody.postId,
        userId: responseBody.userId,
        text: responseBody.text,
        dateTime: responseBody.dateTime
      }
    }
  }
}
