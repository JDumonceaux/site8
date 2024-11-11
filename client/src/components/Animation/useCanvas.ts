import { useEffect, useRef } from 'react';

const useCanvas = (draw: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount += 1;
      draw(context, frameCount);
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
