import './homeMenu.css';

import CustomNavLink from '../../ui/CustomNavLink';

const menuItems = [
  {
    parent: 'Me Stuff',
    items: [
      {
        to: '/other/art',
        label: 'Art',
      },
      {
        to: '/other/artists/kelly-boesch',
        label: 'Kelly Boesch',
      },
      {
        to: '/other/artists/shag',
        label: 'Shag',
      },
      {
        to: '/other/photography',
        label: 'Photography',
      },
      {
        to: '/other/resources',
        label: 'Resources',
      },
      {
        to: '/other/yachts',
        label: 'Yachts',
      },
      {
        to: '/other/videos/you-tube',
        label: 'YouTube Videos',
      },
      {
        to: '/other/puzzles',
        label: 'Puzzles - Lazel',
      },
      {
        to: '/other/puzzles2',
        label: 'Puzzles - The Puzzle Lab',
      },
      {
        id: 3001,
        to: '/other/at-last',
        label: 'At Last - Pleasantville',
      },
      {
        id: 3002,
        to: '/other/gallos',
        label: 'Gallos',
      },
      {
        id: 3003,
        to: '/other/shoes-on-the-danube-bank',
        label: 'Shoes on the Danube Bank',
      },
    ],
  },
  {
    parent: 'React',
    items: [
      {
        id: 2001,
        to: '/ide/chrome-extensions',
        label: 'Chrome Extensions',
      },
      {
        id: 2002,
        to: '/ide/git',
        label: 'GIT',
      },
      {
        id: 2003,
        to: '/ide/vsc',
        label: 'Visual Studio Code',
      },
      {
        id: 2004,
        to: '/ide/vsc/extensions',
        label: 'Visual Studio Code: Extensions',
      },
    ],
  },
];

export function HomeMenu(): JSX.Element {
  return (
    <div className="home-menu">
      <div className="grid-container">
        {menuItems.map((item) => (
          <nav key={item.parent}>
            <div className="title">{item.parent}</div>
            {item.items.map((x) => (
              <CustomNavLink to={x.to} key={x.label}>
                {x.label}
              </CustomNavLink>
            ))}
          </nav>
        ))}

        {/* IDE */}
        <nav>
          <div className="title">IDE Setup</div>
          <CustomNavLink to="/ide/chrome" ariaLabel="Chrome">
            Chrome
          </CustomNavLink>
          <CustomNavLink to="/ide/vsc" ariaLabel="Visual Studio Code">
            Visual Studio Code
          </CustomNavLink>
          <CustomNavLink
            to="/ide/vsc/extensions"
            ariaLabel="Visual Studio Code - Extensions">
            Extensions
          </CustomNavLink>
          <CustomNavLink
            to="/ide/vsc/help"
            ariaLabel="Visual Studio Code - Help">
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
        </nav>
        {/* REACT */}
        <nav>
          <div className="title">React</div>
          <CustomNavLink to="/sd/scrum">Scrum</CustomNavLink>
          <CustomNavLink to="/react/internationalization">
            Internationalization
          </CustomNavLink>
        </nav>
        {/* PROGRAMMING */}
        <nav>
          <div className="title">Programming Principals</div>
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
            ariaLabel="Design Patterns">
            Design Patterns
          </CustomNavLink>
          <CustomNavLink
            to="/programming/design-patterns/single-responsibility-model"
            ariaLabel="single responsibility model">
            Single Responsibility Model
          </CustomNavLink>

          <CustomNavLink
            to="/programming/dynamic-programming-questions"
            ariaLabel="Dynamic Programming Questions">
            Dynamic Programming Questions
          </CustomNavLink>
        </nav>
        {/* PERFORMANCE */}
        <nav>
          <div className="title">Performance</div>
          <CustomNavLink to="/performance">Meta</CustomNavLink>
          <CustomNavLink to="/images">Webp</CustomNavLink>
        </nav>
        {/* DESIGN  */}
        <nav>
          <div className="title">Design</div>
          <CustomNavLink to="/design/css" ariaLabel="CSS Overview">
            CSS Overview
          </CustomNavLink>
          <CustomNavLink
            to="/design/responsive-design"
            ariaLabel="Responsive Design">
            Responsive Design
          </CustomNavLink>
          <CustomNavLink to="/design/material-design">
            Material Design
          </CustomNavLink>
          <CustomNavLink to="/design/print-design" ariaLabel="Print Design">
            Print Design
          </CustomNavLink>
          <CustomNavLink to="/design/font-pairing">Font Pairing</CustomNavLink>
          <CustomNavLink to="/design/parallax-scrolling">
            Parallax Scrolling
          </CustomNavLink>
          <CustomNavLink to="/design/kinetic-typography">
            Kinetic Typography
          </CustomNavLink>
          <CustomNavLink to="/design/microinteractions">
            Microinteractions
          </CustomNavLink>
          <CustomNavLink to="/design/css/new" ariaLabel="CSS New Features">
            CSS New Features
          </CustomNavLink>
          <CustomNavLink to="/design/css/references" ariaLabel="CSS References">
            CSS References
          </CustomNavLink>
        </nav>
        {/* STYLES  */}
        <nav>
          <div className="title">Design Styles</div>
          <CustomNavLink to="/styles/corporate-memphis">
            Corporate Memphis
          </CustomNavLink>
          <CustomNavLink to="/styles/flat-design">Flat Design</CustomNavLink>
          <CustomNavLink to="/styles/glassmorphism">
            Glassmorphism
          </CustomNavLink>
          <CustomNavLink to="/styles/minimalism">Minimalism</CustomNavLink>
          <CustomNavLink to="/styles/neumorphism">Neumorphism</CustomNavLink>
          <CustomNavLink to="/styles/retrofuturism">
            Retrofuturism
          </CustomNavLink>
          <CustomNavLink to="/styles/skeuomorphism">
            Skeuomorphism
          </CustomNavLink>
          <CustomNavLink to="/styles/swiss-style">Swiss Style</CustomNavLink>
        </nav>
      </div>
    </div>
  );
}
