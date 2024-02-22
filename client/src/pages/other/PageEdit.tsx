import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { PageTitle, Seo } from 'components/common';
import { Button } from 'components/ui/Form/Button';

import { TextArea } from 'components/ui/Form/TextArea';
import { TextInput } from 'components/ui/Form/TextInput';
import { TwoColumn } from 'components/ui/TwoColumn';
import usePageEdit from 'services/hooks/usePageEdit';
import { ModalProcessing } from 'components/common/ModalProcessing';
import { ClearAll } from 'components/ui/Form/ClearAll';

export default function PageEdit(): JSX.Element {
  const title = 'Page Edit';

  const params = useParams();
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    formValues,
    isProcessing,
    getFieldErrors,
    isValid,
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
      <Seo title={title} />
      <main className="main-content">
        {/* <LoadingWrapper error={error} isLoading={loading}> */}
        <PageTitle title={title} />
        <section className="section">
          <form onSubmit={handleSubmit}>
            <ClearAll onClear={handleClear}>
              <NavLink to="/admin/pages">List</NavLink>
              <button onClick={handleReset}>Reset</button>
            </ClearAll>
            <TextInput
              label="Short Title"
              id="short_title"
              value={formValues.short_title}
              onChange={handleChange}
              showCounter
              maxLength={30}
              helpText="Required"
              errorText={getFieldErrors('short_title')}
              errorTextShort="Please enter a short title"
              isValid={isValid('short_title')}

              // required={true}
              //ref={focusElement}
            />
            <TextInput
              label="Long Title"
              id="long_title"
              value={formValues.long_title}
              onChange={handleChange}
              showCounter
              maxLength={250}
              helpText="Required"
              errorText={getFieldErrors('long_title')}
              errorTextShort="Please enter a title"
              isValid={isValid('long_title')}
              // required={true}
            />

            <TextArea
              label="Text"
              id="text"
              value={formValues.text}
              onChange={handleChange}
              showCounter
              // required={true}
              errorText={getFieldErrors('text')}
              isValid={isValid('text')}
              rows={10}
            />
            <TextInput
              label="Edit Date"
              id="edit_date"
              value={formValues.edit_date?.toLocaleString()}
              onChange={handleChange}
              showCounter
              maxLength={10}
              errorText={getFieldErrors('edit_date')}
              errorTextShort="Please enter a date"
              isValid={isValid('edit_date')}
              // required={true}
            />
            {/* <Checkbox
              label="Resources"
              id="resources"
              checked={formValues.resources}
              onChange={handleChange}
            /> */}
            <TextInput
              label="Parent"
              id="parent"
              value={formValues.parent}
              onChange={handleChange}
              showCounter
              errorText={getFieldErrors('parent')}
              errorTextShort="Please enter a parent"
              isValid={isValid('parent')}
            />
            <TextInput
              label="Reading Time"
              id="reading_time"
              value={formValues.reading_time}
              onChange={handleChange}
              showCounter
              errorText={getFieldErrors('reading_time')}
              isValid={isValid('reading_time')}
            />
            <TextInput
              label="Readability Score"
              id="readability_score"
              value={formValues.readability_score}
              onChange={handleChange}
              showCounter
              errorText={getFieldErrors('readability_score')}
              isValid={isValid('readability_score')}
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
}
