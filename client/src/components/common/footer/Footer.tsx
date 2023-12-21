import "./footer.css";

const Footer = () => {
  const thisYear = new Date().getFullYear();
  return <footer>Copyright &copy; {thisYear} </footer>;
};

export default Footer;
