import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';

export type LengthType = number | string;

type CommonProps = {
  color?: string;
  cssOverride?: CSSProperties;
  loading?: boolean;
  speedMultiplier?: number;
} & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export type LoaderHeightWidthProps = {
  height?: LengthType;
  width?: LengthType;
} & CommonProps;

export type LoaderSizeProps = {
  size?: LengthType;
} & CommonProps;

export type LoaderSizeMarginProps = {
  margin?: LengthType;
  size?: LengthType;
} & CommonProps;

export type LoaderHeightWidthRadiusProps = {
  height?: LengthType;
  margin?: LengthType;
  radius?: LengthType;
  width?: LengthType;
} & CommonProps;
