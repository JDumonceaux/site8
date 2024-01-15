import ChangeLanguage from "../../../components/examples/ChangeLanguage/ChangeLanguage";

import "./footer.css";

export default function Footer() {
  const thisYear = new Date().getFullYear();
  return (
    <footer className="main-footer" role="contentinfo">
      <div className="copyright" aria-label="Copyright Information">
        Copyright &copy; {thisYear}
      </div>
      <div>
        <ChangeLanguage />
      </div>
    </footer>
  );
}
