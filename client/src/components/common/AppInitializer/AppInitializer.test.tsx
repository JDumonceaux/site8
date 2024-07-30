import { render } from '@testing-library/react';
import useAppInitializer from 'hooks/useAppInitializer';
import { describe, expect, test } from 'vitest';
import AppInitializer from './AppInitializer';

jest.mock('hooks/useAppInitializer');

describe('AppInitializer', () => {
  test('calls useAppInitializer hook', () => {
    render(<AppInitializer />);
    expect(useAppInitializer).toHaveBeenCalled();
  });
});
