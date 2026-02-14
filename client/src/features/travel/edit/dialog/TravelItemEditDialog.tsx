import type { JSX } from 'react';
import { useCallback } from 'react';

import Dialog from '@components/core/dialog/Dialog';
import { Button } from '@components/ui';
import Input from '@components/ui/input/Input';
import useValibotValidation from '@hooks/useValibotValidation';
import {
  optionalNumber,
  optionalString,
  requiredString,
} from '@lib/validation/schemas';
import type { Place } from '@site8/shared';
import type { FieldError } from '@types';
import * as v from 'valibot';
import { useTravelItemFormState } from './hooks/useTravelItemFormState';
import {
  FooterButtons,
  Form,
  LeftButtons,
  RightButtons,
  ScrollableContent,
} from './TravelItemEditDialog.styles';
import styled from 'styled-components';
import { toPlaceFormData, toPlaceToSave } from './utils/placeFormMapper';

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

type PlaceItemFormData = v.InferOutput<typeof placeItemSchema>;

// ============================================================================
// Helpers
// ============================================================================

/**
 * Convert string error messages to FieldError array format
 */
const toFieldErrors = (error: string | undefined): FieldError[] | undefined => {
  if (!error) return undefined;
  return [{ message: error }];
};

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

  const {
    address,
    city,
    country,
    description,
    lat,
    lon,
    name,
    region,
    state,
    tags,
    type,
    visited,
  } = formValues;

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

  // ============================================================================
  // Form Submission
  // ============================================================================

  /**
   * Handle form submission with validation
   */
  const handleSave = useCallback(() => {
    const formData: PlaceItemFormData = toPlaceFormData(formValues);

    // Validate entire form
    if (!validate(formData)) {
      return; // Stop if validation fails
    }

    const itemToSave: Place = toPlaceToSave(item, formValues);

    onSave(itemToSave);
    onClose();
  }, [formValues, item, onClose, onSave, validate]);

  const handleCancel = useCallback(() => {
    clearErrors();
    onClose();
  }, [clearErrors, onClose]);

  const handleDelete = useCallback(() => {
    if (!item || !onDelete) return;

    if (
      globalThis.confirm(
        `Are you sure you want to delete "${item.name}"? This action cannot be undone.`,
      )
    ) {
      onDelete(item.id);
      onClose();
    }
  }, [item, onDelete, onClose]);

  const handleCopy = (): void => {
    if (!item) return;

    const copiedItem: Place = {
      ...item,
      id: 0, // New item will get a new id from the server
    };

    onSave(copiedItem);
    // Don't call onClose() - keep dialog open
  };

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
          <Input.Text
            errors={toFieldErrors(errors.name)}
            id="name"
            isRequired
            label="Name"
            onBlur={handleNameBlur}
            onChange={handleFieldChange('name')}
            value={name}
          />
          <Input.Text
            errors={toFieldErrors(errors.city)}
            id="city"
            label="City"
            onChange={handleFieldChange('city')}
            value={city}
          />
          <Input.Text
            errors={toFieldErrors(errors.country)}
            id="country"
            label="Country"
            onChange={handleFieldChange('country')}
            value={country}
          />
          <Input.Text
            errors={toFieldErrors(errors.state)}
            id="state"
            label="State"
            onChange={handleFieldChange('state')}
            value={state}
          />
          <Input.Text
            errors={toFieldErrors(errors.region)}
            id="region"
            label="Region"
            onChange={handleFieldChange('region')}
            value={region}
          />
          <Input.Text
            errors={toFieldErrors(errors.address)}
            id="address"
            label="Address"
            onChange={handleFieldChange('address')}
            value={address}
          />
          <Input.TextArea
            errors={toFieldErrors(errors.description)}
            id="description"
            label="Description"
            onChange={handleFieldChange('description')}
            rows={4}
            value={description}
          />
          <Input.Text
            errors={toFieldErrors(errors.type)}
            id="type"
            label="Type"
            onChange={handleFieldChange('type')}
            value={type}
          />
          <Input.Text
            errors={toFieldErrors(errors.lat)}
            id="lat"
            label="Latitude"
            onChange={handleFieldChange('lat')}
            placeholder="e.g. 40.7128"
            value={lat}
          />
          <Input.Text
            errors={toFieldErrors(errors.lon)}
            id="lon"
            label="Longitude"
            onChange={handleFieldChange('lon')}
            placeholder="e.g. -74.0060"
            value={lon}
          />
          <Input.Text
            errors={toFieldErrors(errors.tags)}
            id="tags"
            label="Tags (comma-separated)"
            onChange={handleFieldChange('tags')}
            placeholder="e.g. beach, historic, museum"
            value={tags}
          />
          <CheckboxWrapper>
            <CheckboxLabel htmlFor="visited">
              <input
                checked={visited}
                id="visited"
                onChange={(e) => {
                  setVisited(e.target.checked);
                }}
                type="checkbox"
              />
              Visited
            </CheckboxLabel>
          </CheckboxWrapper>
        </Form>
      </ScrollableContent>
    </Dialog>
  );
};

export default TravelItemEditDialog;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);

  input[type='checkbox'] {
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;
