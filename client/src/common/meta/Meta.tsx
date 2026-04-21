// This rule doesn't apply here, but ESLint is not able to detect that.
 
 
import type { JSX } from 'react';

import { buildMetaTags, type MetaProps } from './meta-tags';

/**
 * Renders all specified meta and link tags in head.
 */
const Meta = (props: MetaProps): JSX.Element => {
  const tags = buildMetaTags(props);
  return <>{tags}</>;
};

Meta.displayName = 'Meta';
export default Meta;
