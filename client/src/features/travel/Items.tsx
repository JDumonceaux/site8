import { type JSX, memo } from 'react';

import IconButton from '@components/ui/button/icon-button/IconButton';
import { EditIcon } from '@components/ui/icons';
import type { Place, Places } from '@site8/shared';
import styled from 'styled-components';

type ItemsProps = {
  readonly data?: null | Places;
  readonly id?: number;
  readonly onEdit?: (item: Place) => void;
};

// Items component displays a list of travel destinations
const Items = memo(({ data, id, onEdit }: ItemsProps): JSX.Element | null => {
  if (!data) {
    return null;
  }

  return (
    <>
      {id ? <div>{id}</div> : null}
      {data.items?.map((item) => (
        <StyledCard key={item.id}>
          <StyledCardHeader>
            <StyledHeading>{item.name}</StyledHeading>
            {onEdit ? (
              <IconButton
                aria-label={`Edit ${item.name}`}
                onClick={() => onEdit(item)}
              >
                <EditIcon />
              </IconButton>
            ) : null}
          </StyledCardHeader>
          <StyledCardContent>
            <StyledTextContent>
              {item.city || item.country ? (
                <StyledLocation>
                  {item.city}
                  {item.country ? ` • ${item.country}` : null}
                </StyledLocation>
              ) : null}
              {item.description ? <p>{item.description}</p> : null}
              {item.address ? (
                <StyledAddress>{item.address}</StyledAddress>
              ) : null}
              {item.urls && item.urls.length > 0 ? (
                <StyledUrls>
                  {item.urls.map((urlItem, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                      {urlItem.type}
                      {urlItem.name ? ': ' : null}
                      <StyledUrlLink
                        href={urlItem.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {urlItem.name ?? urlItem.url}
                      </StyledUrlLink>
                    </div>
                  ))}
                </StyledUrls>
              ) : null}
              {item.tags && item.tags.length > 0 ? (
                <StyledTags>
                  {item.tags.map((tag) => (
                    <StyledTag key={tag}>{tag}</StyledTag>
                  ))}
                </StyledTags>
              ) : null}
            </StyledTextContent>
            {item.images &&
            Array.isArray(item.images) &&
            item.images.length > 0 ? (
              <StyledImagesContainer>
                {item.images.map((image) => (
                  <StyledImage
                    alt={image.description ?? image.name ?? item.name}
                    key={image.id}
                    src={`/images/${image.folder ?? ''}/${image.fileName ?? ''}`}
                    title={image.name ?? image.description ?? ''}
                  />
                ))}
              </StyledImagesContainer>
            ) : null}
          </StyledCardContent>
        </StyledCard>
      ))}
    </>
  );
});

Items.displayName = 'Items';

export default Items;

const StyledCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-lg);
  background-color: var(--surface-background-color);

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

const StyledCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
`;

const StyledCardContent = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
`;

const StyledTextContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const StyledImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-light);
`;

const StyledHeading = styled.h3`
  font-size: 1.25rem;
  margin: 0;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
  flex: 1;
`;

const StyledLocation = styled.div`
  font-size: var(--font-size-sm);
  color: var(--text-secondary-color);
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const StyledAddress = styled.div`
  font-size: var(--font-size-xs);
  color: var(--text-tertiary-color);
  margin-bottom: 0.5rem;
`;

const StyledUrls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
`;

const StyledUrlLink = styled.a`
  font-size: 0.9rem;
  color: var(--link-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const StyledTag = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: var(--hover-background);
  border-radius: 4px;
  font-size: 0.85rem;
  color: var(--text-secondary-color);
`;
