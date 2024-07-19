import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { LinkTo } from "../../src/Navigation/LinkTo";
import { wrapWithCustomRoutes } from '../utils/renderHelpers';

describe("LinkTo", () => {
  it("redirect to the login route", async () => {
    render(<LinkTo to="login">LINK</LinkTo>, wrapWithCustomRoutes({ path: "/" }, ["/", "/login"]));

    userEvent.click(screen.getByText("LINK"));

    expect(await screen.findByText("ROUTE: /login")).toBeInTheDocument();
  });

  it("redirect to the home route", async () => {
    render(<LinkTo to="wall">LINK</LinkTo>, wrapWithCustomRoutes({ path: "/login" }, ["/", "/login"]));

    userEvent.click(screen.getByText("LINK"));

    expect(await screen.findByText("ROUTE: /")).toBeInTheDocument();
  });
});
