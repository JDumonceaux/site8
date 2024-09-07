// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258

import useCanvas from './useCanvas';

type CanvasProps = {
  // Define the props for the Canvas component here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

const Canvas = ({ ...rest }: CanvasProps) => {
  const draw = (
    ctx: CanvasRenderingContext2D,
    frameCount: number | undefined,
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(
      50,
      100,
      20 * Math.sin((frameCount ?? 0) * 0.05) ** 2,
      0,
      2 * Math.PI,
    );
    ctx.fill();
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
