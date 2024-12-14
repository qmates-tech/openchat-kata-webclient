import { PostsListStateProvider } from "../../Post/PostsList/PostsListState";
import { YourTimelinePage } from "../../Timeline/YourTimelinePage";
import { PrivateRoute } from "../PrivateRoute";

export const YourTimelineRoute = () =>
  <PrivateRoute>
    <PostsListStateProvider>
      <YourTimelinePage />
    </PostsListStateProvider>
  </PrivateRoute>
