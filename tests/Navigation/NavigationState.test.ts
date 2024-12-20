import { act, renderHook } from '@testing-library/react';
import { useNavigationState } from '../../src/Navigation/NavigationState';
import { wrapWithRouter } from '../utils/renderHelpers';

describe('NavigationState', () => {
  it('currentPath', async () => {
    const { result } = renderHook(useNavigationState, wrapWithRouter({ path: '/current' }));

    expect(result.current.currentPath).toBe('/current');
    expect(result.current.previousPath).toBe(undefined);
  });

  it('previousPath not present', async () => {
    const { result } = renderHook(useNavigationState, wrapWithRouter({ path: '/' }));

    expect(result.current.previousPath).toBe(undefined);
  });

  it('previousPath present', async () => {
    const { result } = renderHook(useNavigationState, wrapWithRouter({ path: '/current', from: '/previous' }));

    expect(result.current.previousPath).toBe('/previous');
  });

  it('redirect to a route with a path parameter', async () => {
    const { result } = renderHook(useNavigationState, wrapWithRouter({ path: '/original', from: '/' }));

    act(() => result.current.navigateTo({ to: 'userTimeline', pathParams: { userId: 'an-user-id' } }));

    expect(result.current.currentPath).toBe('/users/an-user-id/timeline');
  });
});
