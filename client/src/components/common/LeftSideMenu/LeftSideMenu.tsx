import CustomNavLink from "../../ui/CustomNavLink";
import "./leftSideMenu.css";

export function LeftSideMenu() {
  return (
    <div className="left-side-menu">
      <nav aria-label="Home Navigation">
        <ul>
          <li>
            <CustomNavLink to="/" ariaLabel="Home">
              Home
            </CustomNavLink>
          </li>
        </ul>
      </nav>

      <nav role="navigation" aria-labelledby="reactmenu">
        <div id="reactmenu">React</div>
        <ul>
          <li>
            <CustomNavLink to="/react" ariaLabel="Learning React">
              Learning React
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/react/vss" ariaLabel="Visual Studio Code">
              Visual Studio Code
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/react/git">GIT - Installing</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/react/intl">Internationalization</CustomNavLink>
          </li>
        </ul>
      </nav>

      <nav role="navigation" aria-labelledby="webdevelopmentmenu">
        <div id="webdevelopmentmenu">Web Development</div>
        <ul>
          <li>
            <CustomNavLink to="/web/html">Html</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/web/test-grid">Test Grid</CustomNavLink>
          </li>
        </ul>
      </nav>

      <nav role="navigation" aria-labelledby="idesetupmenu">
        <div id="idesetupmenu">IDE Setup</div>
        <div>
          <CustomNavLink to="/web/chrome" ariaLabel="Chrome">
            Chrome
          </CustomNavLink>
        </div>
        <div>
          <CustomNavLink
            to="/web/visual-studio-code"
            ariaLabel="Visual Studio Code"
          >
            Visual Studio Code
          </CustomNavLink>
        </div>
        <div>
          <CustomNavLink
            to="/web/visual-studio-code/extensions"
            ariaLabel="Visual Studio Code Extensions"
          >
            Visual Studio Code - Extensions
          </CustomNavLink>
        </div>
        <div>
          <CustomNavLink to="/web/npm" ariaLabel="NPM">
            NPM
          </CustomNavLink>
        </div>

        <div>
          <CustomNavLink to="/web/git" ariaLabel="Git">
            Git
          </CustomNavLink>
        </div>

        <div>
          <CustomNavLink to="/web/git-hub" ariaLabel="Git Hub">
            Git Hub
          </CustomNavLink>
        </div>
      </nav>
      <nav role="navigation" aria-labelledby="cssmenu">
        <div id="cssmenu">CSS</div>
        <ul>
          <li>
            <CustomNavLink to="/web/css" ariaLabel="CSS">
              CSS
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink
              to="/web/material-design"
              ariaLabel="Material Design"
            >
              Material Design
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink
              to="/web/responsive-design"
              ariaLabel="Responsive Design"
            >
              Responsive Design
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/web/print-design" ariaLabel="Print Design">
              Print Design
            </CustomNavLink>
          </li>

          <li>
            <CustomNavLink to="/web/font-pairing" ariaLabel="Font Pairing">
              Font Pairing
            </CustomNavLink>
          </li>
        </ul>
      </nav>
      <nav>
        <div>
          {" "}
          <CustomNavLink to="/web/seo" ariaLabel="SEO">
            SEO
          </CustomNavLink>
        </div>

        <div>
          {" "}
          <CustomNavLink to="/web/css/new" ariaLabel="CSS New Features">
            CSS New Features
          </CustomNavLink>
        </div>

        <div>
          {" "}
          <CustomNavLink to="/web/css/references" ariaLabel="CSS References">
            CSS References{" "}
          </CustomNavLink>
        </div>
      </nav>

      <nav role="navigation" aria-labelledby="programmingmenu">
        <div id="programmingmenu">Programming</div>
        <ul>
          <li>
            <CustomNavLink to="/programming/solid" ariaLabel="SOLID">
              SOLID
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink
              to="/programming/design-patterns"
              ariaLabel="Design Patterns"
            >
              Design Patterns
            </CustomNavLink>
          </li>
          <li>
            <CustomNavLink
              to="/programming/dynamic-programming-questions"
              ariaLabel="Dynamic Programming Questions"
            >
              Dynamic Programming Questions
            </CustomNavLink>
          </li>
        </ul>
      </nav>

      <nav role="navigation" aria-labelledby="otherstuffmenu">
        <div id="otherstuffmenu">Other Stuff</div>

        <ul>
          <li>
            <CustomNavLink to="/other">Home</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/other/art">Art</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/other/books">Books</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/other/music">Music</CustomNavLink>
          </li>
          <li>
            <CustomNavLink to="/other/photography">Photography</CustomNavLink>
          </li>
        </ul>
        <div>
          <CustomNavLink to="/other/yachts">Yachts</CustomNavLink>
        </div>

        <div>
          <CustomNavLink to="/other/artists/kelly-boesch">
            Kelly Boesch
          </CustomNavLink>
        </div>

        <div>
          <CustomNavLink to="/other/artists/shag">Shag</CustomNavLink>
        </div>

        <div>
          <CustomNavLink to="/other/site-technology">
            Site Technology
          </CustomNavLink>
        </div>

        <ul>
          <li>
            <CustomNavLink to="/sitemap">Sitemap</CustomNavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
