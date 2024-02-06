import './pantoneColor.css';

export function PantoneColor() {
  return (
    <div className="pantone-color">
      This page is inspired by the{' '}
      <a href=" https://www.pantone.com/color-of-the-year/2023">
        2023 Pantone&#174; Color of the Year
      </a>
      <div className="color-swatch">
        <div className="left1"></div>
        <div className="right1">Viva Magenta</div>
      </div>
    </div>
  );
}
