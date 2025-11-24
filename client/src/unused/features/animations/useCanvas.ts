import { useEffect, useRef } from 'react';

const useCanvas = (
  draw: (context: CanvasRenderingContext2D | null, frameCount: number) => void,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    let frameCount = 0;
    let animationFrameId = 0;

    const render = () => {
      frameCount += 1;
      if (context) {
        draw(context, frameCount);
      }
      animationFrameId = globalThis.requestAnimationFrame(render);
    };
    render();

    return () => {
      globalThis.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
