import { createAnimation } from './helpers/animation';
import type { LoaderSizeProps } from './helpers/props';
import { cssValue, parseLengthAndUnit } from './helpers/unitConverter';
import styled from 'styled-components';

const defaultCssOverride = {};

const right = createAnimation(
  'RingLoader',
  '0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)} 100% {transform: rotateX(180deg) rotateY(360deg) rotateZ(360deg)}',
  'right',
);

const left = createAnimation(
  'RingLoader',
  '0% {transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg)} 100% {transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg)}',
  'left',
);

const Wrapper = styled.span<{
  size: number | string;
}>`
  display: inherit;
  height: ${({ size }) => cssValue(size)};
  position: relative;
  width: ${({ size }) => cssValue(size)};
`;

const Ring = styled.span<{
  color: string;
  index: number;
  size: number;
  speedMultiplier: number;
  unit: string;
}>`
  animation: ${({ index }) => (index === 1 ? right : left)}
    ${({ speedMultiplier }) => 2 / speedMultiplier}s 0s infinite linear;
  animation-fill-mode: forwards;
  border: ${({ color, size, unit }) => `${size / 10}${unit} solid ${color}`};
  border-radius: 100%;
  height: ${({ size, unit }) => `${size}${unit}`};
  left: 0;
  opacity: 0.4;
  perspective: 800px;
  position: absolute;
  top: 0;
  width: ${({ size, unit }) => `${size}${unit}`};
`;

const RingLoader = ({
  color = '#000000',
  cssOverride: _cssOverride = defaultCssOverride,
  loading = true,
  size = 60,
  speedMultiplier = 1,
  ...additionalprops
}: LoaderSizeProps) => {
  const { unit, value } = parseLengthAndUnit(size);

  if (!loading) {
    return null;
  }

  return (
    <Wrapper
      size={size}
      {...additionalprops}
    >
      <Ring
        index={1}
        size={value}
        speedMultiplier={speedMultiplier}
        unit={unit}
        color={color}
      />
      <Ring
        index={2}
        size={value}
        speedMultiplier={speedMultiplier}
        unit={unit}
        color={color}
      />
    </Wrapper>
  );
};

export default RingLoader;
