import { Env } from "../Env";
import { User } from "../User/User";
import { Post } from "./Post.ts";
import { NetworkError, postRequest } from "../helpers/http.ts";

export type NewPostAPIException = "USER_NOT_FOUND" | "INAPPROPRIATE_LANGUAGE" | NetworkError;
export type PostsAPI = {
  createNewPost(userId: User["id"], text: string): Promise<Post>;
}

export function createPostsAPI(baseUrl: string = Env.loginUrl): PostsAPI {
  return {
    async createNewPost(userId: User["id"], text: string): Promise<Post> {
      const response = await postRequest(`${baseUrl}/users/${userId}/timeline`, { text });

      if (response.status === 404) {
        throw "USER_NOT_FOUND";
      }

      if (response.status === 400) {
        throw "INAPPROPRIATE_LANGUAGE";
      }

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
