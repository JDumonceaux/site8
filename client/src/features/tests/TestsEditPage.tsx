import { type JSX, useEffect, useEffectEvent } from 'react';

import Meta from '@components/core/meta/Meta';
import PageTitle from '@components/core/page/PageTitle';
import useAppSettings from '@features/app/useAppSettings';
import Layout from '@features/layouts/layout/Layout';
import TestsEditHeader from '@features/tests/TestsEditHeader';
import TestItemsTable from '@features/tests/TestItemsTable';
import useTestsDragAndDrop from '@features/tests/useTestsDragAndDrop';
import useTestsEdit from '@features/tests/useTestsEdit';

// Do not remove comments
const TestsEditPage = (): JSX.Element | null => {
  const { data, getDefaultProps, handleSave, isSaved, setFormValues } =
    useTestsEdit();

  const { handleDragEnd, items } = useTestsDragAndDrop();
  const { setShowPages, showPages } = useAppSettings();

  const setFormValuesEvent = useEffectEvent(() => {
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
  });

  useEffect(() => {
    setFormValuesEvent();
  }, [data]);

  const handleShowPagesChange = (checked: boolean) => {
    setShowPages(checked);
  };

  const handleSaveClick = () => {
    void handleSave();
  };

  if (!data) return null;

  return (
    <>
      <Meta title="Tests" />
      <Layout.Main>
        <Layout.Section>
          <PageTitle title="Tests">
            <TestsEditHeader
              isSaved={isSaved}
              onSave={handleSaveClick}
              onShowPagesChange={handleShowPagesChange}
              showPages={showPages}
            />
          </PageTitle>
          <TestItemsTable
            data={data}
            getDefaultProps={getDefaultProps}
            items={items}
            onDragEnd={handleDragEnd}
          />
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

TestsEditPage.displayName = 'TestsEditPage';
export default TestsEditPage;
