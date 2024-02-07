type ResourcesProps = {
  id: number;
};

export function Resources({ id }: ResourcesProps): JSX.Element {
  return (
    <div className="loading-wrapper">
      {/* {data?.items?.map((item) => (
        <div className='card' key={item.id}>
          <h3>
            <a href='${item.url}'>{item.name}</a>
          </h3>
          <p>{item.description}</p>
        </div>
      ))} */}
    </div>
  );
}
