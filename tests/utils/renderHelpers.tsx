import { InitialEntry } from '@remix-run/router';
import { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserSessionProvider } from '../../src/User/UserSessionState';

export type RouteLocation = { path: string; from?: string; };
export function wrapWithRouter(location: RouteLocation) {
  return {
    wrapper: ({ children }: WrapperProps): ReactNode => (<>
      <MemoryRouter initialEntries={[fromRouteLocation(location)]} >
        {children}
      </MemoryRouter>
    </>)
  }
}

export function wrapWithCustomRoutes(location: RouteLocation, routes: string[]) {
  return {
    wrapper: ({ children }: WrapperProps): ReactNode => (<>
      <MemoryRouter initialEntries={[fromRouteLocation(location)]} >
        {children}
        <Routes>
          {routes.map((route, index) => <Route key={index} path={route} element={<div>ROUTE: {route}</div>} />)}
        </Routes>
      </MemoryRouter>
    </>)
  }
}

export function wrapWithUserSession() {
  return {
    wrapper: ({ children }: WrapperProps): ReactNode => (<UserSessionProvider>{children}</UserSessionProvider>)
  }
}

type WrapperProps = { children: ReactNode; };

function fromRouteLocation(location: RouteLocation): InitialEntry {
  if (location.from) {
    return { pathname: location.path, state: { from: { pathname: location.from } } };
  }
  return { pathname: location.path };
}
