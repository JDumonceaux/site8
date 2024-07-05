import { LoadingWrapper } from 'components/common/Loading/LoadingWrapper';
import { TextInput } from 'components/form/input';
import useMenuEdit from 'hooks/useMenuEdit';
import useSnackbar from 'hooks/useSnackbar';
import { startTransition, useCallback } from 'react';

const MenuAdd = (): JSX.Element => {
  const {
    handleChange,
    handleSave,
    getStandardTextInputAttributes,
    validateForm,
    error,
    isLoading,
  } = useMenuEdit();
  const { setSnackbarMessage } = useSnackbar();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (validateForm()) {
        setSnackbarMessage('Saving...');
        startTransition(() => {
          handleSave();
          setSnackbarMessage('Saved');
        });
      }
    },
    [validateForm, setSnackbarMessage, handleSave],
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
                onChange={(e) => handleChange('sortby', e.target.value)}
                required={true}
                spellCheck={true}
              />
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
