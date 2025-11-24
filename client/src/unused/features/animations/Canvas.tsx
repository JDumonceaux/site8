// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import React from 'react';

import useCanvas from './useCanvas';

const draw = (context: CanvasRenderingContext2D | null, frameCount: number) => {
  if (!context) return;
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillStyle = '#000';
  context.beginPath();
  context.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
  context.fill();
};

type CanvasProps = {
  height?: number | string;
  style?: React.CSSProperties;
  width?: number | string;
};

const Canvas = ({ ...rest }: CanvasProps) => {
  const canvasRef = useCanvas(draw);

  return (
    <canvas
      ref={canvasRef}
      {...rest}
    />
  );
};

export default Canvas;
