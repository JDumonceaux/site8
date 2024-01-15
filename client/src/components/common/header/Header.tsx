import "./header.css";
import { APP_NAME } from "../../../utils/constants";

export default function Header() {
  return (
    <header className="main-header">
      <a href="#main" className="skip">
        Skip to main content
      </a>
      <div className="app-name">{APP_NAME}</div>
    </header>
  );
}
