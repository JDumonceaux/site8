import { IResources } from 'services/api/models/resources/IResources';

type ResourcesProps = {
  readonly id?: number;
  readonly data?: IResources | null;
};

export const Resources = ({ id, data }: ResourcesProps): JSX.Element => {
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
