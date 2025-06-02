import { type JSX, startTransition } from 'react';

import LoadingWrapper from 'components/core/Loading/LoadingWrapper';
import Input from 'components/Input/Input';
import useSnackbar from 'features/app/Snackbar/useSnackbar';
import useMenuAdd from 'hooks/useMenuAdd';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (validateForm()) {
      setMessage('Saving...');
      startTransition(() => {
        submitForm();
        clearForm();
        setMessage('Saved');
      });
    }
  };

  return (
    <LoadingWrapper error={error} isLoading={isLoading}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Parent</th>
            <th>Seq</th>
            <th>Sortby</th>
            <th>Type</th>
            <th aria-label="save" />
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <Input.Text
                {...getStandardInputTextAttributes('name')}
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
                inputMode="numeric"
                onChange={handleInputChange}
                required
              />
            </td>
            <td>
              <Input.Text
                {...getStandardInputTextAttributes('seq')}
                inputMode="numeric"
                onChange={handleInputChange}
                required
              />
            </td>
            <td>
              <Input.Text
                {...getStandardInputTextAttributes('sortby')}
                autoCapitalize="off"
                inputMode="text"
                list="sortTypes"
                onChange={handleInputChange}
              />
              <datalist id="sortTypes">
                <option value="seq" />
                <option value="name" />
              </datalist>
            </td>
            <td>
              <Input.Text
                {...getStandardInputTextAttributes('type')}
                autoCapitalize="off"
                inputMode="text"
                list="menuTypes"
                onChange={handleInputChange}
                required
              />
              <datalist id="menuTypes">
                <option value="menu" />
                <option value="root" />
              </datalist>
            </td>
            <td>
              <button
                data-testid="insert-code"
                onClick={handleSubmit}
                type="submit">
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </LoadingWrapper>
  );
};

export default MenuAdd;
