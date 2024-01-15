import CustomNavLink from "../components/ui/CustomNavLink";

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
          <CustomNavLink to="/">Home</CustomNavLink>
        </li>
      </ul>
      <ul>
        <li>
          <CustomNavLink to="/react">React</CustomNavLink>
        </li>
      </ul>
      <ul>
        <li>
          <CustomNavLink to="/">Web Design Concepts</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/">Material Design</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/">Design Library</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/">Scrum</CustomNavLink>
        </li>
      </ul>
      <ul>
        Programming Principals
        <li>
          <CustomNavLink to="/">SOLID</CustomNavLink>
        </li>
      </ul>
      <ul>
        <li>
          <CustomNavLink to="/">Programming Problems</CustomNavLink>
        </li>
      </ul>
      <ul>
        References
        <li>
          <CustomNavLink to="/">Flex Box</CustomNavLink>
        </li>
      </ul>

      <ul>
        <li>
          <CustomNavLink to="/">Architecture</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/">Art</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/">Artists</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/">Books</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/">Music</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/">Photography</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/">Blog</CustomNavLink>
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
