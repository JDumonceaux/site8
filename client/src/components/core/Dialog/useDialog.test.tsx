// useDialog.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useDialog, type UseDialogReturn } from './useDialog';

describe('useDialog hook', () => {
  test('should initialize closed by default', () => {
    expect.assertions(1);

    const { result } = renderHook(() => useDialog());

    expect(result.current.isOpen).toBe(false);
  });

  test('should initialize open when initialOpen is true', () => {
    expect.assertions(1);

    const { result } = renderHook(() => useDialog(true));

    expect(result.current.isOpen).toBe(true);
  });

  test('open() should set isOpen to true', () => {
    expect.assertions(1);

    const { result } = renderHook<unknown, UseDialogReturn>(() => useDialog());
    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  test('close() should set isOpen to false', () => {
    expect.assertions(1);

    const { result } = renderHook<unknown, UseDialogReturn>(() =>
      useDialog(true),
    );
    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  test('toggle() should invert isOpen state', () => {
    expect.assertions(2);

    const { result } = renderHook<unknown, UseDialogReturn>(() =>
      useDialog(false),
    );
    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
