import ChangeLanguage from "../../../components/examples/ChangeLanguage/ChangeLanguage";

import "./footer.css";

export function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="main-footer">
      <div className="copyright">Copyright &copy; {thisYear}</div>
      <div>
        <ChangeLanguage />
      </div>
    </footer>
  );
}
