import { Resources } from 'services/models/Resources';

type ResourcesProps = {
  readonly id?: number;
  readonly data?: Resources | null;
};

export const ResourceIList = ({ id, data }: ResourcesProps): JSX.Element => {
  return (
    <div className="loading-wrapper">
      <div>{id}</div>
      {data?.items?.map((item) => (
        <div className="card" key={item.id}>
          <h3>
            <a href="${item.url}">{item.name}</a>
          </h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};
