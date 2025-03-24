import React from 'react';

import Meta from 'components/core/Meta/Meta';
import PageTitle from 'components/core/PageTitle/PageTitle';
import Input from 'components/Input/Input';
import Layout from 'features/layouts/Layout/Layout';
import useForm from 'hooks/useForm';
import { styled } from 'styled-components';

type fields = Record<string, string>;

const InputPage = (): React.JSX.Element => {
  const title = 'Design - Input';

  const items: fields = {};

  for (const key of Object.keys(items)) {
    items[key] = '';
  }

  const { getFieldValue, setFieldValue } = useForm<fields>(items);

  return (
    <>
      <Meta title={title} />
      <Layout.Main>
        <Layout.Section>
          <PageTitle title={title} />
          <Grid>
            <GridItem>
              <Input.Text
                id="field1"
                label="First Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('field1', e.target.value);
                }}
                value={getFieldValue('field1')}
              />
              {/* Bare bones */}
            </GridItem>
            <GridItem>
              <Input.Text
                id="field2"
                label="First Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('field2', e.target.value);
                }}
                placeholder="Enter your first name"
                value={getFieldValue('field2')}
              />
              {/* - Placeholder */}
            </GridItem>
            <GridItem>
              <Input.Text
                id="field3"
                label="First Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('field3', e.target.value);
                }}
                placeholder="Enter your first name"
                required
                value={getFieldValue('field3')}
              />
              {/* - Required */}
            </GridItem>
            <GridItem>
              <Input.Text
                description="This is a required field"
                id="field4"
                label="First Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue('field4', e.target.value);
                }}
                placeholder="Enter your first name"
                required
                value={getFieldValue('field4')}
              />
            </GridItem>
          </Grid>
          <br />
          <br />
          <br />
          <br />
          <Grid>
            <GridItem>
              <Input.Select
                data={[
                  { key: '1', value: 'One' },
                  { key: '2', value: 'Two' },
                  { key: '3', value: 'Three' },
                ]}
                id="select150"
                label="Select"
                onChange={(e) => {
                  setFieldValue('field150', e.target.value);
                }}
                showBlankOption
                value={getFieldValue('field150')}
              />
            </GridItem>
            <GridItem>
              <Input.Select
                data={[
                  { key: '1', value: 'One' },
                  { key: '2', value: 'Two' },
                  { key: '3', value: 'Three' },
                ]}
                id="select151"
                label="Select"
                onChange={(e) => {
                  setFieldValue('field151', e.target.value);
                }}
                placeholder="Enter your first name"
                value={getFieldValue('field151')}
              />
            </GridItem>
            <GridItem>
              <Input.Select
                data={[
                  { key: '1', value: 'One' },
                  { key: '2', value: 'Two' },
                  { key: '3', value: 'Three' },
                ]}
                id="select152"
                label="Select"
                onChange={(e) => {
                  setFieldValue('field152', e.target.value);
                }}
                required
                //placeholder="Enter your first name"
                value={getFieldValue('field152')}
              />
            </GridItem>
            <GridItem>
              <Input.Select
                data={[
                  { key: '1', value: 'One' },
                  { key: '2', value: 'Two' },
                  { key: '3', value: 'Three' },
                ]}
                description="This is a required field"
                id="select153"
                label="Select"
                onChange={(e) => {
                  setFieldValue('field153', e.target.value);
                }}
                required
                //placeholder="Enter your first name"
                value={getFieldValue('field153')}
              />
            </GridItem>
          </Grid>
          <br />
          <br />
          <br />
          <br />
          <Grid>
            <GridItem>
              <Input.TextArea
                id="select250"
                label="TextArea"
                onChange={(e) => {
                  setFieldValue('field250', e.target.value);
                }}
                rows={10}
                //placeholder="Enter your first name"
                value={getFieldValue('field250')}
              />
            </GridItem>

            <GridItem>
              <Input.TextArea
                id="select251"
                label="TextArea"
                onChange={(e) => {
                  setFieldValue('field251', e.target.value);
                }}
                placeholder="Enter text"
                rows={10}
                value={getFieldValue('field251')}
              />
            </GridItem>
            <GridItem>
              <Input.TextArea
                id="select252"
                label="TextArea"
                onChange={(e) => {
                  setFieldValue('field252', e.target.value);
                }}
                placeholder="Enter text"
                required
                rows={10}
                value={getFieldValue('field252')}
              />
            </GridItem>
            <GridItem>
              <Input.TextArea
                description="This is a required field"
                id="select252"
                label="TextArea"
                onChange={(e) => {
                  setFieldValue('field252', e.target.value);
                }}
                placeholder="Enter text"
                required
                rows={10}
                value={getFieldValue('field252')}
              />
            </GridItem>
          </Grid>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <ol>
            <li>Light mode / Dark mode</li>
            <li>Shrink / Expand</li>
            <li>Hide or change elements on very small</li>
            <li>
              Test with accessibility tools
              <ul>
                <li>Color contrast</li>
                <li>Audio</li>
                <li>Aria-rules</li>
              </ul>
            </li>
            <li>
              Microinteractions
              <ul>
                <li>Unlock password</li>
                <li>Open email envelope</li>
              </ul>
            </li>
            <li>
              Animations
              <ul>
                <li>Focus / leave</li>
              </ul>
            </li>
            <li>Help expansion field</li>
            <li>Form validation</li>
            <li>
              List elements
              <ul>
                <li>Styling</li>
                <li>Selection</li>
                <li>Animation</li>
              </ul>
            </li>
            <li>Multirows?</li>
            <li>Character limit</li>
            <li>
              Variants
              <ul>
                <li>Default</li>
                <li>Discreet</li>
                <li>
                  Readonly
                  <ul>
                    <li>Cascade readonly to all elements</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Orientation
              <ul>
                <li>Vertical</li>
                <li>Horizontal</li>
                <li>Compact? Label shrinks into top border</li>
                <li>Animated underline</li>
              </ul>
            </li>
            <li>
              Sizes
              <ul>
                <li>Small</li>
                <li>Medium</li>
                <li>Large</li>
              </ul>
            </li>
            <li>
              Input scenarios
              <ul>
                <li>First name</li>
                <li>Last name</li>
                <li>Middle name</li>
                <li>Prefix</li>
                <li>Suffix</li>
                <li>Name as shown on card</li>
                <li>Preferred name</li>
                <li>Address1</li>
                <li>Address2</li>
                <li>City</li>
                <li>State</li>
                <li>Postal Code</li>
                <li>County</li>
                <li>SSN</li>
                <li>ID</li>
                <li>Credit card</li>
                <li>Birthdate</li>
                <li>Sex</li>
                <li>Preferred Sex</li>
              </ul>
            </li>
            <li>
              Testing
              <ul>
                <li>Browser Input</li>
              </ul>
            </li>
            <li>
              Mobile
              <ul>
                <li>Inputmode (keyboard)</li>
              </ul>
            </li>
            <li>
              Css options
              <ul>
                <li>User-select: none</li>
              </ul>
            </li>
            <li>Required vs. *</li>
            <li>Allow display of required</li>
            <li>
              Structured Input
              <ul>
                <li>( ) - </li>
              </ul>
            </li>
            <li>zod wrapper</li>
            <li>Suggest field names</li>
            <li>Tooltip.Help / Tooltip.Default</li>
            <li>Validate tabstops</li>
            <li>Lazy load</li>
            <li>Search - debounce</li>
            <li>
              Numbers -
              <ul>
                <li>Rotate - 7,8,9,1,2,3 if limited to a select</li>
                <li>Increment by 1, increment by 10</li>
              </ul>
            </li>
          </ol>
        </Layout.Section>
        <Layout.Section>
          <div>
            W3.org: Labels :
            https://www.w3.org/TR/2008/WD-WCAG20-TECHS-20080430/H44.html
          </div>
        </Layout.Section>
      </Layout.Main>
    </>
  );
};

export default InputPage;

const Grid = styled.div`
  --gap: 2em;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;
  gap: var(--gap);
`;
const GridItem = styled.div`
  --gap: 2em;
  --line-offset: calc(var(--gap) / 2);
  --line-thickness: 1px;
  --line-color: #dcdcdc;
  position: relative;
  ::after {
    content: '';
    position: absolute;
    background-color: var(--line-color);
    z-index: 1;
    inline-size: 100vw;
    block-size: var(--line-thickness);
    inset-inline-start: 0;
    inset-block-start: calc(var(--line-offset) * -1);
  }
  ::before {
    content: '';
    position: absolute;
    background-color: var(--line-color);
    z-index: 1;
    inline-size: var(--line-thickness);
    block-size: 100vh;
    inset-block-start: 0;
    inset-inline-start: calc(var(--line-offset) * -1);
  }
`;
