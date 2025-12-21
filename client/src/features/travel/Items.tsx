import { type JSX, useEffect, useState } from 'react';

import type { Places } from '@shared/types/Places';
import Skeleton from './Skeleton';
import styled from 'styled-components';

type ItemsProps = {
  readonly data?: null | Places;
  readonly id?: number;
  readonly isLoading?: boolean;
};

// Items component displays a list of travel destinations
const Items = ({ data, id, isLoading }: ItemsProps): JSX.Element | null => {
  // TODO: TEMPORARY - Remove this delay after testing skeleton
  const [showDelay, setShowDelay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelay(false);
    }, 3000); // 3 second delay to test skeleton
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading || showDelay) {
    return <Skeleton />;
  }

  if (!data) {
    return null;
  }

  return (
    <>
      {id ? <div>{id}</div> : null}
      {data.items.map((item) => (
        <StyledCard key={item.id}>
          <StyledCardContent>
            <StyledTextContent>
              <StyledHeading>{item.name}</StyledHeading>
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
                    key={image.id}
                    alt={image.description ?? image.name ?? item.name}
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
};

Items.displayName = 'Items';

export default Items;

const StyledCard = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
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
  border-radius: 4px;
  border: 1px solid #e0e0e0;
`;

const StyledHeading = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.5em 0;
  font-weight: 600;
  color: #333;
`;

const StyledLocation = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const StyledAddress = styled.div`
  font-size: 0.85rem;
  color: #888;
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
  color: #0066cc;
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
  background-color: #f0f0f0;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #555;
`;
