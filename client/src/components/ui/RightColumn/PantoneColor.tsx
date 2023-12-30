import "./pantoneColor.css";

export function PantoneColor() {
  return (
    <div className="pantone-color">
      This page is inspired by the{" "}
      <a href=" https://www.pantone.com/color-of-the-year/2023">
        2023 Pantone&#174; Color of the Year
      </a>
      <div className="color-swatch">
        <div className="col-left"></div>
        <div className="col-right">Viva Magenta</div>
      </div>
    </div>
  );
}
