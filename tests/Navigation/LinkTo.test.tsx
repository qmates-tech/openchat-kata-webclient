import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { LinkTo } from "../../src/Navigation/LinkTo";
import { wrapWithCustomRoutes } from '../utils/renderHelpers';

describe("LinkTo", () => {
  it("redirect to the login route", async () => {
    render(<LinkTo to="login">LINK</LinkTo>, wrapWithCustomRoutes({ path: "/" }, ["/", "/login"]));

    await userEvent.click(screen.getByText("LINK"));

    expect(screen.getByText("ROUTE: /login")).toBeInTheDocument();
  });

  it("redirect to the home route", async () => {
    render(<LinkTo to="wall">LINK</LinkTo>, wrapWithCustomRoutes({ path: "/login" }, ["/", "/login"]));

    await userEvent.click(screen.getByText("LINK"));

    expect(screen.getByText("ROUTE: /")).toBeInTheDocument();
  });
});
