import { ServiceUrl } from 'utils';

import { useDeferredValue } from 'react';
import { Page } from 'services/types/Page';
import useFetch from 'services/hooks/useFetch';

import { LoadingWrapper } from 'components/common/Loading';
import { Meta } from 'components/common/Meta';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import StyledTable from 'components/common/StyledTable';

export const CheatPage = (): JSX.Element => {
  const routeParams = useParams<{
    id: string;
    title: string;
  }>();
  const { data, isLoading, error } = useFetch<Page>(
    `${ServiceUrl.ENDPOINT_PAGE}/${routeParams.id}`,
  );

  const deferredData = useDeferredValue(data);

  const title = deferredData?.long_title ?? routeParams.title ?? 'Cheat Page';

  return (
    <>
      <Meta title={title} />
      <StyledMain>
        <LoadingWrapper error={error} isLoading={isLoading}>
          <div>Content</div>
          <StyledTable>
            <StyledTable.Head>
              <StyledTable.Row>
                <th>Type</th>
                <th>Html</th>
                <th>Sample</th>
                <th>Notes</th>
              </StyledTable.Row>
            </StyledTable.Head>
            <tbody>
              <StyledTable.Row>
                <td>default</td>
                <td>
                  <samp>{`<input type="text" />`}</samp>
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>type is optional</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td>email</td>
                <td>
                  <samp>{`<input type="email" />`}</samp>
                </td>
                <td>
                  <input type="email" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>hidden</td>
                <td>
                  <samp>{`<input type="hidden" />`}</samp>
                </td>
                <td>
                  <input type="hidden" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>password</td>
                <td>
                  <samp>{`<input type="password" />`}</samp>
                </td>
                <td>
                  <input type="password" />
                </td>
                <td>
                  masks the input with ***. To show, change the type to
                  &apos;text&apos;
                </td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td>tel</td>
                <td>
                  <samp>{`<input type="tel" />`}</samp>
                </td>
                <td>
                  <input type="tel" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>search</td>
                <td>
                  <samp>{`<input type="search" />`}</samp>
                </td>
                <td>
                  <input type="search" />
                </td>
                <td>search adds the x to clear the field</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td colSpan={4}>Time</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td>date</td>
                <td>
                  <samp>{`<input type="date" />`}</samp>
                </td>
                <td>
                  <input type="date" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>time</td>
                <td>
                  <samp>{`<input type="time" />`}</samp>
                </td>
                <td>
                  <input type="time" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td colSpan={4}>Time</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td>month</td>
                <td>
                  <samp>{`<input type="month" />`}</samp>
                </td>
                <td>
                  <input type="month" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>week</td>
                <td>
                  <samp>{`<input type="week" />`}</samp>
                </td>
                <td>
                  <input type="week" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>datetime</td>
                <td>
                  <samp>{`<input type="datetime" />`}</samp>
                </td>
                <td>
                  <input type="datetime" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>datetime-local</td>
                <td>
                  <samp>{`<input type="datetime-local" />`}</samp>
                </td>
                <td>
                  <input type="datetime-local" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td colSpan={4}>Time</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td>month</td>
                <td>
                  <samp>{`<input type="month" />`}</samp>
                </td>
                <td>
                  <input type="month" />
                </td>
                <td>03/2024 - Not supported Safari, Firefox</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td>week</td>
                <td>
                  <samp>{`<input type="week" />`}</samp>
                </td>
                <td>
                  <input type="week" />
                </td>
                <td>03/2024 - Not supported Safari, Firefox</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td colSpan={4}>Numeric</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td>number</td>
                <td>
                  <samp>{`<input type="number" />`}</samp>
                </td>
                <td>
                  <input type="number" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>range</td>
                <td>
                  <samp>{`<input type="range" />`}</samp>
                </td>
                <td>
                  <input type="range" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td colSpan={4}>Buttons</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td>button</td>
                <td>
                  <samp>{`<input type="button" />`}</samp>
                </td>
                <td>
                  <input type="button" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>reset</td>
                <td>
                  <samp>{`<input type="reset" />`}</samp>
                </td>
                <td>
                  <input type="reset" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>submit</td>
                <td>
                  <samp>{`<input type="submit" />`}</samp>
                </td>
                <td>
                  <input type="submit" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>image</td>
                <td>
                  <samp>{`<input alt="" type="image" />`}</samp>
                </td>
                <td>
                  <input alt="" type="image" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td colSpan={4}>Etc.</td>
              </StyledTable.Row>
              <StyledTable.Row>
                <td>color</td>
                <td>
                  <samp>{`<input type="color" />`}</samp>
                </td>
                <td>
                  <input type="color" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>file</td>
                <td>
                  <samp>{`<input type="file" />`}</samp>
                </td>
                <td>
                  <input type="file" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>radio</td>
                <td>
                  <samp>{`<input type="radio" />`}</samp>
                </td>
                <td>
                  <input type="radio" />
                </td>
                <td />
              </StyledTable.Row>
              <StyledTable.Row>
                <td>checkbox</td>
                <td>
                  <samp>{`<input type="checkbox" />`}</samp>
                </td>
                <td>
                  <input type="checkbox" />
                </td>
                <td />
              </StyledTable.Row>
            </tbody>
          </StyledTable>

          <div>Additional Resources:</div>
          <div>
            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input">
              Mozilla - Input
            </a>
          </div>

          <div>
            <a href="https://react.dev/reference/react-dom/components/input">
              React Input
            </a>
          </div>
          <div>
            <a href="https://www.w3schools.com/tags/tag_input.asp">
              W3Schools Input
            </a>
          </div>
          <div>
            <a href="https://caniuse.com/?search=input">Can I Use - Input</a>
          </div>
          <div>
            <a href="https://a11y-101.com/development/inputs">
              A11Y-101 Input (Accessibility)
            </a>
          </div>
        </LoadingWrapper>
      </StyledMain>
    </>
  );
};

export default CheatPage;

const StyledMain = styled.main`
  background-size: contain;
`;
