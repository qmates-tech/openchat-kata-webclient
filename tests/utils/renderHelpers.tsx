import { InitialEntry } from '@remix-run/router';
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserSessionProvider } from '../../src/User/UserSessionState';

export type RouteLocation = { path: string; from?: string; };
export function wrapWithRouter(location: RouteLocation) {
  return {
    wrapper: ({ children }): JSX.Element => (<>
      <MemoryRouter initialEntries={[fromRouteLocation(location)]} >
        {children}
      </MemoryRouter>
    </>)
  }
}

export function wrapWithCustomRoutes(location: RouteLocation, routes: string[]) {
  return {
    wrapper: ({ children }): JSX.Element => (<>
      <MemoryRouter initialEntries={[fromRouteLocation(location)]} >
        <Routes>
          {routes.map((route, index) => {
            if (location.path === route) {
              return <Route key={index} path={route} element={children} />
            }
            return <Route key={index} path={route} element={<div>ROUTE: {route}</div>} />
          })}
        </Routes>
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
    return { pathname: location.path, state: { from: { pathname: location.from } } };
  }
  return { pathname: location.path };
}
