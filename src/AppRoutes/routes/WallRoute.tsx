import { PostsListStateProvider } from "../../Post/PostsList/PostsListState";
import { WallPage } from "../../Wall/WallPage";
import { PrivateRoute } from "../PrivateRoute";

export const WallRoute = () =>
  <PrivateRoute>
    <PostsListStateProvider>
      <WallPage />
    </PostsListStateProvider>
  </PrivateRoute>
