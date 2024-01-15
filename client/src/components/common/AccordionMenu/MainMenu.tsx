import CustomNavLink from "../../ui/CustomNavLink";
import { AccordionMenu } from "./AccordionMenu";

export default function MainMenu() {
  return (
    <div className="main-menu">
      {/* OTHER STUFF */}
      <AccordionMenu id={1} title="My Favorite Stuff">
        <CustomNavLink to="/other/art">Art</CustomNavLink>
        <CustomNavLink to="/other/artists/kelly-boesch">
          Kelly Boesch
        </CustomNavLink>
        <CustomNavLink to="/other/artists/shag">Shag</CustomNavLink>
        <CustomNavLink to="/other/books">Books</CustomNavLink>

        <CustomNavLink to="/other/photography">Photography</CustomNavLink>
        <CustomNavLink to="/other/resources">Resources</CustomNavLink>
        <CustomNavLink to="/other/yachts">Yachts</CustomNavLink>
        <CustomNavLink to="/other/videos/you-tube">
          YouTube Videos
        </CustomNavLink>
      </AccordionMenu>
      {/* IDE */}
      <AccordionMenu id={2} title="IDE Setup">
        <CustomNavLink to="/ide/chrome" ariaLabel="Chrome">
          Chrome
        </CustomNavLink>
        <CustomNavLink to="/ide/vsc" ariaLabel="Visual Studio Code">
          Visual Studio Code
        </CustomNavLink>
        <CustomNavLink
          to="/ide/vsc/extensions"
          ariaLabel="Visual Studio Code - Extensions"
        >
          Extensions
        </CustomNavLink>
        <CustomNavLink to="/ide/vsc/help" ariaLabel="Visual Studio Code - Help">
          Help
        </CustomNavLink>
        <CustomNavLink to="/ide/npm" ariaLabel="NPM">
          NPM
        </CustomNavLink>
        <CustomNavLink to="/ide/git" ariaLabel="Git">
          Git
        </CustomNavLink>
        <CustomNavLink to="/ide/github" ariaLabel="Git Hub">
          Git Hub
        </CustomNavLink>
        <CustomNavLink to="/ide/aws/commit" ariaLabel="AWS Commit">
          AWS Commit
        </CustomNavLink>
      </AccordionMenu>
      {/* REACT */}
      <AccordionMenu id={3} title="React">
        <CustomNavLink to="/sd/scrum">Scrum</CustomNavLink>
      </AccordionMenu>
      {/* PROGRAMMING */}
      <AccordionMenu id={4} title="Programming Principals">
        <CustomNavLink to="/programming/clean-code" ariaLabel="clean code">
          Clean Code
        </CustomNavLink>
        <CustomNavLink to="/programming/solid" ariaLabel="solid">
          SOLID
        </CustomNavLink>
        <CustomNavLink to="/programming/dry" ariaLabel="dry">
          DRY
        </CustomNavLink>
        <CustomNavLink to="/programming/kiss" ariaLabel="kiss">
          KISS
        </CustomNavLink>
        <CustomNavLink
          to="/programming/design-patterns"
          ariaLabel="Design Patterns"
        >
          Design Patterns
        </CustomNavLink>
        <CustomNavLink
          to="/programming/design-patterns/single-responsibility-model"
          ariaLabel="single responsibility model"
        >
          Single Responsibility Model
        </CustomNavLink>

        <CustomNavLink
          to="/programming/dynamic-programming-questions"
          ariaLabel="Dynamic Programming Questions"
        >
          Dynamic Programming Questions
        </CustomNavLink>
      </AccordionMenu>
      {/* PERFORMANCE */}
      <AccordionMenu id={5} title="Performance">
        <CustomNavLink to="/performance">SEO</CustomNavLink>
        <CustomNavLink to="/images">Webp</CustomNavLink>
      </AccordionMenu>
      {/* DESIGN  */}
      <AccordionMenu id={6} title="Design">
        <CustomNavLink to="/design/material-design">
          Material Design
        </CustomNavLink>
        <CustomNavLink to="/design/font-pairing">Font Pairing</CustomNavLink>
        <CustomNavLink to="/design/parallax-scrolling">
          Parallax scrolling
        </CustomNavLink>
        <CustomNavLink to="/design/kinetic-typography">
          Kinetic typography
        </CustomNavLink>
        <CustomNavLink to="/design/microinteractions">
          Microinteractions
        </CustomNavLink>
      </AccordionMenu>
      {/* STYLES  */}
      <AccordionMenu id={7} title="Design Styles">
        <CustomNavLink to="/styles/corporate-memphis">
          Corporate Memphis
        </CustomNavLink>
        <CustomNavLink to="/styles/flat-design">Flat Design</CustomNavLink>
        <CustomNavLink to="/styles/glassmorphism">Glassmorphism</CustomNavLink>
        <CustomNavLink to="/styles/minimalism">Minimalism</CustomNavLink>
        <CustomNavLink to="/styles/neumorphism">Neumorphism</CustomNavLink>
        <CustomNavLink to="/styles/retrofuturism">Retrofuturism</CustomNavLink>
        <CustomNavLink to="/styles/skeuomorphism">Skeuomorphism</CustomNavLink>
        <CustomNavLink to="/styles/swiss-style">Swiss Style</CustomNavLink>
      </AccordionMenu>
      {/* CSS */}
      <AccordionMenu id={8} title="CSS">
        <CustomNavLink to="/web/css" ariaLabel="CSS">
          CSS
        </CustomNavLink>
        <CustomNavLink to="/web/material-design" ariaLabel="Material Design">
          Material Design
        </CustomNavLink>
        <CustomNavLink
          to="/web/responsive-design"
          ariaLabel="Responsive Design"
        >
          Responsive Design
        </CustomNavLink>
        <CustomNavLink to="/web/print-design" ariaLabel="Print Design">
          Print Design
        </CustomNavLink>
        <CustomNavLink to="/web/font-pairing" ariaLabel="Font Pairing">
          Font Pairing
        </CustomNavLink>
        <CustomNavLink to="/web/css/new" ariaLabel="CSS New Features">
          CSS New Features
        </CustomNavLink>
        <CustomNavLink to="/web/css/references" ariaLabel="CSS References">
          CSS References
        </CustomNavLink>
      </AccordionMenu>
      {/* WEB */}
      <AccordionMenu id={9} title="Web">
        <CustomNavLink to="html" ariaLabel="HTML">
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
        <CustomNavLink to="/other/site-technology">
          Site Technology
        </CustomNavLink>
      </AccordionMenu>
    </div>
  );
}
