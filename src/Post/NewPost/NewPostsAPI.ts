import { Env } from "../../Env.ts";
import { User } from "../../User/User.ts";
import { Post } from "../Post.ts";
import { NetworkError, postRequest } from "../../helpers/http.ts";
import { parseToPost } from "./PostFromAPI.ts";

export type NewPostAPIException = "USER_NOT_FOUND" | "INAPPROPRIATE_LANGUAGE" | NetworkError;
export type NewPostsAPI = {
  createNewPost(userId: User["id"], text: string): Promise<Post>;
}

export function createNewPostsAPI(baseUrl: string = Env.loginUrl): NewPostsAPI {
  return {
    async createNewPost(userId: User["id"], text: string): Promise<Post> {
      const response = await postRequest(`${baseUrl}/users/${userId}/timeline`, { text });
      const body = await response.text();
      if (isUserNotFound(response.status, body)) throw "USER_NOT_FOUND";
      if (response.status === 400)  throw "INAPPROPRIATE_LANGUAGE";
      return parseToPost(JSON.parse(body));
    }
  }
}

function isUserNotFound(status: number, body: string): boolean {
  return status === 404 || (status === 400 && body === "User does not exists.");
}
