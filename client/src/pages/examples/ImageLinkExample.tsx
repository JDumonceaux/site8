import './imageLinkExample.css';

export default function ImageLinkExample() {
  return (
    <main className="main">
      <a href="https://www.theartnewspaper.com/" className="image-link">
        <div>
          <img src="/images/links/artnewspaper.png" />
          <div>The Art Newspaper</div>
        </div>
      </a>
      <br />
      <div>
        <a href="#" className="custom-link">
          <img src="/public/images/links/artnewspaper.png" alt="Link Image" />
          <span>Your Text</span>
        </a>
      </div>
    </main>
  );
}
