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

export const PageEdit = (): JSX.Element => {
  const title = 'Page Edit';

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
      <Meta title={title} />
      <main className="main-content">
        {/* <LoadingWrapper error={error} isLoading={isLoading}> */}
        <PageTitle title={title} />
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
              helpText="Required"
              id="name"
              inputMode="text"
              hasError={hasError('name')}
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
              helpText="Required"
              id="long_title"
              hasError={hasError('long_title')}
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
              id="text"
              hasError={hasError('text')}
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
              id="edit_date_display"
              hasError={hasError('edit_date_display')}
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
              id="parent"
              hasError={hasError('parent')}
              label="Parent"
              onChange={handleChange}
              showCounter
              value={formValues.parent}
            />
            <TextInput
              errorText={getFieldErrors('reading_time')}
              id="reading_time"
              hasError={hasError('reading_time')}
              label="Reading Time"
              onChange={handleChange}
              showCounter
              value={formValues.reading_time}
            />
            <TextInput
              errorText={getFieldErrors('readability_score')}
              id="readability_score"
              hasError={hasError('readability_score')}
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
      </main>
      <ModalProcessing isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default PageEdit;
