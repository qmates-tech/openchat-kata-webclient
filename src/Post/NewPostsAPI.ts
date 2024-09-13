import { Env } from "../Env";
import { User } from "../User/User";
import { Post } from "./Post.ts";
import { NetworkError, postRequest } from "../helpers/http.ts";
import { parseToPost } from "./PostFromAPI.ts";

export type NewPostAPIException = "USER_NOT_FOUND" | "INAPPROPRIATE_LANGUAGE" | NetworkError;
export type NewPostsAPI = {
  createNewPost(userId: User["id"], text: string): Promise<Post>;
}

export function createNewPostsAPI(baseUrl: string = Env.loginUrl): NewPostsAPI {
  return {
    async createNewPost(userId: User["id"], text: string): Promise<Post> {
      const response = await postRequest(`${baseUrl}/users/${userId}/timeline`, { text });
      if (response.status === 404) throw "USER_NOT_FOUND";
      if (response.status === 400) throw "INAPPROPRIATE_LANGUAGE";
      const responseBody = await response.json()
      return parseToPost(responseBody);
    }
  }
}
