import { Helmet } from 'react-helmet-async';

// TODO: Polish up - handle missing items, keywords
type MetaProps = {
  readonly title?: string;
  readonly description?: string;
  readonly name?: string;
  readonly type?: 'article' | 'book' | 'profile' | 'website'; // See https://ogp.me/#types for more
};

/**
 * Renders the meta tags for the page.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the page.
 * @param {string} props.description - The description of the page.
 * @param {string} props.name - The name of the creator.
 * @param {string} props.type - The type of the page.
 * @returns {JSX.Element} The rendered Meta component.
 */
const Meta = ({ title, description, name, type }: MetaProps): JSX.Element => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta content={description} name="description" />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta content={type} property="og:type" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta content={name} name="twitter:creator" />
      <meta content={type} name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      {/* End Twitter tags */}
    </Helmet>
  );
};

export default Meta;
