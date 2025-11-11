import * as React from 'react';

import type { LoaderSizeProps } from './helpers/props';
import { createAnimation } from './helpers/animation';
import { cssValue, parseLengthAndUnit } from './helpers/unitConverter';

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

const RingLoader = ({
  color = '#000000',
  cssOverride = {},
  loading = true,
  size = 60,
  speedMultiplier = 1,
  ...additionalprops
}: LoaderSizeProps) => {
  const { unit, value } = parseLengthAndUnit(size);

  const wrapper: React.CSSProperties = {
    display: 'inherit',
    height: cssValue(size),
    position: 'relative',
    width: cssValue(size),
    ...cssOverride,
  };

  const style = (index: number): React.CSSProperties => {
    return {
      animation: `${index === 1 ? right : left} ${2 / speedMultiplier}s 0s infinite linear`,
      animationFillMode: 'forwards',
      border: `${value / 10}${unit} solid ${color}`,
      borderRadius: '100%',
      height: `${value}${unit}`,
      left: '0',
      opacity: '0.4',
      perspective: '800px',
      position: 'absolute',
      top: '0',
      width: `${value}${unit}`,
    };
  };

  if (!loading) {
    return null;
  }

  return (
    <span
      style={wrapper}
      {...additionalprops}
    >
      <span style={style(1)} />
      <span style={style(2)} />
    </span>
  );
};

export default RingLoader;
