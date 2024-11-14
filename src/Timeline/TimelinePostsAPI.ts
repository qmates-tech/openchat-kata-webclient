import { Env } from "../Env";
import { User } from "../User/User";
import { Post } from "../Post/Post.ts";
import { getRequest } from "../helpers/http.ts";
import { parseToPost } from "../Post/NewPost/PostFromAPI.ts";

export type TimelinePostsAPI = {
  retrieveTimeline(userId: User["id"]): Promise<Post[]>;
}

export function createTimelinePostsAPI(baseUrl: string = Env.loginUrl): TimelinePostsAPI {
  return {
    async retrieveTimeline(userId: User["id"]): Promise<Post[]> {
      const response = await getRequest(`${baseUrl}/users/${userId}/timeline`);
      if (response.status === 404) throw "USER_NOT_FOUND";
      const responseBody = await response.json();
      return responseBody.map(parseToPost);
    }
  }
}
