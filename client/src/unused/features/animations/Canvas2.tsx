import { useEffect, useRef, useState } from 'react';

type Canvas2Props = {
  readonly backgroundColor?: string;
  readonly height?: string;
  readonly width?: string;
};

export const Canvas2 = ({
  backgroundColor = '#000',
  height = '100%',
  width = '100%',
}: Canvas2Props): React.JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const resizeCanvas = (context: {
    canvas: any;
    scale: (arg0: number, arg1: number) => void;
  }) => {
    const { canvas } = context;
    const { height, width } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = globalThis;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
      return true;
    }
    return false;
  };

  useEffect(() => {
    //i.e. value other than null or undefined
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      setContext(ctx);
    }
  }, []);

  const draw = (frameCount: number) => {
    if (context === null) return;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = '#000000';
    context.beginPath();
    context.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    context.fill();
  };

  useEffect(() => {
    let frameCount = 0;
    let animationFrameId: number;

    // Check if null context has been replaced on component mount
    if (context) {
      //Our draw came here
      const render = () => {
        resizeCanvas(context);
        frameCount += 1;
        draw(frameCount);
        animationFrameId = globalThis.requestAnimationFrame(render);
      };
      render();
    }
    return () => {
      globalThis.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, context]);

  return (
    <canvas ref={canvasRef} style={{ backgroundColor, height, width }}>
      Canvas not supported
    </canvas>
  );
};
