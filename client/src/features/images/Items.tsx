import { memo, type JSX } from 'react';
import { Link } from 'react-router-dom';

import type { Images } from '@site8/shared';
import styled from 'styled-components';

type ItemsProps = {
  readonly data?: null | Images;
  readonly id?: number;
};

// Items component displays a grid of images
const Items = memo(({ data, id }: ItemsProps): JSX.Element | null => {
  if (!data) {
    return null;
  }

  return (
    <>
      {id ? <div>{id}</div> : null}
      <StyledGrid>
        {data.items?.map((item) => (
          <StyledCard
            as={Link}
            key={item.id}
            to={`/admin/image/edit/${item.id}`}
          >
            {item.fileName && item.folder ? (
              <StyledImageContainer>
                <StyledImage
                  alt={item.alt ?? item.name ?? item.description ?? ''}
                  loading="lazy"
                  src={`/images/${item.folder}/${item.fileName}`}
                  title={item.title ?? item.name ?? ''}
                />
              </StyledImageContainer>
            ) : null}
            <StyledCardContent>
              {item.name ? <StyledHeading>{item.name}</StyledHeading> : null}
              {item.description ? <p>{item.description}</p> : null}
              {item.location ? (
                <StyledLocation>{item.location}</StyledLocation>
              ) : null}
              {item.tags && item.tags.length > 0 ? (
                <StyledTags>
                  {item.tags.map((tag) => (
                    <StyledTag key={tag}>{tag}</StyledTag>
                  ))}
                </StyledTags>
              ) : null}
            </StyledCardContent>
          </StyledCard>
        ))}
      </StyledGrid>
    </>
  );
});

Items.displayName = 'Items';

export default Items;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem 0;
`;

const StyledCard = styled.div`
  border: 1px solid var(--border-light);
  border-radius: var(--border-radius-lg);
  background-color: var(--surface-background-color);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  text-decoration: none;
  color: inherit;
  display: block;

  &:hover {
    box-shadow: var(--shadow-md);
  }
`;

const StyledImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: var(--hover-background);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const StyledCardContent = styled.div`
  padding: 1rem;
`;

const StyledHeading = styled.h3`
  font-size: 1.1rem;
  margin: 0 0 0.5em 0;
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary-color);
`;

const StyledLocation = styled.div`
  font-size: var(--font-size-sm);
  color: var(--text-secondary-color);
  margin-top: 0.5rem;
  font-style: italic;
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
