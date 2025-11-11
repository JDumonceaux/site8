import { type JSX, useEffect, useState } from 'react';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import useAppSettings from '@features/app/useAppSettings';
import Layout from '@features/layouts/Layout/Layout';
import SortableItem from '@features/tests/SortableItem';
import useTestsEdit from '@features/tests/useTestsEdit';
import styled from 'styled-components';
import Meta from '@/components/core/meta/Meta';
import PageTitle from '@/components/core/page-title/PageTitle';
import Input from '@/components/input/Input';
import StyledLink from '@/components/link/styled-link/StyledLink';
import StyledPlainButton from '@/components/link/styled-plain-button/StyledPlainButton';
import { Switch } from '@/components/switch/Switch';

// Do not remove comments
const TestsEditPage = (): JSX.Element | null => {
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
    const returnValue = data?.map((item) => ({
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
    if (returnValue) {
      setFormValues(returnValue);
    }
  }, [data, setFormValues]);

  const onShowPages = (checked: boolean) => {
    setShowPages(checked);
  };

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
            <StyledLink
              data-testid="nav-new"
              to="/admin/page/edit"
            >
              New
            </StyledLink>
            {isSaved ? null : (
              <StyledSaveButton
                data-testid="button-save"
                type="submit"
                onClick={handleSave}
              >
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
              sensors={sensors}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                <tbody>
                  {data?.map((item) => (
                    <SortableItem
                      key={item.lineId}
                      id={item.lineId}
                    >
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

TestsEditPage.displayName = 'TestsEditPage';
export default TestsEditPage;

const StyledSaveButton = styled(StyledPlainButton)`
  font-weight: bold;
`;
