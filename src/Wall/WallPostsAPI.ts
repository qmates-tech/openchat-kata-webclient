import { Env } from "../Env";
import { getRequest } from "../helpers/http.ts";
import { parseToPost } from "../Post/NewPost/PostFromAPI.ts";
import { Post } from "../Post/Post.ts";
import { User } from "../User/User";

export type WallPostsAPI = {
  retrieveWall(userId: User["id"]): Promise<Post[]>;
}

export function createWallPostsAPI(baseUrl: string = Env.loginUrl): WallPostsAPI {
  return {
    async retrieveWall(userId: User["id"]): Promise<Post[]> {
      const response = await getRequest(`${baseUrl}/users/${userId}/wall`);
      if (response.status === 404) throw "USER_NOT_FOUND";
      const responseBody = await response.json();
      return responseBody.map(parseToPost);
    }
  }
}
