import { useEffect, useRef, useState } from 'react';

type Canvas3Props = {
  readonly backgroundColor?: string;
  readonly draw: () => void;
  readonly establishCanvasWidth?: (width: number) => void;
  readonly establishContext?: (value: CanvasRenderingContext2D | null) => void;
  readonly fps?: number;
  readonly height?: string;
  readonly width?: string;
};

export const Canvas3 = ({
  backgroundColor = '#000',
  draw,
  establishCanvasWidth,
  establishContext,
  fps = 15,
  height = '100%',
  width = '100%',
}: Canvas3Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const resizeCanvas = (context: {
    canvas: any;
    scale: (argument0: number, argument1: number) => void;
  }) => {
    const { canvas } = context;
    const { height, width } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = globalThis;
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
      const canvasContext = canvas.getContext('2d');
      if (canvasContext === null) return;
      setContext(canvasContext);
      resizeCanvas(canvasContext);
      if (establishContext) {
        establishContext(canvasContext);
      }
    }
  }, [establishContext, resizeCanvas]);

  useEffect(() => {
    let animationFrameId: number;
    let fpsInterval = 1000 / 30;
    let now = 0;
    let then = Date.now();
    let elapsed = 0;

    // Check if null context has been replaced on component mount
    if (context) {
      //Our draw came here
      const render = () => {
        animationFrameId = globalThis.requestAnimationFrame(render);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
          then = now - (elapsed % fpsInterval);
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
      globalThis.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, context, fps]);

  return (
    <canvas
      ref={canvasRef}
      style={{ backgroundColor, height, width }}
    >
      Canvas not supported
    </canvas>
  );
};
