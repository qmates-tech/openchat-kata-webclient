import { UUID } from "../helpers/uuid";

export type Post = {
  readonly id: UUID,
  readonly userId: UUID,
  readonly text: string
  readonly dateTime: string
}
