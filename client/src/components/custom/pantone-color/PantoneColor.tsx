import type { JSX } from 'react';

import styled from 'styled-components';

const PANTONE_LINK = 'https://www.pantone.com/color-of-the-year/2023';

/**
 * Displays a reference to the Pantone Color of the Year with a color swatch.
 */
const PantoneColor = (): JSX.Element => {
  return (
    <Wrapper>
      <Text>
        This page is inspired by the
        <Link
          href={PANTONE_LINK}
          rel="noopener noreferrer"
          target="_blank"
        >
          2023 Pantone® Color of the Year
        </Link>
        .
      </Text>
      <ColorFigure>
        <Swatch aria-label="Viva Magenta color swatch" />
        <FigCaption>Viva Magenta</FigCaption>
      </ColorFigure>
    </Wrapper>
  );
};

PantoneColor.displayName = 'PantoneColor';
export default PantoneColor;

/* -- styled components -- */

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
  font-family: 'Shadows Into Light', cursive;
  font-size: 1.1rem;
  color: var(--palette-grey-100, #000);
`;

const Text = styled.p`
  margin: 0 0 0.5rem;
`;

const Link = styled.a`
  color: var(--palette-main-color);
  text-decoration: underline;
  text-underline-position: under;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
`;

const ColorFigure = styled.figure`
  display: inline-grid;
  grid-template-columns: auto auto;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
`;

const Swatch = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background-color: var(--palette-main-color);
  border-radius: 50%;
`;

const FigCaption = styled.figcaption`
  margin: 0;
  font-weight: bold;
  color: var(--palette-main-color);
`;
