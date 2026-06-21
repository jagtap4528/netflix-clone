import { FaPlay, FaInfoCircle } from "react-icons/fa";
import "./Banner.css";

function Banner() {
  return (
    <section className="banner">
      <div className="banner-overlay" />

      <div className="banner-content">
        <p className="banner-tag">NETFLIX ORIGINAL</p>

        <h1>Stranger Things</h1>

        <div className="banner-meta">
          <span className="match">98% Match</span>
          <span>2025</span>
          <span>U/A 16+</span>
          <span>4 Seasons</span>
        </div>

        <p className="banner-description">
          When a young boy vanishes, a small town uncovers a mystery involving
          secret experiments, terrifying supernatural forces, and one strange girl.
        </p>

        <div className="banner-actions">
          <button className="play-btn">
            <FaPlay />
            Play
          </button>

          <button className="info-btn">
            <FaInfoCircle />
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default Banner;