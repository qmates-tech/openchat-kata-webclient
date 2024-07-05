import { InitialEntry } from '@remix-run/router';
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserSessionProvider } from '../../src/User/UserSessionState';

export type RouteLocation = { path: string; from?: string; }
export function wrapWithRouter(location: RouteLocation, routes?: string[]) {
  return {
    wrapper: ({ children }): JSX.Element => (<>
      <MemoryRouter initialEntries={[fromRouteLocation(location)]} >
        {routes && <Routes>
          {routes.map((route, index) => <Route key={index} path={route} element={<div>{route}</div>} />)}
        </Routes>}
        {children}
      </MemoryRouter>
    </>)
  }
}

export function wrapWithUserSession() {
  return {
    wrapper: ({ children }): JSX.Element => (<UserSessionProvider>{children}</UserSessionProvider>)
  }
}

function fromRouteLocation(location: RouteLocation): InitialEntry {
  if (location.from) {
    return { pathname: location.path, state: { from: { pathname: location.from } } }
  }
  return { pathname: location.path }
}