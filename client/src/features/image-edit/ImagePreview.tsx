import type { JSX } from 'react';

import type { ImageEdit } from '@site8/shared';
import styled from 'styled-components';

type ImagePreviewProps = {
  readonly formValues: ImageEdit;
  readonly previewSrc: string;
};

const ImagePreview = ({
  formValues,
  previewSrc,
}: ImagePreviewProps): JSX.Element => {
  return (
    <ImageContainer>
      {previewSrc ? (
        <StyledImageDisplay>
          <StyledImage
            alt={formValues.name || formValues.fileName || 'Image preview'}
            src={previewSrc}
          />
          <StyledImageInfo>
            {formValues.name ? <h3>{formValues.name}</h3> : null}
            {formValues.folder ? <p>Folder: {formValues.folder}</p> : null}
            {formValues.fileName ? <p>File: {formValues.fileName}</p> : null}
          </StyledImageInfo>
        </StyledImageDisplay>
      ) : (
        <StyledPlaceholder>No image to display</StyledPlaceholder>
      )}
    </ImageContainer>
  );
};

export default ImagePreview;

const ImageContainer = styled.div`
  flex-basis: 30%;
  position: sticky;
  top: 100px;
  align-self: flex-start;
`;

const StyledImageDisplay = styled.div`
  border: 1px solid var(--border-light, #e0e0e0);
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface-background-color);
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const StyledImageInfo = styled.div`
  padding: 1rem;
  h3 {
    margin: 0 0 0.75rem 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary-color);
  }
  p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: var(--text-secondary-color);
  }
`;

const StyledPlaceholder = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--text-tertiary-color);
  border: 1px dashed var(--border-light, #e0e0e0);
  border-radius: 8px;
`;
