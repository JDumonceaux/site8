import type { JSX } from 'react';

import Input from '@components/ui/input/Input';
import type { PlaceFormValues } from '../utils/placeFormMapper';
import styled from 'styled-components';

type PlaceTextField = Exclude<keyof PlaceFormValues, 'visited'>;

type TravelItemFormFieldsProps = {
  readonly errors: Partial<Record<PlaceTextField, string>>;
  readonly formValues: PlaceFormValues;
  readonly onNameBlur: () => void;
  readonly onTextFieldChange: (
    field: PlaceTextField,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  readonly onVisitedChange: (value: boolean) => void;
};

type FieldError = {
  message: string;
};

const toFieldErrors = (error: string | undefined): FieldError[] | undefined => {
  if (!error) return undefined;
  return [{ message: error }];
};

const TravelItemFormFields = ({
  errors,
  formValues,
  onNameBlur,
  onTextFieldChange,
  onVisitedChange,
}: TravelItemFormFieldsProps): JSX.Element => {
  return (
    <>
      <Input.Text
        errors={toFieldErrors(errors.name)}
        id="name"
        isRequired
        label="Name"
        onBlur={onNameBlur}
        onChange={onTextFieldChange('name')}
        value={formValues.name}
      />
      <Input.Text
        errors={toFieldErrors(errors.city)}
        id="city"
        label="City"
        onChange={onTextFieldChange('city')}
        value={formValues.city}
      />
      <Input.Text
        errors={toFieldErrors(errors.country)}
        id="country"
        label="Country"
        onChange={onTextFieldChange('country')}
        value={formValues.country}
      />
      <Input.Text
        errors={toFieldErrors(errors.state)}
        id="state"
        label="State"
        onChange={onTextFieldChange('state')}
        value={formValues.state}
      />
      <Input.Text
        errors={toFieldErrors(errors.region)}
        id="region"
        label="Region"
        onChange={onTextFieldChange('region')}
        value={formValues.region}
      />
      <Input.Text
        errors={toFieldErrors(errors.address)}
        id="address"
        label="Address"
        onChange={onTextFieldChange('address')}
        value={formValues.address}
      />
      <Input.TextArea
        errors={toFieldErrors(errors.description)}
        id="description"
        label="Description"
        onChange={onTextFieldChange('description')}
        rows={4}
        value={formValues.description}
      />
      <Input.Text
        errors={toFieldErrors(errors.type)}
        id="type"
        label="Type"
        onChange={onTextFieldChange('type')}
        value={formValues.type}
      />
      <Input.Text
        errors={toFieldErrors(errors.lat)}
        id="lat"
        label="Latitude"
        onChange={onTextFieldChange('lat')}
        placeholder="e.g. 40.7128"
        value={formValues.lat}
      />
      <Input.Text
        errors={toFieldErrors(errors.lon)}
        id="lon"
        label="Longitude"
        onChange={onTextFieldChange('lon')}
        placeholder="e.g. -74.0060"
        value={formValues.lon}
      />
      <Input.Text
        errors={toFieldErrors(errors.tags)}
        id="tags"
        label="Tags (comma-separated)"
        onChange={onTextFieldChange('tags')}
        placeholder="e.g. beach, historic, museum"
        value={formValues.tags}
      />
      <CheckboxWrapper>
        <CheckboxLabel htmlFor="visited">
          <input
            checked={formValues.visited}
            id="visited"
            onChange={(e) => {
              onVisitedChange(e.target.checked);
            }}
            type="checkbox"
          />
          Visited
        </CheckboxLabel>
      </CheckboxWrapper>
    </>
  );
};

export default TravelItemFormFields;

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
