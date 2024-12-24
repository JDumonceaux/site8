// eslint-disable-next-line no-warning-comments
// TODO: Polish up - handle missing items, keywords
type MetaProps = {
  readonly description?: string;
  readonly name?: string;
  readonly title?: string;
  // eslint-disable-next-line no-inline-comments
  readonly type?: 'article' | 'book' | 'profile' | 'website'; // See https://ogp.me/#types for more
};

const Meta = ({
  description,
  name,
  title,
  type,
}: MetaProps): React.JSX.Element => {
  return (
    <>
      {title ? <title>{title}</title> : null}
      {/* Standard metadata tags */}
      {description ? <meta content={description} name="description" /> : null}
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      {type ? <meta content={type} property="og:type" /> : null}
      {title ? <meta content={title} property="og:title" /> : null}
      {description ? (
        <meta content={description} property="og:description" />
      ) : null}
      {/* End Facebook tags */}
      {/* Twitter tags */}
      {name ? <meta content={name} name="twitter:creator" /> : null}
      {type ? <meta content={type} name="twitter:card" /> : null}
      {title ? <meta content={title} name="twitter:title" /> : null}
      {description ? (
        <meta content={description} name="twitter:description" />
      ) : null}
      {/* End Twitter tags */}
    </>
  );
};

export default Meta;
