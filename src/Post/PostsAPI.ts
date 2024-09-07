import { Env } from "../Env";
import { User } from "../User/User";
import { Post } from "./Post.ts";
import { getRequest, NetworkError, postRequest } from "../helpers/http.ts";

export type NewPostAPIException = "USER_NOT_FOUND" | "INAPPROPRIATE_LANGUAGE" | NetworkError;
export type PostsAPI = {
  createNewPost(userId: User["id"], text: string): Promise<Post>;
  retrieveWall(userId: User["id"]): Promise<Post[]>;
}

export function createPostsAPI(baseUrl: string = Env.loginUrl): PostsAPI {
  return {
    async retrieveWall(userId: User["id"]): Promise<Post[]> {
      const response = await getRequest(`${baseUrl}/users/${userId}/wall`);
      if (response.status === 404) throw "USER_NOT_FOUND";
      const responseBody = await response.json();
      return responseBody.map(parseToPost);
    },
    async createNewPost(userId: User["id"], text: string): Promise<Post> {
      const response = await postRequest(`${baseUrl}/users/${userId}/timeline`, { text });
      if (response.status === 404) throw "USER_NOT_FOUND";
      if (response.status === 400) throw "INAPPROPRIATE_LANGUAGE";
      const responseBody = await response.json()
      return parseToPost(responseBody);
    }
  }
}

type PostFromAPI = {
  postId: string,
  userId: string,
  text: string,
  dateTime: string
}
function parseToPost(postFromAPI: PostFromAPI): Post {
  return {
    id: postFromAPI.postId,
    userId: postFromAPI.userId,
    text: postFromAPI.text,
    dateTime: postFromAPI.dateTime
  }
}