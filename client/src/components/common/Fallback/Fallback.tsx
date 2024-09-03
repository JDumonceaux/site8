import PageTitle from 'components/ui/PageTitle/PageTitle';
import { memo } from 'react';
import { styled } from 'styled-components';

/**
 * Renders a fallback component that displays a loading state.
 *
 * @returns The JSX element representing the fallback component.
 */
const Fallback = (): JSX.Element => {
  return (
    <div aria-busy="true" data-testid="footer" role="status">
      <PageTitle title="Loading" />
      {[...Array(5)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LoadingLine key={index} />
      ))}
    </div>
  );
};

export default memo(Fallback);

const LoadingLine = styled.div`
  background: var(--palette-grey-10);
  height: 20px;
  width: 100%;
  margin-bottom: 5px;
`;
