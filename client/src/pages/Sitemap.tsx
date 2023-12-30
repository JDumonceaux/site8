import CustomNavLink from "../components/ui/CustomNavLink";
import { ROUTE_REACT, ROUTE_ROOT } from "../services/providers/routes";

function Sitemap() {
  return (
    <div>
      <h1>Sitemap</h1>
      <div></div>
      <div>
        This is not an actual sitemap - this is aspirational - what I'm working
        towards.
      </div>

      <ul>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Home</CustomNavLink>
        </li>
      </ul>
      <ul>
        <li>
          <CustomNavLink to={ROUTE_REACT}>React</CustomNavLink>
        </li>
      </ul>
      <ul>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Web Design Concepts</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Material Design</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Design Library</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Scrum</CustomNavLink>
        </li>
      </ul>
      <ul>
        Programming Principals
        <li>
          <CustomNavLink to={ROUTE_ROOT}>SOLID</CustomNavLink>
        </li>
      </ul>
      <ul>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Programming Problems</CustomNavLink>
        </li>
      </ul>
      <ul>
        References
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Flex Box</CustomNavLink>
        </li>
      </ul>

      <ul>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Architecture</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Art</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Artists</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Books</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Music</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Photography</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to={ROUTE_ROOT}>Blog</CustomNavLink>
        </li>
      </ul>

      {/* Home
React
Learning React
Visual Studio Code
GIT - Installing
HTML
CSS
Internationalization
Art
Books
Music

      </ul> */}
    </div>
  );
}

export default Sitemap;
