import { type DragEvent, type JSX, memo } from 'react';

import IconButton from '@components/button/icon-button/IconButton';
import { EditIcon } from '@components/icons';
import type { ImageItem } from '@types';
import styled from 'styled-components';

type ItemsProps = {
  readonly items?: readonly ImageItem[];
  readonly onCardDragStart: (imageId: number) => void;
  readonly onCardEdit: (image: ImageItem) => void;
  readonly onCardSelect: (imageId: number) => void;
  readonly selectedImageIds: ReadonlySet<number>;
};

const capitalizePart = (value: string): string => {
  return value
    .split(' ')
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
};

const formatFolderLabel = (folderPath: string): string => {
  return folderPath
    .split('/')
    .filter(Boolean)
    .map((part) =>
      capitalizePart(part.replaceAll('_', ' ').replaceAll('-', ' ')),
    )
    .join(' / ');
};

const Items = memo(
  ({
    items,
    onCardDragStart,
    onCardEdit,
    onCardSelect,
    selectedImageIds,
  }: ItemsProps): JSX.Element | null => {
    if (!items || items.length === 0) {
      return null;
    }

    const groupedItems = items.reduce((groups, item) => {
      const folder = item.currentFolder
        ? formatFolderLabel(item.currentFolder)
        : 'Root';
      const current = groups.get(folder) ?? [];
      current.push(item);
      groups.set(folder, current);
      return groups;
    }, new Map<string, ImageItem[]>());

    return (
      <Container>
        {Array.from(groupedItems.entries()).map(([folder, folderItems]) => (
          <FolderSection key={folder}>
            <FolderHeading>{folder}</FolderHeading>
            <Grid>
              {folderItems.map((item) => (
                <Card
                  $selected={selectedImageIds.has(item.seq)}
                  draggable
                  key={item.seq}
                  onClick={() => {
                    onCardSelect(item.seq);
                  }}
                  onDragStart={(event: DragEvent<HTMLElement>) => {
                    event.dataTransfer.effectAllowed = 'move';
                    event.dataTransfer.setData('text/plain', String(item.seq));
                    onCardDragStart(item.seq);
                  }}
                >
                  <ImageElement
                    alt={item.title}
                    loading="lazy"
                    src={item.src}
                  />
                  {item.isMatched && <MatchIndicator />}
                  <CardFooter>
                    <CardTitle>{item.title}</CardTitle>
                    <CardActions>
                      <IconButton
                        aria-label={`Edit ${item.title}`}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          onCardEdit(item);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </CardActions>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </FolderSection>
        ))}
      </Container>
    );
  },
);

Items.displayName = 'Items';

export default Items;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FolderSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FolderHeading = styled.div`
  color: var(--text-primary-color);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
`;

const Card = styled.article<{ $selected: boolean }>`
  background: var(--surface-background-color);
  border: 2px solid
    ${({ $selected }) =>
      $selected ? 'var(--focus-ring-color)' : 'var(--border-light)'};
  border-radius: var(--border-radius-lg);
  cursor: grab;
  opacity: ${({ $selected }) => ($selected ? 0.65 : 1)};
  overflow: hidden;
  transition: opacity 0.2s ease;

  &:active {
    cursor: grabbing;
  }
`;

const CardActions = styled.div`
  display: inline-flex;
  align-items: center;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
`;

const ImageElement = styled.img`
  display: block;
  height: 180px;
  object-fit: cover;
  width: 100%;
`;

const CardTitle = styled.div`
  color: var(--text-primary-color);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  margin: 0;
  min-width: 0;
`;

const MatchIndicator = styled.div`
  background-color: var(--status-success);
  border-radius: 2px;
  height: 3px;
  margin: 0 0.75rem;
  width: 30px;
`;
