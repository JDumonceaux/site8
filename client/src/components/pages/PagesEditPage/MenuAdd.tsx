import LoadingWrapper from 'components/common/Loading/LoadingWrapper';
import { TextInput } from 'components/form/input';
import useMenuAdd from 'hooks/useMenuAdd';
import useSnackbar from 'hooks/useSnackbar';
import { startTransition, useCallback } from 'react';

/**
 * Represents a form for adding a single menu item.
 *
 * @returns The JSX element representing the MenuAdd component.
 */
const MenuAdd = (): JSX.Element => {
  const { setMessage } = useSnackbar();

  const {
    handleChange,
    getStandardTextInputAttributes,
    submitForm,
    validateForm,
    clearForm,
    error,
    isLoading,
  } = useMenuAdd();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
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
    },
    [validateForm, setMessage, submitForm, clearForm],
  );

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('name', e.target.value);
  };

  const handleChangeParent = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('parent', e.target.value);
  };

  const handleChangeSeq = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('seq', e.target.value);
  };

  const handleChangeSortBy = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('sortby', e.target.value);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange('type', e.target.value);
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
            <th />
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <TextInput
                {...getStandardTextInputAttributes('name')}
                autoCapitalize="off"
                inputMode="text"
                onChange={handleChangeName}
                required
                spellCheck
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes('parent')}
                inputMode="numeric"
                onChange={handleChangeParent}
                required
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes('seq')}
                inputMode="numeric"
                onChange={handleChangeSeq}
                required
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes('sortby')}
                autoCapitalize="off"
                inputMode="text"
                list="sortTypes"
                onChange={handleChangeSortBy}
              />
              <datalist id="sortTypes">
                <option value="seq" />
                <option value="name" />
              </datalist>
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes('type')}
                autoCapitalize="off"
                inputMode="text"
                list="menuTypes"
                onChange={handleChangeType}
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
