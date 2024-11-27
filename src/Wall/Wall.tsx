import { textAsParagraphs } from "../helpers/textAsParagraphs.tsx";
import { NewPostForm } from "../Post/NewPost/NewPostForm.tsx";
import { useNewPostState } from "../Post/NewPost/NewPostState.ts";
import { PostsList } from "../Post/PostsList/PostsList.tsx";
import { User } from "../User/User.ts";
import { SideGrid } from "./SideGrid.tsx";
import { useWallPostsState } from "./WallPostState.ts";

interface WallProps {
  user: User
}

export function Wall({ user }: WallProps) {
  const createPostState = useNewPostState(user.id);
  const wallPostsState = useWallPostsState(user.id);

  return <article className="wall">
    <header>
      <h3>{user.username}'s wall</h3>
    </header>
    <SideGrid sideBar={textAsParagraphs(user.about)}>
      <NewPostForm {...createPostState} />
      <PostsList posts={wallPostsState.wall} isLoading={wallPostsState.isLoading} />
    </SideGrid>
  </article>;
}

