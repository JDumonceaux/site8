// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import useCanvas from './useCanvas';

type CanvasProps = {
  // Define the props for the Canvas component here
};

const Canvas = ({ ...rest }: CanvasProps) => {
  const draw = (
    context: CanvasRenderingContext2D,
    frameCount: number | undefined,
  ) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = '#000';
    context.beginPath();
    context.arc(
      50,
      100,
      20 * Math.sin((frameCount ?? 0) * 0.05) ** 2,
      0,
      2 * Math.PI,
    );
    context.fill();
  };

  const canvasRef = useCanvas(draw);

  return (
    <canvas
      ref={canvasRef}
      {...rest}
    />
  );
};

export default Canvas;
