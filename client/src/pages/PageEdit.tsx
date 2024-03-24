import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { Button } from 'components/ui/Form/Button';

import { TextArea } from 'components/ui/Form/TextArea';
import { TextInput } from 'components/ui/Form/TextInput';
import { TwoColumn } from 'components/ui/TwoColumn';
import usePageEdit from 'services/hooks/usePageEdit';
import { ModalProcessing } from 'components/common/ModalProcessing';
import { ClearAll } from 'components/ui/Form/ClearAll';
import { Meta } from 'components/common/Meta';
import { PageTitle } from 'components/common/PageTitle';
import { styled } from 'styled-components';

export const PageEdit = (): JSX.Element => {
  const params = useParams();
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    formValues,
    isProcessing,
    getFieldErrors,
    hasError,
    handleClear,
    handleCancel,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
  } = usePageEdit();

  useEffect(() => {
    const tempId = params.id;
    if (tempId) {
      const id = parseInt(tempId);
      if (!isNaN(id) || id > 0) {
        setFieldValue('id', id);
      }
    }
  }, [params.id, setFieldValue]);

  return (
    <>
      <Meta title="Page Edit" />
      <StyledMain>
        {/* <LoadingWrapper error={error} isLoading={isLoading}> */}
        <PageTitle title="Page Edit" />
        <section className="section">
          <form noValidate onSubmit={handleSubmit}>
            <ClearAll onClear={handleClear}>
              <NavLink to="/admin/pages">List</NavLink>
              <button onClick={handleReset} type="reset">
                Reset
              </button>
            </ClearAll>
            <TextInput
              autoCapitalize="off"
              enterKeyHint="next"
              errorText={getFieldErrors('name')}
              errorTextShort="Please enter a short title"
              hasError={hasError('name')}
              helpText="Required"
              id="name"
              inputMode="text"
              label="Short Title"
              maxLength={30}
              onChange={handleChange}
              showCounter
              spellCheck={true}
              value={formValues.name}
              // required={true}
              //ref={focusElement}
            />
            <TextInput
              errorText={getFieldErrors('long_title')}
              errorTextShort="Please enter a title"
              hasError={hasError('long_title')}
              helpText="Required"
              id="long_title"
              label="Long Title"
              maxLength={250}
              onChange={handleChange}
              showCounter
              spellCheck={true}
              value={formValues.long_title}
              // required={true}
            />

            <TextArea
              errorText={getFieldErrors('text')}
              hasError={hasError('text')}
              id="text"
              label="Text"
              onChange={handleChange}
              rows={10}
              showCounter
              spellCheck={true}
              value={formValues.text}
              // required={true}
            />
            <TextInput
              errorText={getFieldErrors('edit_date_display')}
              errorTextShort="Please enter a date"
              hasError={hasError('edit_date_display')}
              id="edit_date_display"
              label="Edit Date"
              maxLength={10}
              onChange={handleChange}
              showCounter
              spellCheck={false}
              value={formValues.edit_date_display}

              // required={true}
            />
            {/* <Checkbox
              label="Resources"
              id="resources"
              checked={formValues.resources}
              onChange={handleChange}
            /> */}
            <TextInput
              errorText={getFieldErrors('parent')}
              errorTextShort="Please enter a parent"
              hasError={hasError('parent')}
              id="parent"
              label="Parent"
              onChange={handleChange}
              showCounter
              value={formValues.parent}
            />
            <TextInput
              errorText={getFieldErrors('reading_time')}
              hasError={hasError('reading_time')}
              id="reading_time"
              label="Reading Time"
              onChange={handleChange}
              showCounter
              value={formValues.reading_time}
            />
            <TextInput
              errorText={getFieldErrors('readability_score')}
              hasError={hasError('readability_score')}
              id="readability_score"
              label="Readability Score"
              onChange={handleChange}
              showCounter
              value={formValues.readability_score}
            />
            <TwoColumn includeGap includeMargin>
              <Button id="cancel" onClick={handleCancel} variant="secondary">
                Cancel
              </Button>
              <Button id="submit" type="submit">
                {isProcessing ? 'Processing' : 'Submit'}
              </Button>
            </TwoColumn>
          </form>
        </section>
        {/* </LoadingWrapper> */}
      </StyledMain>
      <ModalProcessing isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default PageEdit;

const StyledMain = styled.main`
  background-color: #fff;
  background-size: contain;
`;
