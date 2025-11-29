import { type JSX, useEffect, useEffectEvent, useRef } from 'react';

import styled from 'styled-components';

type Canvas2Props = {
  readonly backgroundColor?: string;
  readonly height?: string;
  readonly width?: string;
};

export const Canvas2 = ({
  backgroundColor = '#000',
  height = '100%',
  width = '100%',
}: Canvas2Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const resizeCanvas = (canvasContext: CanvasRenderingContext2D) => {
    const { canvas } = canvasContext;
    const { height: rectHeight, width: rectWidth } =
      canvas.getBoundingClientRect();

    if (canvas.width !== rectWidth || canvas.height !== rectHeight) {
      const { devicePixelRatio: ratio = 1 } = globalThis;
      canvas.width = rectWidth * ratio;
      canvas.height = rectHeight * ratio;
      canvasContext.scale(ratio, ratio);
      return true;
    }
    return false;
  };

  useEffect(() => {
    //i.e. value other than null or undefined
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const canvasContext = canvas.getContext('2d');
      contextRef.current = canvasContext;
    }
  }, []);

  const draw = useEffectEvent((frameCount: number) => {
    const context = contextRef.current;
    if (context === null) return;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = '#000000';
    context.beginPath();
    context.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    context.fill();
  });

  useEffect(() => {
    let frameCount = 0;
    let animationFrameId: number;

    if (contextRef.current) {
      const render = () => {
        resizeCanvas(contextRef.current as CanvasRenderingContext2D);
        frameCount += 1;
        draw(frameCount);
        animationFrameId = globalThis.requestAnimationFrame(render);
      };
      render();
    }
    return () => {
      globalThis.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <StyledCanvas
      ref={canvasRef}
      $height={height}
      $width={width}
      $backgroundColor={backgroundColor}
    >
      Canvas not supported
    </StyledCanvas>
  );
};

const StyledCanvas = styled.canvas<{
  $backgroundColor: string;
  $height: string;
  $width: string;
}>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  height: ${({ $height }) => $height};
  width: ${({ $width }) => $width};
`;
