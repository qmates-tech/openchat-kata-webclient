import { vi } from 'vitest';
import * as LinkToMock from "../../src/Navigation/LinkTo";

export function mockLinkTo() {
  const spy = vi.fn(({ children }: LinkToMock.LinkToProps) => <a>{children} </a>)
  vi.spyOn(LinkToMock, "LinkTo").mockImplementation((props) => spy(props));
  return spy;
}
