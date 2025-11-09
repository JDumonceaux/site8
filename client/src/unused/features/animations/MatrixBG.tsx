import { type JSX, useEffect, useRef, useState } from 'react';

import { Canvas3 } from './Canvas3';

// https://medium.com/@ruse.marshall/converting-a-vanilla-js-canvas-animation-to-react-78443bad6d7b
export const MatrixBG = (): JSX.Element => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<null | number>(null);

  // Setting up the letters
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
  const letters = [...chars];
  // Font-size remains constant, so similarly move outside draw
  const fontSize = 10;
  // Setting up the columns
  const columns = canvasWidth ? canvasWidth / fontSize : 10;
  // Setting up the drops - use useRef to persist across renders
  const dropsRef = useRef<number[]>([]);

  // Initialize drops when columns change
  useEffect(() => {
    dropsRef.current = Array.from({ length: columns }, () => 1);
  }, [columns]);

  const draw = () => {
    if (context === null) return;

    const tempContext = { ...context, fillStyle: 'rgba(0, 0, 0, .1)' };
    // Draw to the canvas

    tempContext.fillRect(
      0,
      0,
      tempContext.canvas.width,
      tempContext.canvas.height,
    );
    for (let index = 0; index < dropsRef.current.length; index++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      tempContext.fillStyle = '#0f0';
      tempContext.fillText(
        text,
        index * fontSize,
        dropsRef.current[index] * fontSize,
      );
      dropsRef.current[index] += 1;
      if (
        dropsRef.current[index] * fontSize > tempContext.canvas.height &&
        Math.random() > 0.95
      ) {
        dropsRef.current[index] = 0;
      }
    }
    setContext(tempContext);
  };

  const establishContext = (value: CanvasRenderingContext2D | null) => {
    setContext(value);
  };

  const establishCanvasWidth = (width: number) => {
    setCanvasWidth(width);
  };

  return (
    <Canvas3
      draw={draw}
      establishCanvasWidth={establishCanvasWidth}
      establishContext={establishContext}
    />
  );
};
