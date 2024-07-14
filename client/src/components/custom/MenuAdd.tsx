import { LoadingWrapper } from 'components/common/Loading/LoadingWrapper';
import { TextInput } from 'components/form/input';
import useMenuAdd from 'hooks/useMenuAdd';
import useSnackbar from 'hooks/useSnackbar';
import { startTransition, useCallback } from 'react';

const MenuAdd = (): JSX.Element => {
  const {
    handleChange,
    getStandardTextInputAttributes,
    submitForm,
    validateForm,
    clearForm,
    error,
    isLoading,
  } = useMenuAdd();
  const { setSnackbarMessage } = useSnackbar();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (validateForm()) {
        setSnackbarMessage('Saving...');
        startTransition(() => {
          submitForm();
          clearForm();
          setSnackbarMessage('Saved');
        });
      }
    },
    [validateForm, setSnackbarMessage, submitForm, clearForm],
  );

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
                enterKeyHint="next"
                // errorText={getFieldErrors(`parentId${item.id}`)}
                // errorTextShort="Please enter a short title"
                // hasError={hasError(`parentId${item.id}`)}
                inputMode="text"
                onChange={(e) => handleChange('name', e.target.value)}
                required={true}
                spellCheck={true}
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes('parent')}
                autoCapitalize="off"
                enterKeyHint="next"
                // errorText={getFieldErrors(`parentId${item.id}`)}
                // errorTextShort="Please enter a short title"
                // hasError={hasError(`parentId${item.id}`)}
                inputMode="numeric"
                onChange={(e) => handleChange('parent', e.target.value)}
                required={true}
                spellCheck={true}
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes('seq')}
                autoCapitalize="off"
                enterKeyHint="next"
                // errorText={getFieldErrors(`parentId${item.id}`)}
                // errorTextShort="Please enter a short title"
                // hasError={hasError(`parentId${item.id}`)}
                inputMode="numeric"
                onChange={(e) => handleChange('seq', e.target.value)}
                required={true}
                spellCheck={true}
              />
            </td>
            <td>
              <TextInput
                {...getStandardTextInputAttributes('sortby')}
                autoCapitalize="off"
                enterKeyHint="next"
                // errorText={getFieldErrors(`parentId${item.id}`)}
                // errorTextShort="Please enter a short title"
                // hasError={hasError(`parentId${item.id}`)}
                inputMode="numeric"
                list="sortTypes"
                onChange={(e) => handleChange('sortby', e.target.value)}
                required={true}
                spellCheck={true}
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
                enterKeyHint="next"
                // errorText={getFieldErrors(`parentId${item.id}`)}
                // errorTextShort="Please enter a short title"
                // hasError={hasError(`parentId${item.id}`)}
                inputMode="text"
                list="menuTypes"
                onChange={(e) => handleChange('type', e.target.value)}
                required={true}
                spellCheck={true}
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
                type="button">
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
