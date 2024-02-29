import CustomNavLink from '../../ui/CustomNavLink';
import { AccordionMenu } from './AccordionMenu';

export const MainMenu = (): JSX.Element => (
  <div className="main-menu">
    {/* OTHER STUFF */}
    <AccordionMenu id={1} path="/other" title="Me Stuff">
      <CustomNavLink to="/other/art">Art</CustomNavLink>
      <CustomNavLink to="/other/artists/kelly-boesch">
        Kelly Boesch
      </CustomNavLink>
      <CustomNavLink to="/other/artists/shag">Shag</CustomNavLink>
      <CustomNavLink to="/other/books">Books</CustomNavLink>

      <CustomNavLink to="/other/photography">Photography</CustomNavLink>
      <CustomNavLink to="/other/resources">Resources</CustomNavLink>
      <CustomNavLink to="/other/yachts">Yachts</CustomNavLink>
      <CustomNavLink to="/other/videos/you-tube">YouTube Videos</CustomNavLink>
    </AccordionMenu>
    {/* IDE */}
    <AccordionMenu id={2} title="IDE Setup">
      <CustomNavLink ariaLabel="Chrome" to="/ide/chrome">
        Chrome
      </CustomNavLink>
      <CustomNavLink ariaLabel="Visual Studio Code" to="/ide/vsc">
        Visual Studio Code
      </CustomNavLink>
      <CustomNavLink
        ariaLabel="Visual Studio Code - Extensions"
        to="/ide/vsc/extensions">
        Extensions
      </CustomNavLink>
      <CustomNavLink ariaLabel="Visual Studio Code - Help" to="/ide/vsc/help">
        Help
      </CustomNavLink>
      <CustomNavLink ariaLabel="NPM" to="/ide/npm">
        NPM
      </CustomNavLink>
      <CustomNavLink ariaLabel="Git" to="/ide/git">
        Git
      </CustomNavLink>
      <CustomNavLink ariaLabel="Git Hub" to="/ide/github">
        Git Hub
      </CustomNavLink>
      <CustomNavLink ariaLabel="AWS Commit" to="/ide/aws/commit">
        AWS Commit
      </CustomNavLink>
    </AccordionMenu>
    {/* REACT */}
    <AccordionMenu id={3} title="React">
      <CustomNavLink to="/sd/scrum">Scrum</CustomNavLink>
      <CustomNavLink to="/react/internationalization">
        Internationalization
      </CustomNavLink>
    </AccordionMenu>
    {/* PROGRAMMING */}
    <AccordionMenu id={4} title="Programming Principals">
      <CustomNavLink ariaLabel="clean code" to="/programming/clean-code">
        Clean Code
      </CustomNavLink>
      <CustomNavLink ariaLabel="solid" to="/programming/solid">
        SOLID
      </CustomNavLink>
      <CustomNavLink ariaLabel="dry" to="/programming/dry">
        DRY
      </CustomNavLink>
      <CustomNavLink ariaLabel="kiss" to="/programming/kiss">
        KISS
      </CustomNavLink>
      <CustomNavLink
        ariaLabel="Design Patterns"
        to="/programming/design-patterns">
        Design Patterns
      </CustomNavLink>
      <CustomNavLink
        ariaLabel="single responsibility model"
        to="/programming/design-patterns/single-responsibility-model">
        Single Responsibility Model
      </CustomNavLink>

      <CustomNavLink
        ariaLabel="Dynamic Programming Questions"
        to="/programming/dynamic-programming-questions">
        Dynamic Programming Questions
      </CustomNavLink>
    </AccordionMenu>
    {/* PERFORMANCE */}
    <AccordionMenu id={5} title="Performance">
      <CustomNavLink to="/performance">Meta</CustomNavLink>
      <CustomNavLink to="/images">Webp</CustomNavLink>
    </AccordionMenu>
    {/* DESIGN  */}
    <AccordionMenu id={6} title="CSS & Design">
      <CustomNavLink ariaLabel="CSS Overview" to="/design/css">
        CSS Overview
      </CustomNavLink>
      <CustomNavLink
        ariaLabel="Responsive Design"
        to="/design/responsive-design">
        Responsive Design
      </CustomNavLink>
      <CustomNavLink to="/design/material-design">
        Material Design
      </CustomNavLink>
      <CustomNavLink ariaLabel="Print Design" to="/design/print-design">
        Print Design
      </CustomNavLink>
      <CustomNavLink to="/design/font-pairing">Font Pairing</CustomNavLink>
      <CustomNavLink to="/design/parallax-scrolling">
        Parallax Ccrolling
      </CustomNavLink>
      <CustomNavLink to="/design/kinetic-typography">
        Kinetic Typography
      </CustomNavLink>
      <CustomNavLink to="/design/microinteractions">
        Microinteractions
      </CustomNavLink>
      <CustomNavLink ariaLabel="CSS New Features" to="/design/css/new">
        CSS New Features
      </CustomNavLink>
      <CustomNavLink ariaLabel="CSS References" to="/design/css/references">
        CSS References
      </CustomNavLink>
    </AccordionMenu>
    {/* STYLES  */}
    <AccordionMenu id={7} title="Design Styles">
      <CustomNavLink to="/styles/corporate-memphis">
        Corporate Memphis
      </CustomNavLink>
      <CustomNavLink to="/styles/flat-design">Flat Design</CustomNavLink>
      <CustomNavLink to="/styles/fluent1-design">Fluent 1 Design</CustomNavLink>
      <CustomNavLink to="/styles/fluent2-design">Fluent 2 Design</CustomNavLink>
      <CustomNavLink to="/styles/glassmorphism">Glassmorphism</CustomNavLink>
      <CustomNavLink to="/styles/minimalism">Minimalism</CustomNavLink>
      <CustomNavLink to="/styles/neumorphism">Neo Brutalism</CustomNavLink>
      <CustomNavLink to="/styles/neumorphism">Neumorphism</CustomNavLink>
      <CustomNavLink to="/styles/retrofuturism">Retrofuturism</CustomNavLink>
      <CustomNavLink to="/styles/skeuomorphism">Skeuomorphism</CustomNavLink>
      <CustomNavLink to="/styles/swiss-style">Swiss Style</CustomNavLink>
    </AccordionMenu>

    {/* WEB */}
    <AccordionMenu id={9} title="Web">
      <CustomNavLink ariaLabel="HTML" to="html">
        HTML
      </CustomNavLink>
    </AccordionMenu>
    {/* REACT EXPERIMENTAL */}
    <AccordionMenu id={10} title="React Experimental">
      <CustomNavLink to="">React Experimental</CustomNavLink>
    </AccordionMenu>
    {/* SOFTWARE DEVELOPMENT */}
    <AccordionMenu id={11} title="Software Development">
      <CustomNavLink to="/sd/scrum">Scrum</CustomNavLink>
    </AccordionMenu>
    {/* TESTING */}
    <AccordionMenu id={12} title="Testing">
      <CustomNavLink to="/testing">Test Grid</CustomNavLink>
    </AccordionMenu>
    {/* EXAMPLES */}
    <AccordionMenu id={13} title="Examples">
      <CustomNavLink to="/examples/form">Form</CustomNavLink>
    </AccordionMenu>
    {/* SITE MAP */}
    <AccordionMenu id={14} title="Sitemap">
      <CustomNavLink to="/sitemap">Sitemap</CustomNavLink>
      <CustomNavLink to="/other/site-technology">Site Technology</CustomNavLink>
    </AccordionMenu>
  </div>
);
