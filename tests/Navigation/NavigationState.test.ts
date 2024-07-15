import { cleanup, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useNavigationState } from '../../src/Navigation/NavigationState';
import { RouteLocation, wrapWithCustomRoutes } from '../utils/renderHelpers';

describe('Navigator State', () => {
  beforeEach(() => {
    cleanup();
  });

  it('currentPath', async () => {
    const { result } = renderHook(useNavigationState, withRouter({ path: '/current' }));

    expect(result.current.currentPath).toBe('/current');
    expect(result.current.previousPath).toBe(undefined);
  });

  it('previousPath not present', async () => {
    const { result } = renderHook(useNavigationState, withRouter({ path: '/' }));

    expect(result.current.previousPath).toBe(undefined);
  });

  it('previousPath present', async () => {
    const { result } = renderHook(useNavigationState, withRouter({ path: '/current', from: '/previous' }));

    expect(result.current.previousPath).toBe('/previous');
  });
});

function withRouter(location: RouteLocation) {
  return wrapWithCustomRoutes(location, ['/', '/first', '/second', '/third', '/current']);
}
