import { PostsListStateProvider } from "../../Post/PostsList/PostsListState";
import { UserTimelinePage } from "../../Timeline/UserTimelinePage";
import { PrivateRoute } from "../PrivateRoute";

export const UserTimelineRoute = () =>
  <PrivateRoute>
    <PostsListStateProvider>
      <UserTimelinePage />
    </PostsListStateProvider>
  </PrivateRoute>
