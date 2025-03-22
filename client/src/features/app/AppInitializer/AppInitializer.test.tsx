import { render } from '@testing-library/react';

import AppInitializer from './AppInitializer';
import useAppInitializer from './useAppInitializer';

jest.mock('hooks/useAppInitializer');

describe('AppInitializer', () => {
  test('calls useAppInitializer hook', () => {
    render(<AppInitializer />);
    expect(useAppInitializer).toHaveBeenCalled();
  });
});
