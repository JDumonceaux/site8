import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from 'react';

type Canvas3Props = {
  readonly backgroundColor?: string;
  readonly draw: () => void;
  readonly fps?: number;
  readonly height?: string;
  readonly width?: string;
};

export const Canvas3 = ({
  backgroundColor = '#000',
  draw,
  fps = 15,
  height = '100%',
  width = '100%',
}: Canvas3Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const resizeCanvas = useCallback(
    (canvasContext: CanvasRenderingContext2D) => {
      const { canvas } = canvasContext;
      const rect = canvas.getBoundingClientRect();
      const rectHeight = rect.height;
      const rectWidth = rect.width;

      if (canvas.width !== rectWidth || canvas.height !== rectHeight) {
        const { devicePixelRatio: ratio = 1 } = globalThis;
        canvas.width = rectWidth * ratio;
        canvas.height = rectHeight * ratio;
        canvasContext.scale(ratio, ratio);
        return true;
      }
      return false;
    },
    [],
  );

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context2d = canvas.getContext('2d');
      if (!context2d) return;
      setContext(context2d);
      resizeCanvas(context2d);
    }
  }, [resizeCanvas]);

  const drawEffect = useEffectEvent(draw);

  useEffect(() => {
    let animationFrameId: number;
    let fpsInterval = 1000 / fps;
    let now = 0;
    let then = Date.now();
    let elapsed = 0;

    if (context && typeof context === 'object' && 'canvas' in context) {
      const render = () => {
        animationFrameId = globalThis.requestAnimationFrame(render);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
          then = now - (elapsed % fpsInterval);
          drawEffect();
        }
      };
      fpsInterval = 1000 / fps;
      then = Date.now();
      render();
    }
    return () => {
      globalThis.cancelAnimationFrame(animationFrameId);
    };
  }, [context, fps]);

  return (
    <canvas
      ref={canvasRef}
      {...(backgroundColor ? { style: { backgroundColor } } : {})}
      height={height}
      width={width}
    >
      Canvas not supported
    </canvas>
  );
};
