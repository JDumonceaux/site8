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


import SortableItem from 'components/pages/TestEditPage/SortableItem';

import StyledLink from 'components/Link/StyledLink/StyledLink';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import { Switch } from 'components/Switch/Switch';
import useAppSettings from 'hooks/useAppSettings';
import useTestsEdit from 'hooks/useTestsEdit';
import { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Layout from 'components/layouts/Layout/Layout';
import Input from 'components/Input/Input';

const TestsEditPage = (): JSX.Element => {
  const { data, getDefaultProps, handleSave, isSaved, setFormValues } =
    useTestsEdit();

  const [items, setItems] = useState([1, 2, 3]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { setShowPages, showPages } = useAppSettings();

  useEffect(() => {
    const ret = data?.map((item) => ({
        action: '',
        id: item.id,
        level: item.level?.toString(),
        localId: item.localId,
        name: item.name,
        parentId: item.parent?.id.toString(),
        parentSeq: item.parent?.seq.toString(),
        projectType: item.projectType?.toString(),
        text: item.text,
        type: item.type?.toString(),
      }));
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
      <Layout.Main>
        <Layout.Section>
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
                        <Input.Text {...getDefaultProps(item.localId, 'name')} />
                      </td>
                      <td>
                        <Input.Text {...getDefaultProps(item.localId, 'text')} />
                      </td>
                      <td>
                        <Input.Text {...getDefaultProps(item.localId, 'type')} />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.localId, 'level')}
                        />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.localId, 'parentId')}
                        />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.localId, 'parentSeq')}
                        />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.localId, 'projectType')}
                        />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.localId, 'action')}
                        />
                      </td>
                    </SortableItem>
                  ))}
                </tbody>
              </SortableContext>
            </DndContext>
          </table>
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

export default TestsEditPage;

const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: bold;
`;
