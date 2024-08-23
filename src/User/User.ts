import { UUID } from "../helpers/uuid";

export type User = {
  readonly id: UUID,
  readonly username: string,
  readonly about: string
}
