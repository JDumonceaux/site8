import type { JSX } from 'react';
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useState,
} from 'react';

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
import {
  FooterButtons,
  Form,
  LeftButtons,
  RightButtons,
  ScrollableContent,
} from './TravelItemEditDialog.styles';
import styled from 'styled-components';

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

/**
 * Format tags array to comma-separated string
 */
const formatTags = (tags: string[] | undefined): string => {
  if (!tags || tags.length === 0) return '';
  return tags.join(', ');
};

/**
 * Parse comma-separated tags string to array
 */
const parseTags = (tagsString: string): string[] | undefined => {
  const trimmed = tagsString.trim();
  if (!trimmed) return undefined;
  return trimmed
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
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
  const [name, setName] = useState(item?.name ?? '');
  const [city, setCity] = useState(item?.city ?? '');
  const [country, setCountry] = useState(item?.country ?? '');
  const [state, setState] = useState(item?.state ?? '');
  const [region, setRegion] = useState(item?.region ?? '');
  const [address, setAddress] = useState(item?.address ?? '');
  const [description, setDescription] = useState(item?.description ?? '');
  const [type, setType] = useState(item?.type ?? '');
  const [lat, setLat] = useState(item?.lat?.toString() ?? '');
  const [lon, setLon] = useState(item?.lon?.toString() ?? '');
  const [tags, setTags] = useState(formatTags(item?.tags));
  const [visited, setVisited] = useState(item?.visited ?? false);

  // Validation
  const { clearErrors, errors, hasErrors, validate, validateField } =
    useValibotValidation(placeItemSchema);

  // Check if required fields are filled
  const isFormValid = useMemo(
    () => name.trim().length > 0 && !hasErrors,
    [name, hasErrors],
  );

  // Effect event for syncing form state with props
  const onSyncFormState = useEffectEvent(() => {
    setName(item?.name ?? '');
    setCity(item?.city ?? '');
    setCountry(item?.country ?? '');
    setState(item?.state ?? '');
    setRegion(item?.region ?? '');
    setAddress(item?.address ?? '');
    setDescription(item?.description ?? '');
    setType(item?.type ?? '');
    setLat(item?.lat?.toString() ?? '');
    setLon(item?.lon?.toString() ?? '');
    setTags(formatTags(item?.tags));
    setVisited(item?.visited ?? false);
    clearErrors();
  });

  // Sync state when dialog opens with new data
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-you-might-not-need-an-effect/no-pass-data-to-parent, react-you-might-not-need-an-effect/no-derived-state
      onSyncFormState();
    }
  }, [isOpen, item?.id]);

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
    const formData: PlaceItemFormData = {
      address: address.trim() || undefined,
      city: city.trim() || undefined,
      country: country.trim() || undefined,
      description: description.trim() || undefined,
      lat: lat.trim() ? Number(lat) : undefined,
      lon: lon.trim() ? Number(lon) : undefined,
      name,
      region: region.trim() || undefined,
      state: state.trim() || undefined,
      tags: tags.trim(),
      type: type.trim() || undefined,
      visited,
    };

    // Validate entire form
    if (!validate(formData)) {
      return; // Stop if validation fails
    }

    // Convert to Place object
    const itemToSave: Place = item
      ? {
          ...item,
          address: address.trim() || undefined,
          city: city.trim() || undefined,
          country: country.trim() || undefined,
          description: description.trim() || undefined,
          lat: lat.trim() ? Number(lat) : undefined,
          lon: lon.trim() ? Number(lon) : undefined,
          name,
          region: region.trim() || undefined,
          state: state.trim() || undefined,
          tags: parseTags(tags),
          type: type.trim() || undefined,
          visited,
        }
      : {
          address: address.trim() || undefined,
          city: city.trim() || undefined,
          country: country.trim() || undefined,
          description: description.trim() || undefined,
          id: 0,
          lat: lat.trim() ? Number(lat) : undefined,
          lon: lon.trim() ? Number(lon) : undefined,
          name,
          region: region.trim() || undefined,
          state: state.trim() || undefined,
          tags: parseTags(tags),
          type: type.trim() || undefined,
          visited,
        };

    onSave(itemToSave);
    onClose();
  }, [
    address,
    city,
    country,
    description,
    item,
    lat,
    lon,
    name,
    onClose,
    onSave,
    region,
    state,
    tags,
    type,
    validate,
    visited,
  ]);

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
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <Input.Text
            errors={toFieldErrors(errors.city)}
            id="city"
            label="City"
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          />
          <Input.Text
            errors={toFieldErrors(errors.country)}
            id="country"
            label="Country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            value={country}
          />
          <Input.Text
            errors={toFieldErrors(errors.state)}
            id="state"
            label="State"
            onChange={(e) => {
              setState(e.target.value);
            }}
            value={state}
          />
          <Input.Text
            errors={toFieldErrors(errors.region)}
            id="region"
            label="Region"
            onChange={(e) => {
              setRegion(e.target.value);
            }}
            value={region}
          />
          <Input.Text
            errors={toFieldErrors(errors.address)}
            id="address"
            label="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
          />
          <Input.TextArea
            errors={toFieldErrors(errors.description)}
            id="description"
            label="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            rows={4}
            value={description}
          />
          <Input.Text
            errors={toFieldErrors(errors.type)}
            id="type"
            label="Type"
            onChange={(e) => {
              setType(e.target.value);
            }}
            value={type}
          />
          <Input.Text
            errors={toFieldErrors(errors.lat)}
            id="lat"
            label="Latitude"
            onChange={(e) => {
              setLat(e.target.value);
            }}
            placeholder="e.g. 40.7128"
            value={lat}
          />
          <Input.Text
            errors={toFieldErrors(errors.lon)}
            id="lon"
            label="Longitude"
            onChange={(e) => {
              setLon(e.target.value);
            }}
            placeholder="e.g. -74.0060"
            value={lon}
          />
          <Input.Text
            errors={toFieldErrors(errors.tags)}
            id="tags"
            label="Tags (comma-separated)"
            onChange={(e) => {
              setTags(e.target.value);
            }}
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
