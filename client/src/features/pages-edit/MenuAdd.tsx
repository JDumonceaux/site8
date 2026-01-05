import { type JSX, startTransition, useCallback } from 'react';

import Input from '@components/ui/input/Input';
import LoadingWrapper from '@components/ui/loading/LoadingWrapper';
import useSnackbar from '@features/app/snackbar/useSnackbar';
import useMenuAdd from '@hooks/useMenuAdd';
/**
 * Represents a form for adding a single menu item.
 *
 * @returns The JSX element representing the MenuAdd component.
 */
const MenuAdd = (): JSX.Element => {
  const { setMessage } = useSnackbar();

  const {
    clearForm,
    error,
    getStandardInputTextAttributes,
    handleInputChange,
    isLoading,
    submitForm,
    validateForm,
  } = useMenuAdd();

  const handleSubmit = useCallback(
    (e: React.FormEvent): void => {
      e.stopPropagation();
      e.preventDefault();
      if (validateForm()) {
        setMessage('Saving...');
        void (async (): Promise<void> => {
          await submitForm();
          startTransition(() => {
            clearForm();
            setMessage('Saved');
          });
        })();
      }
    },
    [clearForm, setMessage, submitForm, validateForm],
  );

  return (
    <LoadingWrapper
      error={error}
      isLoading={isLoading}
    >
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th id="name-header">Name</th>
              <th id="parent-header">Parent</th>
              <th id="seq-header">Seq</th>
              <th id="sortby-header">Sortby</th>
              <th id="type-header">Type</th>
              <th aria-label="save" />
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <Input.Text
                  {...getStandardInputTextAttributes('name')}
                  aria-labelledby="name-header"
                  autoCapitalize="off"
                  inputMode="text"
                  onChange={handleInputChange}
                  required
                  spellCheck
                />
              </td>
              <td>
                <Input.Text
                  {...getStandardInputTextAttributes('parent')}
                  aria-labelledby="parent-header"
                  inputMode="numeric"
                  onChange={handleInputChange}
                  required
                />
              </td>
              <td>
                <Input.Text
                  {...getStandardInputTextAttributes('seq')}
                  aria-labelledby="seq-header"
                  inputMode="numeric"
                  onChange={handleInputChange}
                  required
                />
              </td>
              <td>
                <Input.Text
                  {...getStandardInputTextAttributes('sortby')}
                  aria-labelledby="sortby-header"
                  autoCapitalize="off"
                  inputMode="text"
                  list="sortTypes"
                  onChange={handleInputChange}
                />
                <datalist id="sortTypes">
                  <option
                    aria-label="seq"
                    value="seq"
                  >
                    seq
                  </option>
                  <option
                    aria-label="name"
                    value="name"
                  >
                    name
                  </option>
                </datalist>
              </td>
              <td>
                <Input.Text
                  {...getStandardInputTextAttributes('type')}
                  aria-labelledby="type-header"
                  autoCapitalize="off"
                  inputMode="text"
                  list="menuTypes"
                  onChange={handleInputChange}
                  required
                />
                <datalist id="menuTypes">
                  <option
                    aria-label="menu"
                    value="menu"
                  >
                    menu
                  </option>
                  <option
                    aria-label="root"
                    value="root"
                  >
                    root
                  </option>
                </datalist>
              </td>
              <td>
                <button
                  data-testid="insert-code"
                  type="submit"
                >
                  Save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </LoadingWrapper>
  );
};

export default MenuAdd;
