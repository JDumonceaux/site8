import { styled } from 'styled-components';

function Greeting({ name }: { name: string }) {
  return <h1>Hello, World {name}</h1>;
}

export const TikTokItem = () => {
  return (
    <StyledDiv>
      <Greeting name={'tam'} />
      <StyledElement
        allow="encrypted-media;"
        scrolling="no"
        src="https://www.tiktok.com/embed/7351596915869420830"
        title="TikTok"
      />
    </StyledDiv>
  );
};

export default TikTokItem;

const StyledDiv = styled.div`
  height: 500px;
  position: relative;
`;
const StyledElement = styled.iframe`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  border: 0;
`;
