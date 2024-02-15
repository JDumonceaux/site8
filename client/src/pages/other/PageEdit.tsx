import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageTitle, Seo } from 'components/common';
import { Button } from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import { TextArea } from 'components/ui/TextArea';
import { TextInput } from 'components/ui/TextInput';
import { TwoColumn } from 'components/ui/TwoColumn';
import usePageEdit from 'services/hooks/usePageEdit';

import { LoadingOverlay } from 'components/common/LoadingOverlay';
import { Modal } from 'components/common/Modal';

export default function PageEdit(): JSX.Element {
  // const [showErrorOverlay, setShowErrorOverlay] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(true);
  const {
    formValues,
    handleCancel,
    handleChange,
    handleSubmit,
    // isProcessing,
    // updateError,
  } = usePageEdit();
  const params = useParams();
  // const { id } = params.id;

  const title = 'Page Edit';

  useEffect(() => {
    //   setShowErrorOverlay(updateError !== false);
    setIsOpen(true);
  }, []);

  const isProcessing2 = true;

  return (
    <>
      <Seo title={title} />
      <main className="main-content">
        {/* <LoadingWrapper error={error} isLoading={loading}> */}
        <PageTitle title={title} />
        <section className="section">
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Short Title"
              id="short_title"
              value={formValues.short_title}
              onChange={handleChange}
              showCounter
              maxLength={30}
              helpText="Required"
              errorText="Please enter a short title"
              isValid={false}
              required={true}
            />
            <TextInput
              label="Long Title"
              id="long_title"
              value={formValues.long_title}
              onChange={handleChange}
              showCounter
              maxLength={250}
              helpText="Required"
              required={true}
            />
            <TextInput
              label="Edit Date"
              id="edit_date"
              value={formValues.edit_date}
              onChange={handleChange}
              showCounter
              maxLength={10}
              helpText="Required"
              required={true}
            />
            <Checkbox
              label="Resources"
              id="resources"
              checked={formValues.resources}
              onChange={handleChange}
            />
            <TextInput
              label="Parent"
              id="parent"
              value={formValues.parent}
              onChange={handleChange}
              showCounter
            />
            <TextInput
              label="Reading Time"
              id="reading_time"
              value={formValues.reading_time}
              onChange={handleChange}
              showCounter
            />
            <TextInput
              label="Readability Score"
              id="readability_score"
              value={formValues.readability_score}
              onChange={handleChange}
              showCounter
            />
            <TextArea
              label="Text"
              id="text"
              value={formValues.text}
              onChange={handleChange}
              showCounter
              required={true}
            />
            <TwoColumn includeGap>
              <Button id="cancel" onClick={handleCancel} variant="secondary">
                Cancel
              </Button>
              <Button id="submit" type="submit">
                Submit
              </Button>
            </TwoColumn>
          </form>
        </section>
        {/* </LoadingWrapper> */}
      </main>

      <Modal
        onClose={() => setIsOpen(false)}
        open={isOpen}
        locked={false}
        title="Save">
        <p>
          I'm a modal window, I don't use portals but use the dialog element
          from the platform.
        </p>
      </Modal>
    </>
  );
}
