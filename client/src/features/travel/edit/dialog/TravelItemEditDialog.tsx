import type { JSX } from 'react';
import { useCallback } from 'react';

import Button from '@components/button/Button';
import Dialog from '@components/dialog/Dialog';
import useValibotValidation from '@hooks/useValibotValidation';
import {
  optionalNumber,
  optionalString,
  requiredString,
} from '@lib/validation/schemas';
import type { Place } from '@site8/shared';
import * as v from 'valibot';
import TravelItemFormFields from './components/TravelItemFormFields';
import { useTravelItemDialogActions } from './hooks/useTravelItemDialogActions';
import { useTravelItemFormState } from './hooks/useTravelItemFormState';
import {
  FooterButtons,
  Form,
  LeftButtons,
  RightButtons,
  ScrollableContent,
} from './TravelItemEditDialog.styles';

// ============================================================================
// Validation Schema
// ============================================================================

/**
 * Valibot schema for Place item form
 */
const placeItemSchema = v.object({
  address: optionalString,
  city: optionalString,
  country: optionalString,
  description: optionalString,
  lat: optionalNumber,
  lon: optionalNumber,
  name: requiredString('Name is required'),
  region: optionalString,
  state: optionalString,
  tags: optionalString,
  type: optionalString,
  visited: v.optional(v.boolean()),
});

// ============================================================================
// Component Props
// ============================================================================

type TravelItemEditDialogProps = {
  readonly isOpen: boolean;
  readonly item: null | Place;
  readonly onClose: () => void;
  readonly onDelete?: (itemId: number) => void;
  readonly onSave: (updatedItem: Place) => void;
};

const TravelItemEditDialog = ({
  isOpen,
  item,
  onClose,
  onDelete,
  onSave,
}: TravelItemEditDialogProps): JSX.Element => {
  // Validation
  const { clearErrors, errors, hasErrors, validate, validateField } =
    useValibotValidation(placeItemSchema);

  const { formValues, isFormValid, setTextField, setVisited } =
    useTravelItemFormState({
      clearErrors,
      hasErrors,
      isOpen,
      item,
    });

  const { name } = formValues;

  const handleFieldChange = useCallback(
    (field: Exclude<keyof typeof formValues, 'visited'>) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTextField(field, e.target.value);
      },
    [setTextField],
  );

  // ============================================================================
  // Validation Handlers
  // ============================================================================

  /**
   * Validate name field on blur
   */
  const handleNameBlur = useCallback(() => {
    validateField('name', name, requiredString('Name is required'));
  }, [name, validateField]);

  const { handleCancel, handleCopy, handleDelete, handleSave } =
    useTravelItemDialogActions({
      clearErrors,
      formValues,
      item,
      onClose,
      onDelete,
      onSave,
      validate,
    });

  return (
    <Dialog
      footer={
        <FooterButtons>
          <LeftButtons>
            {item && onDelete ? (
              <Button
                onClick={handleDelete}
                variant="secondary"
              >
                Delete
              </Button>
            ) : null}
            {item ? (
              <Button
                onClick={handleCopy}
                variant="secondary"
              >
                Copy
              </Button>
            ) : null}
          </LeftButtons>
          <RightButtons>
            <Button
              onClick={handleCancel}
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              disabled={!isFormValid}
              onClick={handleSave}
              variant="primary"
            >
              Save
            </Button>
          </RightButtons>
        </FooterButtons>
      }
      isOpen={isOpen}
      label={item ? 'Edit Travel Place' : 'Add Travel Place'}
      onOpenChange={onClose}
      size="lg"
    >
      <ScrollableContent>
        <Form>
          <TravelItemFormFields
            errors={errors}
            formValues={formValues}
            onNameBlur={handleNameBlur}
            onTextFieldChange={handleFieldChange}
            onVisitedChange={setVisited}
          />
        </Form>
      </ScrollableContent>
    </Dialog>
  );
};

export default TravelItemEditDialog;
