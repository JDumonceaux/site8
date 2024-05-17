import { useEffect, useRef, useState } from 'react';

type Canvas3Props = {
  readonly draw: () => void;
  readonly backgroundColor?: string;
  readonly height?: string;
  readonly width?: string;
  readonly fps?: number;
  readonly establishContext?: (value: CanvasRenderingContext2D | null) => void;
  readonly establishCanvasWidth?: (width: number) => void;
};

export const Canvas3 = ({
  draw,
  backgroundColor = '#000',
  height = '100%',
  width = '100%',
  fps = 15,
  establishContext,
  establishCanvasWidth,
}: Canvas3Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const resizeCanvas = (context: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canvas: any;
    scale: (arg0: number, arg1: number) => void;
  }) => {
    const canvas = context.canvas;
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      if (establishCanvasWidth) {
        establishCanvasWidth(canvas.width);
      }
      context.scale(ratio, ratio);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx === null) return;
      setContext(ctx);
      resizeCanvas(ctx);
      if (establishContext) {
        establishContext(ctx);
      }
    }
  }, [establishContext, resizeCanvas]);

  useEffect(() => {
    let animationFrameId: number;
    let frameCount = 0;
    let fpsInterval = 1000 / 30;
    let now = 0;
    let then = Date.now();
    let elapsed = 0;

    // Check if null context has been replaced on component mount
    if (context) {
      //Our draw came here
      const render = () => {
        animationFrameId = window.requestAnimationFrame(render);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
          then = now - (elapsed % fpsInterval);
          frameCount++;
          draw();
        }
      };

      const startRendering = (fps: number) => {
        fpsInterval = 1000 / fps;
        then = Date.now();
        render();
      };

      startRendering(fps);
    }
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, context, fps]);

  return (
    <canvas ref={canvasRef} style={{ width, height, backgroundColor }}>
      Canvas not supported
    </canvas>
  );
};
