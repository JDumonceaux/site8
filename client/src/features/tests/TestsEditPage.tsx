import { useCallback, useEffect, useState } from 'react';

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
import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Input from 'components/Input/Input';
import Layout from 'features/layouts/Layout/Layout';
import StyledLink from 'components/Link/StyledLink/StyledLink';
import StyledPlainButton from 'components/Link/StyledPlainButton/StyledPlainButton';
import { Switch } from 'components/Switch/Switch';
import useAppSettings from 'features/app/useAppSettings';
import SortableItem from 'features/tests/SortableItem';
import useTestsEdit from 'features/tests/useTestsEdit';
import { styled } from 'styled-components';

const TestsEditPage = (): React.JSX.Element => {
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
      lineId: item.lineId,
      name: item.name,
      parentId: item.parent.id.toString(),
      parentSeq: item.parent.seq.toString(),
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
              onCheckedChange={(e) => {
                onShowPages(e);
              }}
            />
            <StyledLink data-testid="nav-new" to="/admin/page/edit">
              New
            </StyledLink>
            {isSaved ? null : (
              <StyledSaveButton
                data-testid="button-save"
                onClick={handleSave}
                type="submit">
                Save
              </StyledSaveButton>
            )}
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
                    <SortableItem id={item.lineId} key={item.lineId}>
                      <td>{item.id}</td>
                      <td>
                        <Input.Text {...getDefaultProps(item.lineId, 'name')} />
                      </td>
                      <td>
                        <Input.Text {...getDefaultProps(item.lineId, 'text')} />
                      </td>
                      <td>
                        <Input.Text {...getDefaultProps(item.lineId, 'type')} />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.lineId, 'level')}
                        />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.lineId, 'parentId')}
                        />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.lineId, 'parentSeq')}
                        />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.lineId, 'projectType')}
                        />
                      </td>
                      <td>
                        <Input.Text
                          {...getDefaultProps(item.lineId, 'action')}
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
