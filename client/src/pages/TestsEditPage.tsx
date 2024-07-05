import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Meta, PageTitle, StyledPlainButton } from 'components';
import { Switch } from 'components/Radix/Switch';
import StyledLink from 'components/common/Link/StyledLink/StyledLink';
import StyledMain from 'components/common/StyledMain/StyledMain';
import { TextInput } from 'components/form/input';
import { SortableItem } from 'components/ui/TestEditPage/SortableItem';
import useAppSettings from 'hooks/useAppSettings';
import useTestsEdit from 'hooks/useTestsEdit';
import { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';

const TestsEditPage = (): JSX.Element => {
  const { data, isSaved, handleSave, setFormValues, getDefaultProps } =
    useTestsEdit();

  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { showPages, setShowPages } = useAppSettings();

  useEffect(() => {
    const ret = data?.map((item) => {
      return {
        id: item.id,
        localId: item.localId,
        name: item.name,
        text: item.text,
        type: item.type?.toString(),
        level: item.level?.toString(),
        projectType: item.projectType?.toString(),
        parentId: item.parent?.id.toString(),
        parentSeq: item.parent?.seq.toString(),
        action: '',
      };
    });
    if (ret) {
      setFormValues(ret);
    }
  }, [data, setFormValues]);

  const onShowPages = useCallback(
    (checked: boolean) => {
      setShowPages(checked);
    },
    [setShowPages],
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <Meta title="Tests" />
      <StyledMain>
        <StyledMain.Section>
          <PageTitle title="Tests">
            <Switch
              checked={showPages}
              id="showPages"
              label={showPages ? 'Hide Pages' : 'Show Pages'}
              onCheckedChange={(e) => onShowPages(e)}
            />
            <StyledLink data-testid="nav-new" to="/admin/page/edit">
              New
            </StyledLink>
            {!isSaved ? (
              <StyledSaveButton
                data-testid="button-save"
                onClick={handleSave}
                type="submit">
                Save
              </StyledSaveButton>
            ) : null}
          </PageTitle>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Text</th>
                <th>Type</th>
                <th>Level</th>
                <th>Parent</th>
                <th>Seq</th>
                <th>Project Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              sensors={sensors}>
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}>
                <tbody>
                  {data?.map((item) => (
                    <SortableItem id={item.localId} key={item.localId}>
                      <td>{item.id}</td>
                      <td>
                        <TextInput {...getDefaultProps(item.localId, 'name')} />
                      </td>
                      <td>
                        <TextInput {...getDefaultProps(item.localId, 'text')} />
                      </td>
                      <td>
                        <TextInput {...getDefaultProps(item.localId, 'type')} />
                      </td>
                      <td>
                        <TextInput
                          {...getDefaultProps(item.localId, 'level')}
                        />
                      </td>
                      <td>
                        <TextInput
                          {...getDefaultProps(item.localId, 'parentId')}
                        />
                      </td>
                      <td>
                        <TextInput
                          {...getDefaultProps(item.localId, 'parentSeq')}
                        />
                      </td>
                      <td>
                        <TextInput
                          {...getDefaultProps(item.localId, 'projectType')}
                        />
                      </td>
                      <td>
                        <TextInput
                          {...getDefaultProps(item.localId, 'action')}
                        />
                      </td>
                    </SortableItem>
                  ))}
                </tbody>
              </SortableContext>
            </DndContext>
          </table>
        </StyledMain.Section>
      </StyledMain>
    </>
  );
};

export default TestsEditPage;

const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: bold;
`;
