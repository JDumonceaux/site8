import "./header.css";
import { APP_NAME } from "../../../utils/constants";

export function Header() {
  return (
    <header className="main-header">
      <div className="app-name">{APP_NAME}</div>
    </header>
  );
}
