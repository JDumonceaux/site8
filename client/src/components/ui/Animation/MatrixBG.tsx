import { useState } from 'react';
import { Canvas3 } from './Canvas3';

// https://medium.com/@ruse.marshall/converting-a-vanilla-js-canvas-animation-to-react-78443bad6d7b
export function MatrixBG(): JSX.Element {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number | null>(null);

  // Setting up the letters
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
  const letters = chars.split('');
  // Font-size remains constant, so similarly move outside draw
  const fontSize = 10;
  // Setting up the columns
  const columns = canvasWidth ? canvasWidth / fontSize : 10;
  // Setting up the drops
  const drops: number[] = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  const draw = () => {
    if (ctx === null) return;
    if (ctx) {
      // Draw to the canvas
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = '#0f0';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > ctx.canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }
  };

  const establishContext = (value: CanvasRenderingContext2D | null) => {
    setCtx(value);
  };

  const establishCanvasWidth = (width: number) => {
    setCanvasWidth(width);
  };

  return (
    <Canvas3
      draw={draw}
      establishContext={establishContext}
      establishCanvasWidth={establishCanvasWidth}
    />
  );
}
