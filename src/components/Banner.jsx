import "./Banner.css";

function Banner() {
  return (
    <header className="banner">
      <div className="banner-content">
        <h1>Stranger Things</h1>

        <p>
          When a young boy vanishes, a small town uncovers a mystery
          involving secret experiments and supernatural forces.
        </p>

        <div className="banner-buttons">
          <button className="play-btn">▶ Play</button>
          <button className="info-btn">More Info</button>
        </div>
      </div>
    </header>
  );
}

export default Banner;