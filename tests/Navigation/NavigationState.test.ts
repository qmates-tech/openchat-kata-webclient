import { renderHook } from '@testing-library/react';
import { useNavigationState } from '../../src/Navigation/NavigationState';
import { wrapWithRouter } from '../utils/renderHelpers';

describe('Navigator State', () => {
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
});
